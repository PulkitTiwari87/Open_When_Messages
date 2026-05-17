import express, { Request, Response } from 'express';
import Letter from '../models/Letter';
import https from 'https';

import { protect } from './auth';

const router = express.Router();

const extractGooglePhotosUrl = (url: string): Promise<string> => {
  return new Promise((resolve) => {
    if (!url || typeof url !== 'string') return resolve(url);
    if (!url.includes('photos.app.goo.gl') && !url.includes('photos.google.com')) {
      return resolve(url);
    }

    const fetchUrl = (currentUrl: string) => {
      https.get(currentUrl, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          let nextUrl = res.headers.location;
          if (nextUrl.startsWith('/')) {
            const urlObj = new URL(currentUrl);
            nextUrl = `${urlObj.protocol}//${urlObj.host}${nextUrl}`;
          }
          fetchUrl(nextUrl);
        } else {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            // First try og:image
            let match = data.match(/<meta property="og:image" content="([^"]+)"/i);
            if (!match) {
              // Try finding image inside js callback
              match = data.match(/(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]+)/i);
            }
            if (match) {
              let finalUrl = match[1];
              // Set high-res display parameters instead of =d which forces download
              if (finalUrl.includes('=')) {
                finalUrl = finalUrl.split('=')[0];
              }
              finalUrl = finalUrl + '=w1920-h1920-no';
              resolve(finalUrl);
            } else {
              resolve(url);
            }
          });
        }
      }).on('error', () => resolve(url));
    };

    fetchUrl(url);
  });
};

// Get all letters
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const letters = await Letter.find().select('-message');
    res.json(letters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching letters' });
  }
});

// Get single letter
router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const letter = await Letter.findOne({ slug: req.params.slug });
    if (!letter) {
      res.status(404).json({ message: 'Letter not found' });
      return;
    }
    // Check if admin is requesting
    let isAdmin = false;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_12345');
        if (decoded.role === 'admin') isAdmin = true;
      } catch (error) {
        // Just fail silently for invalid tokens
      }
    }

    // Update opened status if unlocked
    if (isAdmin || new Date() >= new Date(letter.unlockDate)) {
      if (!letter.isOpened && new Date() >= new Date(letter.unlockDate)) {
        letter.isOpened = true;
        await letter.save();
      }
    } else {
      // It's locked, don't send message or gallery images
      letter.message = 'Locked';
      letter.galleryImages = [];
      letter.videos = [];
      letter.voiceNotes = [];
    }
    res.json(letter);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching letter' });
  }
});

// Create letter (Admin)
router.post('/', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const data = { ...req.body };
    if (data.heroImage) data.heroImage = await extractGooglePhotosUrl(data.heroImage);
    if (data.galleryImages && Array.isArray(data.galleryImages)) {
      data.galleryImages = await Promise.all(data.galleryImages.map((img: string) => extractGooglePhotosUrl(img)));
    }
    
    const letter = new Letter(data);
    await letter.save();
    res.status(201).json(letter);
  } catch (error) {
    res.status(500).json({ message: 'Error creating letter' });
  }
});

// Update letter (Admin)
router.put('/:id', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const data = { ...req.body };
    if (data.heroImage) data.heroImage = await extractGooglePhotosUrl(data.heroImage);
    if (data.galleryImages && Array.isArray(data.galleryImages)) {
      data.galleryImages = await Promise.all(data.galleryImages.map((img: string) => extractGooglePhotosUrl(img)));
    }

    const letter = await Letter.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(letter);
  } catch (error) {
    res.status(500).json({ message: 'Error updating letter' });
  }
});

// Delete letter (Admin)
router.delete('/:id', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    await Letter.findByIdAndDelete(req.params.id);
    res.json({ message: 'Letter deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting letter' });
  }
});

export default router;
