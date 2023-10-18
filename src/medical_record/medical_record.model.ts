import * as mongoose from 'mongoose';
import MedicalRecord from './medical_record.interface';

const MedicalSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  note: String,
  treatment: String,
  date: Date,
});
 
const MedicalModel = mongoose.model<MedicalRecord & mongoose.Document>('Medical Record', MedicalSchema);
 
export default MedicalModel;