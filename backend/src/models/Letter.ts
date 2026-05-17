import mongoose, { Schema, Document } from 'mongoose';

export interface ILetter extends Document {
  title: string;
  slug: string;
  subtitle: string;
  purpose: string;
  message: string;
  emotionalQuote: string;
  heroImage: string;
  galleryImages: string[];
  galleryTexts: string[];
  videos: string[];
  voiceNotes: string[];
  audioUrl?: string;
  unlockDate: Date;
  isLocked: boolean;
  isOpened: boolean;
  moodTheme: string;
  particlesStyle: string;
  endingMessage: string;
  createdAt: Date;
}

const LetterSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subtitle: { type: String },
  purpose: { type: String },
  message: { type: String, required: true },
  emotionalQuote: { type: String },
  heroImage: { type: String },
  galleryImages: [{ type: String }],
  galleryTexts: [{ type: String }],
  videos: [{ type: String }],
  voiceNotes: [{ type: String }],
  audioUrl: { type: String, default: '' },
  unlockDate: { type: Date, required: true },
  isLocked: { type: Boolean, default: true },
  isOpened: { type: Boolean, default: false },
  moodTheme: { type: String, default: 'dark-romantic' },
  particlesStyle: { type: String, default: 'dust' },
  endingMessage: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ILetter>('Letter', LetterSchema);
