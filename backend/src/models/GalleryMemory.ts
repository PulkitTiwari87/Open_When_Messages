import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryMemory extends Document {
  url: string;
  caption: string;
  type: 'image' | 'video';
  date: Date;
  rotation: number;
}

const GalleryMemorySchema: Schema = new Schema({
  url: { type: String, required: true },
  caption: { type: String },
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  date: { type: Date },
  rotation: { type: Number, default: 0 }
});

export default mongoose.model<IGalleryMemory>('GalleryMemory', GalleryMemorySchema);
