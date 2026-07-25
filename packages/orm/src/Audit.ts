import { uuidv7 } from "@pine/common";
import {
  BaseEntity,
  BeforeInsert,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

export abstract class Audit extends BaseEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @BeforeInsert()
  generateId() {
    if (!this.id) this.id = uuidv7();
  }

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp with time zone",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp with time zone",
    nullable: true,
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: "deleted_at",
    type: "timestamp with time zone",
    nullable: true,
  })
  deletedAt?: Date;

  @VersionColumn()
  version!: number;
}
