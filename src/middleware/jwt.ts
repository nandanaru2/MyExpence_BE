import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { Userdetails } from '../controller/user_controller';

// Create access token (short-lived)
export const createAccessToken = (user: Userdetails): string => {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET || 'AvadaKedavra', { expiresIn: '15m' });
};

// Create refresh token (long-lived)
export const createRefreshToken = (user: any): string => {
  return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET || 'AvadaKedavra', { expiresIn: '7d' });
};

// Middleware to verify access token
export const verifyToken = (req: any, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.status(401).send({ message: 'Access Denied' });
    return;
  }

  const token = authHeader.split(' ')[1]; // Extract the token from "Bearer token"
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'AvadaKedavra', (err:any, decoded:any) => {
    if (err) {
      res.status(403).send({ message: 'Invalid Token' });
      return;
    }
    req.user = decoded;  // Attach decoded token to request object
    next();
  });
};
