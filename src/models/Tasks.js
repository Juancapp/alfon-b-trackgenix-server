import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  id: Number,
  description: { type: String },
});

export default mongoose.model('Task', taskSchema);
