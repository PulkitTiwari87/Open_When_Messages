import mongoose, { Schema, Document } from 'mongoose';

export interface IPlaylistSong extends Document {
  title: string;
  artist: string;
  audioUrl: string;
  coverUrl: string;
  duration: string;
}

const PlaylistSongSchema: Schema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  audioUrl: { type: String, required: true },
  coverUrl: { type: String },
  duration: { type: String }
});

export default mongoose.model<IPlaylistSong>('PlaylistSong', PlaylistSongSchema);
