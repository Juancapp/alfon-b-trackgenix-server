import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  dni: { type: Number, required: true },
  phone: { type: Number, required: true },
  firebaseUid: { type: String, required: true },
});

export default mongoose.model('Admin', adminSchema);
