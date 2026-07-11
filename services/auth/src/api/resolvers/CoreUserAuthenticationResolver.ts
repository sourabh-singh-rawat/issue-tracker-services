import { AppContext } from "@issue-tracker/server-core";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { container, dataSource } from "../..";
import { UserAuthenticationResolver } from "./interfaces";
import {
  RegisterUserInput,
  SignInWithEmailAndPasswordInput,
  User,
  VerifyVerificationLinkInput,
} from "./types";

@Resolver()
export class CoreUserAuthenticationResolver
  implements UserAuthenticationResolver
{
  @Mutation(() => String)
  async registerUser(
    @Arg("input", () => RegisterUserInput) input: RegisterUserInput,
  ) {
    const service = container.get("userAuthenticationService");

    await dataSource.transaction(async (manager) => {
      await service.createUserWithEmailAndPassword({ ...input, manager });
    });

    return "User is registered successfully. We have sent you an email";
  }

  @Query(() => User, { nullable: true })
  async getCurrentUser(@Ctx() ctx: AppContext) {
    if (!ctx.user?.email) {
      return null;
    }

    const service = container.get("userProfileService");
    return await service.getUserProfileWithEmail(ctx.user.email);
  }

  @Mutation(() => Boolean)
  async signInWithEmailAndPassword(
    @Ctx() ctx: AppContext,
    @Arg("input", () => SignInWithEmailAndPasswordInput)
    input: SignInWithEmailAndPasswordInput,
  ) {
    const service = container.get("userAuthenticationService");
    const dataSource = container.get("dataSource");

    const { accessToken, refreshToken } = await dataSource.transaction(
      async (manager) => {
        return await service.signInWithEmailAndPassword({
          ...input,
          manager,
        });
      },
    );

    ctx.rep.setCookie("accessToken", accessToken);
    ctx.rep.setCookie("refreshToken", refreshToken);

    return true;
  }

  @Mutation(() => String)
  async verifyVerificationLink(
    @Arg("input", () => VerifyVerificationLinkInput)
    input: VerifyVerificationLinkInput,
  ) {
    const { token } = input;
    const service = container.get("userAuthenticationService");

    await dataSource.transaction(async (manager) => {
      await service.verifyVerificationLink({ token, manager });
    });

    return "Thanks, Your email is verified successfully";
  }

  @Mutation(() => String)
  async logout(@Ctx() ctx: AppContext) {
    ctx.rep.clearCookie("accessToken");
    ctx.rep.clearCookie("refreshToken");

    return "Logged out successfully";
  }
}
