import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import MedicalModel from './medical_record.model';
import restrictTo from '../middleware/restrictTo.middleware';
import CreateMedicalRecordDto from './medical_record.dto';
import SetDoctorID from '../middleware/set_doctor_id.middleware';
import validationMiddleware from '../middleware/validation.middleware';
import SetPatientID from '../middleware/set_patient_id.middleware';
import SetCurrentDate from '../middleware/set_current_date.middleware';
import { redisPublisher } from '../redis_config';
import RequestWithUser from '../interfaces/requestWithUser.interface';

class MedicalRecordController implements Controller {
  public path = '/medical-record';
  public router = Router();
  private medical_record = MedicalModel
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:patient`, authMiddleware,
      restrictTo('doctor'),
      SetDoctorID,
      SetPatientID, 
      SetCurrentDate, 
      validationMiddleware(CreateMedicalRecordDto),
      this.create_medical_record);

    this.router.get(`${this.path}/me`, authMiddleware,
      restrictTo('patient'),
      this.getMyPatients);
  }
  
  private create_medical_record =async (request: Request, response: Response, next: NextFunction) => {
    const medical_record: CreateMedicalRecordDto = request.body;
    const record = await this.medical_record.create({
      ...medical_record
    });
    
    redisPublisher.publish('patientMedicalRecordCreated', JSON.stringify(record));
    response.send(record);
  }

  private getMyPatients = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    const userQuery = this.medical_record.find({ _id: request.user._id }).populate('medical_history');
   
    const user = await userQuery.exec();;
    if (user) {
      response.send(user);
    } else {
      
    }
  }


}

export default MedicalRecordController;