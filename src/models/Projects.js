import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema({
  name: { type: String },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  clientName: { type: String },
  employees: {
    id: { type: String },
    role: { type: String },
    rate: { type: String },
  },
  active: { type: Boolean },
});

export default mongoose.model('Project', projectSchema);
