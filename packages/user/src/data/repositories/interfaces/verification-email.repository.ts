import { Repository } from "@sourabhrawatcc/core-utils";
import { VerificaionEmailEntity } from "../../entities/verification-email.entity";

export interface VerificationEmailRepository
  extends Repository<VerificaionEmailEntity> {}
