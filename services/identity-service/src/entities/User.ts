import { Audit } from "@pine/orm";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserProfile } from "@/entities/UserProfile";

@Entity({ name: "users" })
export class User extends Audit {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ type: "text", name: "external_id", unique: true })
  externalId!: string;

  @OneToOne(() => UserProfile, ({ user }) => user)
  profile!: UserProfile;
}
