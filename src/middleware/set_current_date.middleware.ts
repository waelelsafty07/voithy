import { NextFunction, Response } from 'express';
import RequestWithUser from '../interfaces/requestWithUser.interface';
 
async function SetCurrentDate(request: RequestWithUser, response: Response, next: NextFunction) {
  if(!request.body.date)
    request.body.date = String(new Date())
  next()
}
 
export default SetCurrentDate;