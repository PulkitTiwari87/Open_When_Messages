import mongoose, { Schema, Document } from 'mongoose';

export interface ITimelineEvent extends Document {
  title: string;
  description: string;
  date: Date;
  imageUrl: string;
  order: number;
}

const TimelineEventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  imageUrl: { type: String },
  order: { type: Number, default: 0 }
});

export default mongoose.model<ITimelineEvent>('TimelineEvent', TimelineEventSchema);
