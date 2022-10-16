import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema({
  name: { type: String, required: true },
  lasName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dni: { type: Number, required: true },
  phone: { type: Number, required: true },
});

export default mongoose.model('Admin', adminSchema);
