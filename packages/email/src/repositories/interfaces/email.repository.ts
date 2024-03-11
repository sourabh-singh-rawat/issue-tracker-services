import { Repository } from "@sourabhrawatcc/core-utils";
import { EmailEntity } from "../../app/entities/email.entity";

export interface EmailRepository extends Repository<EmailEntity> {
  findByEmail(email: string): Promise<EmailEntity | null>;
}
