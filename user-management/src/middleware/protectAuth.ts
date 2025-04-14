import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const protectAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    res.redirect('/login');
  } else {
    const secret = process.env.JWT_SECRET;
    try {
      jwt.verify(token, secret);
      next();
    } catch (err) {
      res.redirect('/login');
    }
  }

};
