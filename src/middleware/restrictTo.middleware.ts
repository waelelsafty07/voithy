import { NextFunction, Response } from 'express';
import * as expressAsyncHandler from 'express-async-handler';
import NotAllowedToDoThisAction from '../exceptions/NotAllowedToDoThisAction';
import RequestWithUser from '../interfaces/requestWithUser.interface';

const restrictTo = (...roles: any[]) =>
    expressAsyncHandler(async (request: RequestWithUser, response: Response, next: NextFunction) => {
        // roles ['patient', 'doctor', 'admin']. role='user'
        console.log(request.user.role)
        if (!roles.includes(request.user.role)) {

            return next(
                new NotAllowedToDoThisAction()
            );
        }
        next();
    });

export default restrictTo;