declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        role: 'user' | 'admin';
        email: string;
      };
    }
  }
}

export {};
