import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetsSchema = new Schema({
  description: { type: String, required: true },
  date: { type: Date, required: true },
  task: { type: String, required: true },
});

export default mongoose.model('Timesheets', timeSheetsSchema);
