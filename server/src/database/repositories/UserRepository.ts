import { QueryResult } from 'pg';
import db from '../DatabaseContext.js';
import UserPostDto from '../../dtos/user/UserPostDto.js';
import IUserRepository from './interfaces/IUserRepository.js';
import UserGetDto from '../../dtos/user/UserGetDto.js';
import UserUpdateDto from '../../dtos/user/UserUpdateDto.js';
import RepoResponse from '../../utils/RepoResponse.js';

export class UserRepository implements IUserRepository {
  public async isUserFound(uid: string): Promise<boolean> {
    const queryResult: QueryResult = await db.query(
      'SELECT * FROM users where uid = $1',
      [uid],
    );

    return queryResult.rowCount > 0;
  }

  public async insertOne(user: UserPostDto): Promise<RepoResponse> {
    const repoResponse = new RepoResponse();

    try {
      const queryResult: QueryResult = await db.query(
        `SELECT * FROM insert_user($1, $2, $3)`,
        [user.name, user.email, user.uid],
      );

      if (!queryResult) {
        return await repoResponse.createFromError('Query Failed');
      }

      const result = queryResult.rows[0];
      const createdUser: UserGetDto = {
        id: result.id,
        name: result.name,
        uid: result.uid,
      };

      return await repoResponse.success(createdUser);
    } catch (error: any) {
      console.error(error);
      return await repoResponse.createFromError(error.toString());
    }
  }

  public async findOne(id?: string): Promise<RepoResponse> {
    const repoResponse = new RepoResponse();

    try {
      if (!id) {
        return await repoResponse.createFromError('Query Failed');
      }

      const queryResult: QueryResult = (
        await db.query(`SELECT * FROM users WHERE id=$1`, [id])
      ).rows[0];

      if (queryResult) {
        return await repoResponse.success(queryResult);
      }
      return await repoResponse.create(null, false, 'Cannot execute');
    } catch (error: any) {
      return await repoResponse.createFromError(error.toString());
    }
  }

  public async findOneIdByUid(uid: string) {
    const repoResponse = new RepoResponse();

    try {
      console.log(`SELECT id FROM users WHERE uid = ${uid}`);
      const queryResult: QueryResult = await db.query(
        `SELECT id FROM users WHERE uid = $1`,
        [uid],
      );

      if (!queryResult) {
        return await repoResponse.createFromError('Query Failed');
      }
      return await repoResponse.success(queryResult.rows[0]);
    } catch (error: any) {
      console.error(error);
      return await repoResponse.createFromError(error.toString());
    }
  }

  public async updateOne(
    id: string,
    user: UserUpdateDto,
  ): Promise<RepoResponse> {
    const repoResponse = new RepoResponse();
    try {
      const queryResult: QueryResult = await db.query(
        'SELECT * FROM update_user($1, $2, $3, $4)',
        [user.name, user.email, user.photoUrl, id],
      );

      if (!queryResult) {
        repoResponse.createFromError('Query Failed');
      }

      return await repoResponse.success(queryResult.rows[0]);
    } catch (error: any) {
      console.log(error);
      return await repoResponse.createFromError(error.toString());
    }
  }

  public async deleteOne(id: string) {
    return db.query(`DELETE FROM users WHERE uid = $1 RETURNING *`, [id]);
  }
}

export default new UserRepository();
