import { Types } from 'mongoose';

declare global {
  namespace Express {
    interface User {
      _id: string;
      role: 'user' | 'admin';
      email: string;
    }
    
    interface Request {
      user?: User;
      rawBody?: string;
    }
  }
}
