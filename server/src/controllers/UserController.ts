import { Request, Response } from 'express';
import UserPostDto from '../dtos/user/UserPostDto.js';
import UserService from '../services/UserService.js';
import ApiResponse from '../utils/ApiResponse.js';
import { StatusCodes } from 'http-status-codes';
import UserUpdateDto from 'src/dtos/user/UserUpdateDto.js';

export class UserController {
  public async createNewUser(req: Request, res: Response) {
    const controllerResponse = new ApiResponse();

    try {
      const body = req.body;
      const user = req.user;
      const userDto: UserPostDto = {
        name: body.name,
        email: body.email,
        uid: body.uid,
        photoUrl: body.photoURL,
      };

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).send();
      }

      const serviceResponse = await UserService.createUser(userDto);
      if (!serviceResponse.isSuccess) {
        return res.send(
          await controllerResponse.createFromError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            serviceResponse.errorMessage,
          ),
        );
      }

      return res.send(
        await controllerResponse.create(serviceResponse.data, StatusCodes.OK),
      );
    } catch (error: any) {
      res.send(
        await controllerResponse.createFromError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.toString(),
        ),
      );
    }
  }

  public async getUser(req: Request, res: Response) {
    const controllerResponse = new ApiResponse();

    try {
      const { id } = req.params;

      if (!req.user) {
        return res.status(StatusCodes.UNAUTHORIZED).send();
      }

      // Service
      const serviceResponse = await UserService.getUser(id);
      if (!serviceResponse.isSuccess) {
        return res
          .status(StatusCodes.OK)
          .send(
            await controllerResponse.createFromError(
              StatusCodes.INTERNAL_SERVER_ERROR,
              serviceResponse.errorMessage,
            ),
          );
      }

      const response = await controllerResponse.create(
        serviceResponse.data,
        StatusCodes.OK,
      );

      return res.status(StatusCodes.OK).send(response);
    } catch (error: any) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(
          await controllerResponse.createFromError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.toString(),
          ),
        );
    }
  }

  public async updateUser(req: Request, res: Response) {
    const controllerResponse = new ApiResponse();
    const { id } = req.params;
    const updateDto: UserUpdateDto = req.body;

    // Check if the operation is valid or not
    const updates = Object.keys(updateDto);
    const updatebles = ['name', 'email', 'photoUrl'];
    const isValidOperation = updates.every((item) => updatebles.includes(item));
    if (!isValidOperation) return res.status(StatusCodes.BAD_REQUEST).send();

    try {
      const user = await UserService.updateUser(id, updateDto);
      if (!user.isSuccess) {
        return res.send(
          await controllerResponse.createFromError(
            StatusCodes.NOT_FOUND,
            user.errorMessage,
          ),
        );
      }

      return res.send(await controllerResponse.success(user.data));
    } catch (error: any) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(
          await controllerResponse.createFromError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.toString(),
          ),
        );
    }
  }

  public async deleteUser(req: Request, res: Response) {
    // const { id } = req.params;
    // try {
    //   const user = (await User.deleteOne(id)).rows[0];
    //   if (!user) res.status(404).send();
    //   return res.send(user);
    // } catch (error) {
    //   return res.status(500).send(error);
    // }
  }
}

export default new UserController();
