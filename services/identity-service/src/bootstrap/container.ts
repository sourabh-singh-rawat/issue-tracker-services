import { NatsPublisher, type IPublisher } from "@pine/events";
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
import { db } from "@/bootstrap/db";
import { hydraClient } from "@/bootstrap/hydra-client";
import { kratosClient } from "@/bootstrap/kratos-client";
import { logger } from "@/bootstrap/logger";
import { TYPES } from "@/bootstrap/container-types";
import { IAdminService, AdminService } from "@/features/admin";
import { ILoginService, LoginService } from "@/features/login";
import { ILogoutService, LogoutService } from "@/features/logout";
import { IMeService, MeService } from "@/features/me";
import { IOAuthService, OAuthService } from "@/features/oauth";
import { IRegistrationService, RegistrationService } from "@/features/registration";
import {
  ClientGrantTypeRepository,
  ClientRedirectUriRepository,
  ClientRepository,
  ClientScopeRepository,
  ClientService,
  IClientGrantTypeRepository,
  IClientRedirectUriRepository,
  IClientRepository,
  IClientScopeRepository,
  IClientService,
} from "@/features/clients";
import { GrantRepository, IGrantRepository } from "@/features/grants";
import { IScopeRepository, ScopeRepository } from "@/features/scopes";
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
import { IIdentityProvider, KratosIdentityProvider } from "@/integrations/identity";
import { HydraOAuthProvider, IOAuthProvider } from "@/integrations/oauth";

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

container.bind<IIdentityRepository>(TYPES.IdentityRepository).to(IdentityRepository);
container.bind<IIdentityProfileRepository>(TYPES.IdentityProfileRepository).to(IdentityProfileRepository);
container.bind<IClientRepository>(TYPES.ClientRepository).to(ClientRepository);
container.bind<IClientRedirectUriRepository>(TYPES.ClientRedirectUriRepository).to(ClientRedirectUriRepository);
container.bind<IClientScopeRepository>(TYPES.ClientScopeRepository).to(ClientScopeRepository);
container.bind<IClientGrantTypeRepository>(TYPES.ClientGrantTypeRepository).to(ClientGrantTypeRepository);
container.bind<IScopeRepository>(TYPES.ScopeRepository).to(ScopeRepository);
container.bind<IGrantRepository>(TYPES.GrantRepository).to(GrantRepository);
container.bind<IIdentityService>(TYPES.IdentityService).to(IdentityService);
container.bind<IIdentityProfileService>(TYPES.IdentityProfileService).to(IdentityProfileService);
container.bind<IClientService>(TYPES.ClientService).to(ClientService);
container.bind<IIdentityProvider>(TYPES.IdentityProvider).to(KratosIdentityProvider);
container.bind<IOAuthProvider>(TYPES.OAuthProvider).to(HydraOAuthProvider);
container.bind<IRegistrationService>(TYPES.RegistrationService).to(RegistrationService);
container.bind<ILoginService>(TYPES.LoginService).to(LoginService);
container.bind<ILogoutService>(TYPES.LogoutService).to(LogoutService);
container.bind<IMeService>(TYPES.MeService).to(MeService);
container.bind<IOAuthService>(TYPES.OAuthService).to(OAuthService);
container.bind<IAdminService>(TYPES.AdminService).to(AdminService);
