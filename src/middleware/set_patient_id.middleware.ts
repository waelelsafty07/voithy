import { NextFunction, Response } from 'express';
import RequestWithUser from '../interfaces/requestWithUser.interface';
 
async function SetPatientID(request: RequestWithUser, response: Response, next: NextFunction) {
  if(request.params.patient)
    request.body.patient = String(request.params.patient)
  next()
}
 
export default SetPatientID;