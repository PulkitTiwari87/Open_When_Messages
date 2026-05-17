import mongoose, { Schema, Document } from 'mongoose';

export interface IMemory extends Document {
  title: string;
  date: Date;
  description: string;
  imageUrl: string;
  type: 'gallery' | 'timeline';
}

const MemorySchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  type: { type: String, enum: ['gallery', 'timeline'], required: true },
}, { timestamps: true });

export default mongoose.model<IMemory>('Memory', MemorySchema);
