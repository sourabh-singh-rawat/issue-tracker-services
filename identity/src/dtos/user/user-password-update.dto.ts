export interface UserPasswordUpdateDtoInputs {
  oldPassword: string;
  newPassword: string;
}

export class UserPasswordUpdateDto {
  oldPassword: string;
  newPassword: string;

  constructor({ oldPassword, newPassword }: UserPasswordUpdateDtoInputs) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}
