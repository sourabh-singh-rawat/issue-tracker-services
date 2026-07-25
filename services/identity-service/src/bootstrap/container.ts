import { NatsPublisher, type IPublisher } from "@pine/events";
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
import {
  GrantRepository,
  IGrantRepository,
} from "@/features/grants";
import {
  IScopeRepository,
  ScopeRepository,
} from "@/features/scopes";
import {
  IUserProfileRepository,
  IUserProfileService,
  IUserRepository,
  IUserService,
  UserProfileRepository,
  UserProfileService,
  UserRepository,
  UserService,
} from "@/features/users";
import { IIdentityProvider, KratosIdentityProvider } from "@/integrations/identity";
import { HydraOAuthProvider, IOAuthProvider } from "@/integrations/oauth";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.Database).toConstantValue(db);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container
  .bind<IPublisher>(TYPES.Publisher)
  .toConstantValue(new NatsPublisher(broker));
container.bind(TYPES.KratosClient).toConstantValue(kratosClient);
container.bind(TYPES.HydraClient).toConstantValue(hydraClient);

container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IUserProfileRepository>(TYPES.UserProfileRepository).to(UserProfileRepository);
container.bind<IClientRepository>(TYPES.ClientRepository).to(ClientRepository);
container
  .bind<IClientRedirectUriRepository>(TYPES.ClientRedirectUriRepository)
  .to(ClientRedirectUriRepository);
container.bind<IClientScopeRepository>(TYPES.ClientScopeRepository).to(ClientScopeRepository);
container
  .bind<IClientGrantTypeRepository>(TYPES.ClientGrantTypeRepository)
  .to(ClientGrantTypeRepository);
container.bind<IScopeRepository>(TYPES.ScopeRepository).to(ScopeRepository);
container.bind<IGrantRepository>(TYPES.GrantRepository).to(GrantRepository);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IUserProfileService>(TYPES.UserProfileService).to(UserProfileService);
container.bind<IClientService>(TYPES.ClientService).to(ClientService);
container.bind<IIdentityProvider>(TYPES.IdentityProvider).to(KratosIdentityProvider);
container.bind<IOAuthProvider>(TYPES.OAuthProvider).to(HydraOAuthProvider);
container.bind<IRegistrationService>(TYPES.RegistrationService).to(RegistrationService);
container.bind<ILoginService>(TYPES.LoginService).to(LoginService);
container.bind<ILogoutService>(TYPES.LogoutService).to(LogoutService);
container.bind<IMeService>(TYPES.MeService).to(MeService);
container.bind<IOAuthService>(TYPES.OAuthService).to(OAuthService);
container.bind<IAdminService>(TYPES.AdminService).to(AdminService);
