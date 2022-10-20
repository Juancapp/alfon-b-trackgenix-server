import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, require: true },
  password: { type: String, required: true },
  dni: { type: Number, required: true },
});

export default mongoose.model('Employee', employeeSchema);
