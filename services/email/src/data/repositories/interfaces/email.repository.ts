import { Repository } from "@issue-tracker/orm";
import { EmailEntity } from "../../entities";

export interface EmailRepository extends Repository<EmailEntity> {
  findByEmail(email: string): Promise<EmailEntity | null>;
}
