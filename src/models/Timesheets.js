import mongoose from 'mongoose';

const { Schema } = mongoose;

const timesheetsSchema = new Schema({
  description: { type: String, required: true },
  date: { type: Date, required: true },
  task: { type: String, required: true },
  hours: { type: Number, required: true },
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
});

export default mongoose.model('Timesheets', timesheetsSchema);
