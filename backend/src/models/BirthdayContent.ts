import mongoose, { Schema, Document } from 'mongoose';

export interface IBirthdayContent extends Document {
  year: number;
  message: string;
  videoUrl: string;
  unlockDate: Date;
}

const BirthdayContentSchema: Schema = new Schema({
  year: { type: Number, required: true },
  message: { type: String, required: true },
  videoUrl: { type: String },
  unlockDate: { type: Date, required: true }
});

export default mongoose.model<IBirthdayContent>('BirthdayContent', BirthdayContentSchema);
