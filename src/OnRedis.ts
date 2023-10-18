import MedicalModel from "./medical_record/medical_record.model";
import NotificationService from "./Notifications/NotificationService";
import sendEmailWhenCreateMedicalRecord from "./medical_record/mail/sendEmailWhenCreateMedicalRecord";
import {redisSubscriber} from "./redis_config";

class OnRedis {
    private medical_record = MedicalModel
 
    constructor(){
        redisSubscriber.subscribe('patientMedicalRecordCreated');
        redisSubscriber.on('message', async (channel, message) => {
        if (channel === 'patientMedicalRecordCreated') {
            const newPatientRecord = JSON.parse(message);
            const Data = await this.medical_record.populate(newPatientRecord, { path: 'patient doctor' });
            // Send email notifications
            const mailSender = new sendEmailWhenCreateMedicalRecord().IntializeMail(Data);
                const Notify = new NotificationService();
                Notify.Services = [mailSender];
                Notify.Notify();
        }
        });
        
    }
}

export default OnRedis
