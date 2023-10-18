import * as mongoose from 'mongoose';
import User from './user.interface';

enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  ADMIN = 'admin',
}

const userSchema = new mongoose.Schema({
  firstName: String,
  lasttName: String,
  name: String,
  email: String,
  password:  { type: String, select: false },
  role: {
    type: String,
    enum: Object.values(UserRole), 
  }
},{
  toJSON: { getters: true, virtuals: true },
  toObject: { virtuals: true },
});
 
userSchema.virtual('medical_history', {
  ref: 'Medical Record',
  localField: '_id',
  foreignField: 'patient'
});
const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);
 
export default userModel;