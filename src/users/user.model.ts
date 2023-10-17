import * as mongoose from 'mongoose';
import User from './user.interface';

enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  ADMIN = 'admin',
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: Object.values(UserRole), 
  }
});
 
const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);
 
export default userModel;