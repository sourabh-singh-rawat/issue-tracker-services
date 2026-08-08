import { NatsPublisher, type IPublisher } from "@pine/events";
import { FastifyHttpServer, type IHttpServer } from "@pine/http";
import {
  ExponentialBackoffPolicy,
  OutboxCleanupService,
  OutboxCleanupWorker,
  OutboxRepository,
  OutboxService,
  OutboxWorker,
  type IOutboxCleanupService,
  type IOutboxCleanupWorker,
  type IOutboxPublisher,
  type IOutboxRepository,
  type IOutboxService,
  type IOutboxWorker,
  type IRetryPolicy,
} from "@pine/outbox";
import { Container } from "inversify";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { db } from "@/bootstrap/db";
import { env } from "@/bootstrap/env";
import { fastifyServer } from "@/bootstrap/fastify";
import { hydraClient } from "@/bootstrap/hydra-client";
import { kratosClient } from "@/bootstrap/kratos-client";
import { logger } from "@/bootstrap/logger";
import { IAdminService, AdminService } from "@/features/admin";
import { ISignInService, SignInService } from "@/features/signin";
import { ILogoutService, LogoutService } from "@/features/logout";
import { IMeService, MeService } from "@/features/me";
import { ISessionService, SessionService } from "@/features/session";
import { IOAuthService, OAuthService } from "@/features/oauth";
import { IRegistrationService, RegistrationService } from "@/features/registration";
import { IVerificationService, VerificationService } from "@/features/verification";
import {
  ClientSeederService,
  ClientService,
  IClientSeederService,
  IClientService,
} from "@/features/clients";
import {
  IIdentityProfileRepository,
  IIdentityProfileService,
  IIdentityRepository,
  IIdentityService,
  IdentityProfileRepository,
  IdentityProfileService,
  IdentityRepository,
  IdentityService,
} from "@/features/identities";
import {
  IIdentityAdminProvider,
  IRegistrationProvider,
  ISessionProvider,
  IVerificationProvider,
  KratosErrorMapper,
  KratosIdentityAdminProvider,
  KratosRegistrationProvider,
  KratosSessionProvider,
  KratosVerificationProvider,
} from "@/integrations/identity";
import {
  HydraOAuthClientProvider,
  HydraOAuthFlowProvider,
  HydraOAuthTokenProvider,
  IOAuthClientProvider,
  IOAuthFlowProvider,
  IOAuthTokenProvider,
} from "@/integrations/oauth";
import { routes } from "@/routes";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.Database).toConstantValue(db);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container.bind<IPublisher>(TYPES.Publisher).toConstantValue(new NatsPublisher(broker));
container.bind<IOutboxRepository>(TYPES.OutboxRepository).toConstantValue(new OutboxRepository(db));
container.bind<IRetryPolicy>(TYPES.RetryPolicy).toConstantValue(new ExponentialBackoffPolicy());
container
  .bind<IOutboxService>(TYPES.OutboxService)
  .toConstantValue(new OutboxService(container.get<IOutboxRepository>(TYPES.OutboxRepository), container.get<IRetryPolicy>(TYPES.RetryPolicy)));
container
  .bind<IOutboxWorker>(TYPES.OutboxWorker)
  .toConstantValue(new OutboxWorker(container.get<IOutboxService>(TYPES.OutboxService), container.get<IPublisher>(TYPES.Publisher) as IOutboxPublisher));
container
  .bind<IOutboxCleanupService>(TYPES.OutboxCleanupService)
  .toConstantValue(new OutboxCleanupService(container.get<IOutboxRepository>(TYPES.OutboxRepository)));
container
  .bind<IOutboxCleanupWorker>(TYPES.OutboxCleanupWorker)
  .toConstantValue(new OutboxCleanupWorker(container.get<IOutboxCleanupService>(TYPES.OutboxCleanupService)));
container.bind(TYPES.KratosClient).toConstantValue(kratosClient);
container.bind(TYPES.HydraClient).toConstantValue(hydraClient);
container.bind(TYPES.KratosErrorMapper).to(KratosErrorMapper);

container.bind<IIdentityRepository>(TYPES.IdentityRepository).to(IdentityRepository);
container.bind<IIdentityProfileRepository>(TYPES.IdentityProfileRepository).to(IdentityProfileRepository);
container.bind<IIdentityService>(TYPES.IdentityService).to(IdentityService);
container.bind<IIdentityProfileService>(TYPES.IdentityProfileService).to(IdentityProfileService);
container.bind<IClientService>(TYPES.ClientService).to(ClientService);
container.bind<IClientSeederService>(TYPES.ClientSeederService).to(ClientSeederService);
container.bind<IRegistrationProvider>(TYPES.RegistrationProvider).to(KratosRegistrationProvider);
container.bind<ISessionProvider>(TYPES.SessionProvider).to(KratosSessionProvider);
container
  .bind<IIdentityAdminProvider>(TYPES.IdentityAdminProvider)
  .to(KratosIdentityAdminProvider);
container.bind<IVerificationProvider>(TYPES.VerificationProvider).to(KratosVerificationProvider);
container.bind<IOAuthFlowProvider>(TYPES.OAuthFlowProvider).to(HydraOAuthFlowProvider);
container.bind<IOAuthTokenProvider>(TYPES.OAuthTokenProvider).to(HydraOAuthTokenProvider);
container.bind<IOAuthClientProvider>(TYPES.OAuthClientProvider).to(HydraOAuthClientProvider);
container.bind<IRegistrationService>(TYPES.RegistrationService).to(RegistrationService);
container.bind<ISignInService>(TYPES.SignInService).to(SignInService);
container.bind<ILogoutService>(TYPES.LogoutService).to(LogoutService);
container.bind<IMeService>(TYPES.MeService).to(MeService);
container.bind<ISessionService>(TYPES.SessionService).to(SessionService);
container.bind<IOAuthService>(TYPES.OAuthService).to(OAuthService);
container.bind<IAdminService>(TYPES.AdminService).to(AdminService);
container.bind<IVerificationService>(TYPES.VerificationService).to(VerificationService);

container.bind<IHttpServer>(TYPES.HttpServer).toConstantValue(
  new FastifyHttpServer(fastifyServer, {
    config: {
      host: "0.0.0.0",
      port: 5000,
      environment: env.NODE_ENV,
      version: 1,
    },
    cors: { credentials: true, origin: env.IDENTITY_WEB_URL },
    cookie: { secret: env.JWT_SECRET },
    routes,
  }),
);
