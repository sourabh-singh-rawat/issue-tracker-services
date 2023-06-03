import UserRepository from '../database/repositories/UserRepository.js';
import IUserService from './interfaces/IUserService.js';
import UserPostDto from '../dtos/user/UserPostDto.js';
import ServiceResponse from '../utils/ServiceResponse.js';
import UserUpdateDto from 'src/dtos/user/UserUpdateDto.js';
import RepoResponse from 'src/utils/RepoResponse.js';

export class UserService implements IUserService {
  private async isUserFoundByUid(uid: string): Promise<boolean> {
    if (uid) return await UserRepository.isUserFound(uid);
    return false;
  }

  private async getUserIdByUid(uid: string): Promise<string | null> {
    if (uid) {
      // Check if the user exists
      const isUserFound = await this.isUserFoundByUid(uid);
      if (!isUserFound) {
        return null;
      }

      // User exists, then get user information
      const repoResponse = await UserRepository.findOneIdByUid(uid);
      if (!repoResponse.isSuccess) {
        return null;
      }

      return repoResponse.data.id;
    }
    return null;
  }

  public async createUser(userToUpdate: UserPostDto): Promise<ServiceResponse> {
    const serviceResponse = new ServiceResponse();

    try {
      // Check if user already exists
      const userId = await this.getUserIdByUid(userToUpdate.uid);
      console.log(userId);
      if (!userId) {
        // User does not exist, create them
        const createdUser = await UserRepository.insertOne(userToUpdate);
        return await serviceResponse.success(createdUser.data);
      }

      // User already exists, update their information
      const repoResponse = await UserRepository.updateOne(userId, userToUpdate);
      if (!repoResponse.isSuccess) {
        return await serviceResponse.createFromError(repoResponse.errorMessage);
      }

      return await serviceResponse.success(repoResponse.data);
    } catch (error: any) {
      console.error(error);
      return await serviceResponse.createFromError(error.toString());
    }
  }

  public async getUser(uid: string | null): Promise<ServiceResponse> {
    const serviceResponse = new ServiceResponse();
    try {
      if (!uid) {
        return await serviceResponse.createFromError(
          'Please enter a correct uid',
        );
      }

      // Get User Id
      const userId = await this.getUserIdByUid(uid);
      if (!userId) {
        return await serviceResponse.createFromError('User Not Found');
      }

      const user = await UserRepository.findOne(userId);
      return await serviceResponse.success(user.data);
    } catch (error: any) {
      return await serviceResponse.createFromError(error.toString());
    }
  }

  public async updateUser(
    uid: string,
    user: UserUpdateDto,
  ): Promise<ServiceResponse> {
    const serviceResponse = new ServiceResponse();
    try {
      if (!uid) {
        return await serviceResponse.createFromError(
          'Please enter a correct uid',
        );
      }

      const userId = await this.getUserIdByUid(uid);
      console.log(userId);
      if (!userId) {
        return await serviceResponse.createFromError('User Not Found');
      }

      const updatedUser: RepoResponse = await UserRepository.updateOne(
        userId,
        user,
      );
      if (!updatedUser.isSuccess) {
        return await serviceResponse.createFromError(updatedUser.errorMessage);
      }

      return await serviceResponse.success(updatedUser.data);
    } catch (error: any) {
      console.log(error);
      return await serviceResponse.createFromError(error.toString());
    }
  }

  async deleteUser(uid: string): Promise<ServiceResponse> {
    throw new Error('Method not implemented.');
  }
}

export default new UserService();
