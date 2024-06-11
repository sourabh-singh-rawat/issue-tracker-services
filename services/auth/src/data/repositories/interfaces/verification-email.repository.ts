import { Repository } from "@issue-tracker/orm";
import { VerificaionEmailEntity } from "../../entities/verification-email.entity";

export interface VerificationEmailRepository
  extends Repository<VerificaionEmailEntity> {}
