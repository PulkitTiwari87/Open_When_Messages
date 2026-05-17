import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { protect } from './auth';

const router = express.Router();

// Configure Cloudinary if keys are provided
const useCloudinary = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;
if (useCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

// Local storage fallback setup
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/', protect, upload.single('file'), async (req, res): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    if (useCloudinary) {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'open_when_messages',
        resource_type: 'auto'
      });
      
      // Clean up the local file after upload
      fs.unlinkSync(req.file.path);
      
      res.json({ url: result.secure_url });
    } else {
      // Local fallback: dynamically build the URL using the request protocol and host
      const host = req.get('host');
      const protocol = req.protocol;
      const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
      res.json({ url: fileUrl });
    }
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed' });
  }
});

export default router;
