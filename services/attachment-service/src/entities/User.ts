import { Audit } from "@pine/orm";
import { Entity } from "typeorm";

@Entity({ name: "users" })
export class User extends Audit {}
