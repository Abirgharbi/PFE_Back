import { AuthService } from '../service/authService';
import { Customer, generateAuthToken } from '../models/customerModel';
import { sendMagicLink } from '../utils/sendMagicLink';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../middleware/errorHandler';
import jwt from 'jsonwebtoken';

export class CustomerAuthService implements AuthService {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const customer = await Customer.findOne({ email });

      if (!customer) {
        return res.status(StatusCodes.CONFLICT).send({ message: "Please create an account." });
      }

      if (!customer.verified) {
        return res.status(StatusCodes.CONFLICT).send({ message: "Verify your Account." });
      }

      const magicToken = generateAuthToken(email, '1h');
      await sendMagicLink(email, `user/verifyMagicLink?token=${magicToken}`, "Click to sign in");

      const token = generateAuthToken(email, '30d');
      return res.status(StatusCodes.OK).json({ token, customer });

    } catch (err) {
      next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error logging in'));
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name } = req.body;
      const exists = await Customer.findOne({ email });

      if (!exists) {
        await sendMagicLink(email, generateAuthToken(email, '1h'), "Confirm your email");
        const customer = await Customer.create({ email, name });
        const token = generateAuthToken(email, '30d');
        return res.status(StatusCodes.OK).json({ token, customer });
      } else {
        return res.status(StatusCodes.CONFLICT).send({ message: "Email already exists" });
      }
    } catch (error) {
      return next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error registering customer'));
    }
  }

  async verifyMagicLink(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.query.token;
      if (!token) return res.status(StatusCodes.UNAUTHORIZED).send({ message: "token not found" });

      const decoded = jwt.verify(token.toString(), process.env.JWT_SECRET!);
      const { email } = decoded as { email: string };

      const customer = await Customer.findOne({ email });
      if (!customer) return res.status(StatusCodes.UNAUTHORIZED).send({ message: "customer does not exist" });

      await Customer.findByIdAndUpdate(customer._id, { verified: true });
      return res.redirect("https://arkealink.page.link/naxz");

    } catch (error) {
      next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, 'Invalid token'));
    }
  }
}
