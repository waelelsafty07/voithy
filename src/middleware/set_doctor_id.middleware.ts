import { NextFunction, Response } from 'express';
import RequestWithUser from '../interfaces/requestWithUser.interface';
 
async function SetDoctorID(request: RequestWithUser, response: Response, next: NextFunction) {
  if(request.user)
    request.body.doctor = String(request.user._id)

  next()
}
 
export default SetDoctorID;