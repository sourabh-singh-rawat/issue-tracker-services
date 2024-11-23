import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { UserAuthenticationResolver } from "./interfaces";
import { container, dataSource } from "..";
import {
  RegisterUserInput,
  SignInWithEmailAndPasswordInput,
  User,
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
  async getCurrentUser() {
    const service = container.get("userProfileService");

    return await service.getUserProfileWithEmail("Sourabh.rawatcc@gmail.com");
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
}
