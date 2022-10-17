import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
  description: { type: String },
});

export default mongoose.model('Task', taskSchema);
