import UserPostDto from '../../dtos/user/UserPostDto';
import ServiceResponse from '../../utils/ServiceResponse';

export default interface IUserService {
  createUser(user: UserPostDto): Promise<ServiceResponse>;
  getUser(uid: string): Promise<ServiceResponse>;
  updateUser(uid: string, user: UserPostDto): Promise<ServiceResponse>;
  deleteUser(uid: string): Promise<ServiceResponse>;
}
