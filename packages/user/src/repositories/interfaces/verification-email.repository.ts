import { Repository } from "@sourabhrawatcc/core-utils";
import { VerificaionEmailEntity } from "../../app/entities/verification-email.entity";

export interface VerificationEmailRepository
  extends Repository<VerificaionEmailEntity> {}
