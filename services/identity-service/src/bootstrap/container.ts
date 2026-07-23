import { NatsPublisher } from "@pine/event-bus";
import { Container } from "inversify";
import { broker } from "@/bootstrap/broker";
import { dataSource } from "@/bootstrap/data-source";
import { kratosClient } from "@/bootstrap/kratos-client";
import { logger } from "@/bootstrap/logger";
import { TYPES } from "@/bootstrap/container-types";
import { ILoginService, LoginService } from "@/features/login";
import { IRegistrationService, RegistrationService } from "@/features/registration";
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

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.DataSource).toConstantValue(dataSource);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container.bind(TYPES.Publisher).toConstantValue(new NatsPublisher(broker));
container.bind(TYPES.KratosClient).toConstantValue(kratosClient);

container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IUserProfileRepository>(TYPES.UserProfileRepository).to(UserProfileRepository);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IUserProfileService>(TYPES.UserProfileService).to(UserProfileService);
container.bind<IIdentityProvider>(TYPES.IdentityProvider).to(KratosIdentityProvider);
container.bind<IRegistrationService>(TYPES.RegistrationService).to(RegistrationService);
container.bind<ILoginService>(TYPES.LoginService).to(LoginService);
