import * as mongoose from 'mongoose';
import MedicalRecord from './medical_record.interface';

const userSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  note: String,
  treatment: String,
  date: Date,
});
 
const userModel = mongoose.model<MedicalRecord & mongoose.Document>('Medical Record', userSchema);
 
export default userModel;