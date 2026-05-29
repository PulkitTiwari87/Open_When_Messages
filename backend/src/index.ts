import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });

import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import letterRoutes from './routes/letters';
import authRoutes from './routes/auth';
import uploadRoutes from './routes/upload';

const app = express();
const PORT = process.env.PORT || 5000;

// Clean and build allowed origins array dynamically
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
const rawFrontendUrl = process.env.FRONTEND_URL;
if (rawFrontendUrl) {
  rawFrontendUrl.split(',').forEach(url => {
    const trimmed = url.trim();
    if (trimmed) {
      try {
        // Extract strictly the origin (e.g. 'https://domain.com' from 'https://domain.com/login')
        allowedOrigins.push(new URL(trimmed).origin);
      } catch {
        // Fallback for relative or malformed URLs (strip trailing slash)
        allowedOrigins.push(trimmed.replace(/\/$/, ''));
      }
    }
  });
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api/letters', letterRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

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

