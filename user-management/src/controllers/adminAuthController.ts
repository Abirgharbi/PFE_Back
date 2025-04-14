import jwt from 'jsonwebtoken';
import { sendMagicLink } from '../utils/sendMagicLink';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../middleware/errorHandler';
import { generateAuthToken } from '../models/adminModel';

import dotenv from 'dotenv';
dotenv.config();

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {

        let { email } = req.body;

        const magicToken = generateAuthToken(email, '1h');
        const link = `user/admin/verifyMagicLink?token=${magicToken}`;
        await sendMagicLink(email, link, "Welcome back to your dashboard. Click the link below to sign in");
        if (email === process.env.ADMIN_EMAIL) {
            return res.status(StatusCodes.OK).json({ message: "magic link sent to your email" });
        } else {
            res.status(StatusCodes.CONFLICT).send({ message: "you are not authorized to login" });
        }
    } catch (error) {
        return next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error logging in, please try again'));
    }
}

const logout = async (req: Request, res: Response, next: NextFunction) => {
    res
        .clearCookie("token", { secure: true, httpOnly: true, sameSite: "none" })
        .header("Access-Control-Allow-Origin", process.env.FRONTEND_URL)
        .send("token removed from cookie");
};


const verifyMagicLink = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.query.token;

        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).send({ message: "token not found" });
        }

        const { jwtSecret } = process.env;

        if (!jwtSecret) {
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, 'JWT secret not defined');
        }

        const decodedToken = jwt.verify(token.toString(), jwtSecret);

        const { email } = decodedToken as { email: string };
        if (email !== process.env.ADMIN_EMAIL) {
            res.status(StatusCodes.CONFLICT).send({ message: "you are not authorized to login" });
        } else {
            // res.cookie('token', token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
            return res.redirect(`https://arkea-dashboard.vercel.app/verified`);
        }

    } catch (error) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, 'Invalid token'));
    }
}

const getToken = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = generateAuthToken(process.env.ADMIN_EMAIL, '30d');

        return res.status(StatusCodes.OK).json({ token });
    } catch (error) {
        return next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error logging in, please try again'));
    }
}


export { login, verifyMagicLink, logout, getToken };
