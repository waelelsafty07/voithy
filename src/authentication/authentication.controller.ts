import * as bcrypt from 'bcrypt';
import * as crypto from "crypto";

import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../users/user.dto';
import User from '../users/user.interface';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import Controller from '../interfaces/controller.interface';
import userModel from './../users/user.model';

import * as expressAsyncHandler from 'express-async-handler';
import AuthenticationService from './authentication.service';
import LogInDto from './logIn.dto';
import TokenData from 'interfaces/tokenData.interface';
import DataStoredInToken from 'interfaces/dataStoredInToken';


class AuthenticationController implements Controller {
    public path = '/auth';
    public router = express.Router();
    private user = userModel;
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);
        this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);
    }

    private createToken(user: User): TokenData {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.JWT_SECRET_KEY;
        const dataStoredInToken: DataStoredInToken = {
            _id: String(user._id),
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }
  /**
   * @openapi
   * '/auth/register':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
    private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const userData: CreateUserDto = request.body;
        if (
            await this.user.findOne({ where: { email: userData.email } })
        ) {
            next(new UserWithThatEmailAlreadyExistsException(userData.email));
        } else {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = await this.user.create({
                ...userData,
                password: hashedPassword,
            });
            user.password = undefined;
            const tokenData = this.createToken(user);
            // response.setHeader('Set-Cookie', this.createCookie(tokenData));
            response.send(user);
        }
    }
    private createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn} Path=/`;
    }

    private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const logInData: LogInDto = request.body;
        const user = await this.user.findOne({ email: logInData.email }).select('+password');
        if (user) {
            const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
            if (isPasswordMatching) {
                user.password = undefined;
                const tokenData = this.createToken(user);
                response.setHeader('Set-Cookie', this.createCookie(tokenData));
                console.log(this.createCookie(tokenData))

                response.json({ tokenData, user });
            } else {
                next(new WrongCredentialsException());
            }
        } else {
            next(new WrongCredentialsException());
        }
    }


    
}

export default AuthenticationController;