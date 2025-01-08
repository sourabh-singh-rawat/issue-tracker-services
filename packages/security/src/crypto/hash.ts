import argon2 from "argon2";
import { randomBytes } from "crypto";

interface CreateWithSaltOptions {
  salt: string;
  plain: string;
}

interface VerifyOptions {
  hash: string;
  salt: string;
  plain: string;
}

export class Hash {
  /**
   * Creates a hashed password using a given salt
   * @param salt
   * @param plain
   */
  private static async createWithSalt({ plain, salt }: CreateWithSaltOptions) {
    const hash = await argon2.hash(plain + salt);

    return { hash, salt };
  }

  /**
   * Creates a hashed password (salt included)
   * @param plain password to hash
   * @returns password that is hashed with salt
   */
  static async create(plain: string) {
    const salt = randomBytes(32).toString("hex");

    return this.createWithSalt({ salt, plain });
  }

  /**
   * Verifies
   * @param hash
   * @param salt
   * @param plain
   */
  static async verify({ hash, salt, plain }: VerifyOptions) {
    return argon2.verify(hash, plain + salt);
  }
}
