import { RequiredFieldError, UserAlreadyExists } from "@issue-tracker/common";
import { UserEntity, UserProfileEntity } from "../data/entities";
import { PostgresUserProfileRepository } from "../data/repositories/postgres-user-profile.repository";
import { PostgresUserRepository } from "../data/repositories/postgres-user.repository";
import {
  CreateUserWithEmailAndPasswordOptions,
  GeneratePasswordResetLinkOptions,
  GenerateVerificationLinkOptions,
  SendEmailVerificationLinkOptions,
  SendPasswordResetLinkToEmailOptions,
  SignInWithEmailAndPasswordOptions,
  UserAuthenticationService,
  VerifyEmailVerificationLinkOptions,
  VerifyPasswordResetLinkOptions,
} from "./Interfaces";
import { Hash, JwtToken } from "@issue-tracker/security";
import { v4 } from "uuid";
import { userInfo } from "os";
import { NatsPublisher } from "@issue-tracker/event-bus";

interface CreateVerificationLinkOptions {
  userId: string;
}

interface CreateVerificationTokenOptions {
  userId: string;
  expiresIn: number;
}

export class CoreUserAuthenticationService
  implements UserAuthenticationService
{
  constructor(private readonly publisher: NatsPublisher) {}

  private createVerificationToken(options: CreateVerificationTokenOptions) {
    const { userId, expiresIn } = options;
    if (!userId) throw new RequiredFieldError("userId");
    if (!expiresIn) throw new RequiredFieldError("expiresIn");

    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + expiresIn;
    const tokenId = v4();
    const verificationToken = JwtToken.create(
      {
        sub: "@issue-tracker/auth",
        iss: "@issue-tracker/auth",
        aud: "@issue-tracker/mail",
        iat,
        exp,
        userId,
        tokenId,
      },
      process.env.JWT_SECRET!,
    );

    return verificationToken;
  }

  private createVerificationLink(options: CreateVerificationLinkOptions) {
    const { userId } = options;
    const verificationToken = this.createVerificationToken({
      expiresIn: 24 * 60 * 60,
      userId,
    });

    const verificationLink = `${process.env.AUTH_SERVER}/api/v1/users/${userId}/confirm?confirmationEmail=${verificationToken}`;

    return verificationLink;
  }

  async createUserWithEmailAndPassword(
    options: CreateUserWithEmailAndPasswordOptions,
  ) {
    const { email, password, displayName, manager } = options;
    const UserRepo = manager.getRepository(UserEntity);
    const UserProfileRepo = manager.getRepository(UserProfileEntity);

    const isAlreadyRegistered = await UserRepo.exists({ where: { email } });
    if (isAlreadyRegistered) throw new UserAlreadyExists();

    const { hash, salt } = await Hash.create(password);
    const { id: userId } = await UserRepo.save({
      email,
      passwordHash: hash,
      passwordSalt: salt,
    });
    await UserProfileRepo.save({ userId, displayName });
    await this.sendVerificationLinkToEmail({
      manager,
      userId,
      email,
      displayName,
    });
  }

  signInWithEmailAndPassword(
    options: SignInWithEmailAndPasswordOptions,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  generateVerificationLink(
    options: GenerateVerificationLinkOptions,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  generatePasswordResetLink(
    options: GeneratePasswordResetLinkOptions,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async sendVerificationLinkToEmail(options: SendEmailVerificationLinkOptions) {
    const { userId, displayName, email } = options;
    const verificationLink = this.createVerificationLink({ userId });
    if (!verificationLink) throw new RequiredFieldError("verificationLink");

    const html = `
      <body style="font-family: Arial, sans-serif; color: #333333; line-height: 1.6;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; padding: 20px; background-color: #ffffff;">
          <tr>
              <td style="text-align: center;">
                  <h4 style="font-size: 1.2em; color: #333333;">Hey ${displayName},</h4>
                  <p style="font-size: 1em; color: #555555;">Thank you for joining! To activate your account and start exploring, please click the verification link below:</p>
                  <p>
                      <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #8700f8; text-decoration: none; border-radius: 5px; font-size: 1em;">Activate My Account</a>
                  </p>
                  <p style="font-size: 0.9em; color: #888888;">Best Regards,<br>Issue tracker dev</p>
              </td>
          </tr>
        </table>
      </body>
    `;
    await this.publisher.send("user.registered", { email, html });
  }

  sendPasswordResetLinkToEmail(
    options: SendPasswordResetLinkToEmailOptions,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  verifyVerificationLink(
    options: VerifyEmailVerificationLinkOptions,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  verifyPasswordResetLink(
    options: VerifyPasswordResetLinkOptions,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
