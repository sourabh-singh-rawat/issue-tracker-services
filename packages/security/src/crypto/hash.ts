import argon2 from "argon2";
import { randomBytes } from "crypto";

export class Hash {
  /**
   * Creates a hashed password using a given salt
   * @param salt
   * @param plain
   */
  private static createWithSalt = async (salt: Buffer, plain: string) => {
    const hash = await argon2.hash(plain, { salt });

    return { hash, salt: salt.toString("hex") };
  };

  /**
   * Created a hashed password (salt included)
   * @param plain password to hash
   * @returns password that is hashed with salt
   */
  static create = async (plain: string) => {
    const salt = randomBytes(32);

    return this.createWithSalt(salt, plain);
  };

  /**
   * Verifies
   * @param hash
   * @param salt
   * @param plain
   */
  static verify = async (hash: string, salt: string, plain: string) => {
    return argon2.verify(hash, plain, {
      salt: Buffer.from(salt, "hex"),
    });
  };
}
