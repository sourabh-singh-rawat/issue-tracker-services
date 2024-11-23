import {
  EMAIL_VERIFICATION_STATUS,
  EmailNotVerifiedError,
  EmailVerificationStatus,
  RequiredFieldError,
  UnauthorizedError,
  UserAlreadyExists,
  UserNotFoundError,
} from "@issue-tracker/common";
import { User } from "../data/entities";
import {
  CreateUserWithEmailAndPasswordOptions,
  GeneratePasswordResetLinkOptions,
  GenerateVerificationLinkOptions,
  SendEmailVerificationLinkOptions,
  SendPasswordResetLinkToEmailOptions,
  SignInWithEmailAndPasswordOptions,
  UserAuthenticationService,
  UserProfileService,
  VerifyEmailVerificationLinkOptions,
  VerifyPasswordResetLinkOptions,
} from "./Interfaces";
import { AccessToken, Hash, JwtToken } from "@issue-tracker/security";
import { v4 } from "uuid";
import { NatsPublisher } from "@issue-tracker/event-bus";

interface CreateVerificationLinkOptions {
  userId: string;
}

interface CreateVerificationTokenOptions {
  userId: string;
  expiresIn: number;
}

interface VerifyUserPassword {
  user: User;
  password: string;
}

interface CreateUserAccessTokenOptions {
  user: User;
  exp: number;
}

interface CreateUserRefreshTokenOptions {
  user: User;
  exp: number;
}

export class CoreUserAuthenticationService
  implements UserAuthenticationService
{
  private readonly AUTH_SERVICE = "@issue-tracker/auth";
  private readonly MAIL_SERVICE = "@issue-tracker/mail";

  constructor(
    private readonly publisher: NatsPublisher,
    private readonly userProfileService: UserProfileService,
  ) {}

  private createUserAccessToken(options: CreateUserAccessTokenOptions) {
    const { user, exp } = options;
    const { createdAt, email, emailVerificationStatus, id, profile } = user;
    const { displayName } = profile;
    const payload: AccessToken = {
      createdAt,
      displayName,
      email,
      emailVerificationStatus,
      userId: id,
      jwtid: v4(),
      iss: this.AUTH_SERVICE,
      aud: this.AUTH_SERVICE,
      sub: this.MAIL_SERVICE,
      exp,
      userMetadata: { language: "en" },
      appMetadata: { roles: ["user"] },
    };

    const secret = process.env.JWT_SECRET!;

    return JwtToken.create(payload, secret);
  }

  private createUserRefreshToken(options: CreateUserRefreshTokenOptions) {
    const { user, exp } = options;
    const { createdAt, email, emailVerificationStatus, id, profile } = user;
    const { displayName } = profile;
    const payload: AccessToken = {
      createdAt,
      displayName,
      email,
      emailVerificationStatus,
      userId: id,
      jwtid: v4(),
      iss: this.AUTH_SERVICE,
      aud: this.AUTH_SERVICE,
      sub: this.MAIL_SERVICE,
      exp,
      userMetadata: { language: "en" },
      appMetadata: { roles: ["user"] },
    };

    const secret = process.env.JWT_SECRET!;

    return JwtToken.create(payload, secret);
  }

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

  private async verifyUserPassword(options: VerifyUserPassword) {
    const { password, user } = options;
    const { passwordHash, passwordSalt } = user;

    const isHashValid = await Hash.verify(passwordHash, passwordSalt, password);
    if (!isHashValid) throw new UnauthorizedError();
  }

  async createUserWithEmailAndPassword(
    options: CreateUserWithEmailAndPasswordOptions,
  ) {
    const { email, password, displayName, manager } = options;
    const UserRepo = manager.getRepository(User);

    const isAlreadyRegistered = await UserRepo.exists({ where: { email } });
    if (isAlreadyRegistered) throw new UserAlreadyExists();

    const { hash, salt } = await Hash.create(password);
    const { id: userId } = await UserRepo.save({
      email,
      passwordHash: hash,
      passwordSalt: salt,
    });
    await this.userProfileService.createUserProfile({
      displayName,
      userId,
      manager,
    });
    await this.sendVerificationLinkToEmail({
      manager,
      userId,
      email,
      displayName,
    });
  }

  async signInWithEmailAndPassword(options: SignInWithEmailAndPasswordOptions) {
    const { manager, email, password } = options;
    const UserRepo = manager.getRepository(User);

    const user = await UserRepo.findOne({
      where: { email },
      relations: { profile: true },
    });
    if (!user) throw new UserNotFoundError();
    if (user.emailVerificationStatus !== EMAIL_VERIFICATION_STATUS.VERIFIED) {
      throw new EmailNotVerifiedError();
    }

    await this.verifyUserPassword({ user, password });

    const exp = 30 * 1000;
    return {
      accessToken: this.createUserAccessToken({ user, exp }),
      refreshToken: this.createUserRefreshToken({ user, exp: exp * 5 }),
    };
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
    await this.publisher.send("user.registered", { userId, email, html });
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
