import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminSchema = new Schema({
  name: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true },
  dni: { type: Number, required: true },
  phone: { type: Number, require: true },
  firebaseUid: { type: String, required: true },
});

export default mongoose.model('superAdmin', superAdminSchema);
