import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();


router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    let { username, password } = req.body;

    // Trim to avoid trailing spaces from copy-pasting
    username = username?.trim();
    password = password?.trim();

    const ADMIN_USER = process.env.ADMIN_USERNAME || 'Pulkit_loves_Purva';
    const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'Purvapulkit@03';
    const GF_USER = process.env.GIRLFRIEND_USERNAME || 'Purva';
    const GF_PASS = process.env.GIRLFRIEND_PASSWORD || 'Purvapulkit@03';

    const lowerUsername = username?.toLowerCase();

    // Hardcoded check for admin
    if (lowerUsername && password && lowerUsername === ADMIN_USER.toLowerCase() && password === ADMIN_PASS) {
      const token = jwt.sign(
        { username: ADMIN_USER, role: 'admin' },
        process.env.JWT_SECRET || 'fallback_secret_key_12345',
        { expiresIn: '30d' }
      );
      res.json({ token, username: ADMIN_USER, role: 'admin' });
      return;
    }

    // Check for girlfriend user
    if (lowerUsername && password && lowerUsername === GF_USER.toLowerCase() && password === GF_PASS) {
      const token = jwt.sign(
        { username: GF_USER, role: 'user' },
        process.env.JWT_SECRET || 'fallback_secret_key_12345',
        { expiresIn: '30d' }
      );
      res.json({ token, username: GF_USER, role: 'user' });
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
      return next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }
};

export default router;
