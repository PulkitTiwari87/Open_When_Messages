import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import letterRoutes from './routes/letters';
import authRoutes from './routes/auth';
import uploadRoutes from './routes/upload';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api/letters', letterRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

import path from 'path';
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Secret API is running' });
});

import { seedLetters } from './seed';

// Start server first so hosting platforms (like Render) know the app is alive
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Connect to MongoDB asynchronously
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/secret';
  console.log('Connecting to MongoDB...');
  
  mongoose.connect(MONGODB_URI)
    .then(async () => {
      console.log('Connected to MongoDB successfully');
      await seedLetters();
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
      console.error('Please ensure MONGODB_URI is correctly set in your Render environment variables.');
    });
});

