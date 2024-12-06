import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { container } from "../../config";
import { dataSource } from "../../data";
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
  async registerUser(@Arg("input") input: RegisterUserInput) {
    const service = container.get("userAuthenticationService");

    await dataSource.transaction(async (manager) => {
      await service.createUserWithEmailAndPassword({ ...input, manager });
    });

    return "User is registered successfully. We have sent you an email";
  }

  @Query(() => User)
  async getCurrentUser(@Ctx() ctx: any) {
    const service = container.get("userProfileService");

    return await service.getUserProfileWithEmail(ctx.user.email);
  }

  @Mutation(() => Boolean)
  async signInWithEmailAndPassword(
    @Ctx() ctx: any,
    @Arg("input") input: SignInWithEmailAndPasswordInput,
  ) {
    const service = container.get("userAuthenticationService");

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
    @Arg("input") input: VerifyVerificationLinkInput,
  ) {
    const { token } = input;
    const service = container.get("userAuthenticationService");

    await dataSource.transaction(async (manager) => {
      await service.verifyVerificationLink({ token, manager });
    });

    return "Thanks, Your email is verified successfully";
  }
}
