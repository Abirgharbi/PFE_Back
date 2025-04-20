import { AuthService } from '../service/authService';
import { generateAuthToken } from '../models/adminModel';
import { sendMagicLink } from '../utils/sendMagicLink';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../middleware/errorHandler';
import jwt from 'jsonwebtoken';

export class AdminAuthService implements AuthService {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            if (email !== process.env.ADMIN_EMAIL) {
                return res.status(StatusCodes.CONFLICT).send({ message: "you are not authorized to login" });
            }

            const magicToken = generateAuthToken(email, '1h');
            await sendMagicLink(email, `user/admin/verifyMagicLink?token=${magicToken}`, "Welcome back to your dashboard");

            return res.status(StatusCodes.OK).json({ message: "magic link sent to your email" });

        } catch (err) {
            next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error logging in'));
        }
    }

    async verifyMagicLink(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.query.token;
            if (!token) return res.status(StatusCodes.UNAUTHORIZED).send({ message: "token not found" });

            const decoded = jwt.verify(token.toString(), process.env.JWT_SECRET!);
            const { email } = decoded as { email: string };

            if (email !== process.env.ADMIN_EMAIL) {
                return res.status(StatusCodes.CONFLICT).send({ message: "unauthorized" });
            }

            return res.redirect("https://arkea-dashboard.vercel.app/verified");
        } catch (err) {
            next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, 'Invalid token'));
        }
    }
}