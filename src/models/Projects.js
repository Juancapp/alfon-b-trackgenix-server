import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  description: { type: String, required: true },
  employees: [
    {
      name: { type: String, required: true },
      role: { type: String, required: true, enum: ['DEV', 'QA', 'TL'] },
      rate: { type: Number, required: true },
    },
  ],
});

export default mongoose.model('Project', projectSchema);
