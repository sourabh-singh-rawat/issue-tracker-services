import { Audit } from "@pine/orm";
import { Column, Entity, OneToOne } from "typeorm";
import { UserProfile } from "@/entities/UserProfile";

@Entity({ name: "users" })
export class User extends Audit {
  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ type: "text", name: "idp_id", nullable: true })
  idpId?: string;

  @Column({ type: "text", name: "idp_provider", nullable: true })
  idpProvider?: string;

  @OneToOne(() => UserProfile, ({ user }) => user)
  profile!: UserProfile;
}
