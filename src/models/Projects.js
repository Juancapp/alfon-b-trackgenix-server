import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: true },
    clientName: { type: String, required: true },
    active: { type: Boolean, required: true },
    employees: {
      type: [
        {
          _id: false,
          employee: { type: Schema.Types.ObjectId, ref: 'Employee' },
          role: { type: String, enum: ['DEV', 'QA', 'TL', 'PM'] },
          rate: { type: Number, required: true },
        },
      ],
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Project', projectSchema);
