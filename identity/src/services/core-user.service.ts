import { UserRepository } from "../data/repositories/interfaces/user-repository.interface";
import { UserCredentialsDTO } from "../dtos/user";
import { CreateUserRequestDTO } from "../dtos/user/create-user-request.dto";
import { UserDetailsDto } from "../dtos/user/user-details.dto";
import { UserPasswordUpdateDto } from "../dtos/user/user-password-update.dto";
import { UserService } from "./interfaces/user-service.interface";
import argon2 from "argon2";
import { randomBytes } from "crypto";

interface ServiceResponseInputs<T> {
  data: T | T[] | null;
  dataCount?: number;
}

export class ServiceResponse<T> {
  data: T | T[] | null;
  dataCount?: number;

  constructor({ data, dataCount }: ServiceResponseInputs<T>) {
    this.data = data;
    this.dataCount = dataCount;
  }
}

export class CoreUserService implements UserService {
  private readonly _userRepository;

  constructor(container: { userRepository: UserRepository }) {
    this._userRepository = container.userRepository;
  }

  /**
   * Creates user and their profile
   * @param user
   * @returns
   */
  createUser = async (
    user: CreateUserRequestDTO,
  ): Promise<ServiceResponse<UserDetailsDto>> => {
    const { email, password } = user;

    // Checks if the email already exists
    const doesUserExist = await this._userRepository.existsByEmail(email);

    if (doesUserExist) {
      throw new Error("User already exists");
    }

    // Hashes the password
    const hashedPassword = await this.hashPassword(password);

    // Saves the newly created user
    const userToSave = new UserCredentialsDTO({
      email,
      password: hashedPassword,
    });
    const createdUser = await this._userRepository.save(userToSave);

    const userDetails = new UserDetailsDto({
      id: createdUser.id,
      email: createdUser.email,
      isEmailVerified: createdUser.isEmailVerified,
      createdAt: createdUser.createdAt,
    });

    const serviceResponse = new ServiceResponse<UserDetailsDto>({
      data: userDetails,
    });

    return serviceResponse;
  };

  /**
   * Updates user email
   * @param id
   * @param email
   * @returns
   */
  updateEmail = async (id: string, email: string) => {
    const updatedUser = await this._userRepository.updateEmail(id, email);

    return updatedUser;
  };

  /**
   * Update user password.
   * @param {string} id id of the user whos password is being updated.
   * @param {UserPasswordUpdateDto} data
   * @returns service response?
   */
  updatePassword = async (id: string, data: UserPasswordUpdateDto) => {
    // Check if old password matches with the new password
    // If matched update the user's passwords

    const updatedUser = await this._userRepository.updatePassword(
      id,
      data.newPassword,
    );

    return updatedUser;
  };

  // Hash password function
  hashPassword = async (password: string): Promise<string> => {
    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash(password, { salt });

    return `${hashedPassword}#${salt.toString("hex")}`;
  };

  // Compare password function
}
