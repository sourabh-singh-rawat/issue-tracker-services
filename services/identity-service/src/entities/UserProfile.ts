import { Audit } from "@pine/orm";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "@/entities/User";

@Entity("user_profiles")
export class UserProfile extends Audit {
  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @OneToOne(() => User, ({ profile }) => profile)
  @JoinColumn({
    name: "user_id",
    foreignKeyConstraintName: "user_profiles_fkey",
    referencedColumnName: "id",
  })
  user!: User;

  @Column({ name: "display_name", type: "text" })
  displayName!: string;

  @Column({ name: "description", type: "text", nullable: true })
  description?: string;

  @Column({ name: "photo_url", type: "text", nullable: true })
  photoUrl?: string;
}
