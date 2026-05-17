import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

const ADMIN_USER = process.env.ADMIN_USERNAME!;
const ADMIN_PASS = process.env.ADMIN_PASSWORD!;
const GF_USER = process.env.GIRLFRIEND_USERNAME!;
const GF_PASS = process.env.GIRLFRIEND_PASSWORD!;

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    let { username, password } = req.body;

    // Trim to avoid trailing spaces from copy-pasting
    username = username?.trim();
    password = password?.trim();

    // Hardcoded check for admin
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const token = jwt.sign(
        { username, role: 'admin' },
        process.env.JWT_SECRET || 'fallback_secret_key_12345',
        { expiresIn: '30d' }
      );
      res.json({ token, username, role: 'admin' });
      return;
    }

    // Check for girlfriend user
    if (username === GF_USER && password === GF_PASS) {
      const token = jwt.sign(
        { username, role: 'user' },
        process.env.JWT_SECRET || 'fallback_secret_key_12345',
        { expiresIn: '30d' }
      );
      res.json({ token, username, role: 'user' });
      return;
    }

    res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ message: 'Login error' });
  }
});

// Middleware to protect routes
export const protect = (req: Request, res: Response, next: express.NextFunction): void => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_12345');
      (req as any).user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default router;
