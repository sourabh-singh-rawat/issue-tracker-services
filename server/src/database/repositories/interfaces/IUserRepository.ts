import UserPostDto from '../../../dtos/user/UserPostDto';
import RepoResponse from 'src/utils/RepoResponse';

export default interface IUserRepository {
  isUserFound(uid: string): Promise<boolean>;
  insertOne(user: UserPostDto): Promise<RepoResponse>;
  findOne(id: string): Promise<RepoResponse>;
  findOneIdByUid(uid: string): Promise<RepoResponse>;
  updateOne(id: string, o: any): Promise<RepoResponse>;
  deleteOne(id: string): Promise<any>;
}
