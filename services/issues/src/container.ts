import "./env";

import {
  NatsBroker,
  NatsPublisher,
  Publisher,
  Subjects,
} from "@pine/event-bus";
import {
  AwilixDi,
  CoreLogger,
  Logger,
} from "@pine/server-core";
import { PostgresTypeorm, Typeorm } from "@pine/orm";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import pino from "pino";
import { DataSource } from "typeorm";
import {
  CoreIssueService,
  IssueService,
} from "@/features/issue";
import {
  CoreProjectService,
  ProjectService,
} from "@/features/project";
import {
  CoreStatusService,
  StatusService,
} from "@/features/status";
import {
  CoreUserService,
  UserEmailVerifiedSubscriber,
  UserService,
} from "@/features/user";
import {
  CoreWorkspaceService,
  WorkspaceService,
} from "@/features/workspace";

export const logger = new CoreLogger(
  pino({ transport: { target: "pino-pretty" } }),
);

export const broker = new NatsBroker({
  servers: [process.env.NATS_CLUSTER_URL || "nats"],
  streams: ["issue", "workspace", "project", "user"],
  logger,
});

export interface RegisteredServices {
  logger: Logger;
  dataSource: DataSource;
  orm: Typeorm;
  broker: NatsBroker;
  userService: UserService;
  issueService: IssueService;
  projectService: ProjectService;
  statusService: StatusService;
  workspaceService: WorkspaceService;
  userEmailVerifiedSubscriber: UserEmailVerifiedSubscriber;
  publisher: Publisher<Subjects>;
}

const awilix = createContainer<RegisteredServices>({
  injectionMode: InjectionMode.CLASSIC,
});

export const container = new AwilixDi<RegisteredServices>(awilix, logger);

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.ISSUE_TRACKER_POSTGRES_CLUSTER_URL,
  entities: ["src/features/**/entities/*.{ts,js}"],
  synchronize: true,
});

export const orm = new PostgresTypeorm(dataSource, logger);

container.add("logger", asValue(logger));
container.add("dataSource", asValue(dataSource));
container.add("orm", asValue(orm));
container.add("broker", asValue(broker));
container.add("userService", asClass(CoreUserService));
container.add("issueService", asClass(CoreIssueService));
container.add("statusService", asClass(CoreStatusService));
container.add("projectService", asClass(CoreProjectService));
container.add("workspaceService", asClass(CoreWorkspaceService));
container.add(
  "userEmailVerifiedSubscriber",
  asClass(UserEmailVerifiedSubscriber),
);
container.add("publisher", asClass(NatsPublisher));
