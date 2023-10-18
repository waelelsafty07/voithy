import { Router, Request, Response, NextFunction } from 'express';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';
import Controller from '../interfaces/controller.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import authMiddleware from '../middleware/auth.middleware';
import userModel from './user.model';
import UserNotFoundException from '../exceptions/UserNotFoundException';

class UserController implements Controller {
  public path = '/users';
  public router = Router();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/patients`, authMiddleware, this.getAllPatient);
    this.router.get(`${this.path}/user/:id`, authMiddleware, this.getUserById);
  }

  private getUserById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const userQuery = this.user.findById(id);
   
    const user = await userQuery;
    if (user) {
      response.send(user);
    } else {
      next(new UserNotFoundException(id));
    }
  }
  /**
   * @swagger
   * /users/patients:
   *  get:
   *     tags:
   *     - Patients
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  private getAllPatient = async (request: Request, response: Response, next: NextFunction) => {
    const userQuery = this.user.find({ role: 'patient' }).populate('medical_history');
   
    const user = await userQuery.exec();;
    if (user) {
      response.send(user);
    } else {
      
    }
  }

  private getMyPatients = async (request: Request, response: Response, next: NextFunction) => {
    const userQuery = this.user.find({ role: 'patient' }).populate('medical_history');
   
    const user = await userQuery.exec();;
    if (user) {
      response.send(user);
    } else {
      
    }
  }

}

export default UserController;