import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../middleware/errorHandler';
import dotenv from 'dotenv';
dotenv.config();
import { Promo } from '../models/promoModel';
import { ObjectId } from 'mongodb';

// add promo
const addPromo = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response<any> | void> => {

    const { code, discount, expire_date, start_date } = req.body;

    try {
        const promo = await Promo.create({
            code,
            discount,
            expire_date,
            start_date
        });

        return res.status(StatusCodes.CREATED).json(promo);
    } catch (error) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
}

// get promos
const getPromos = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response<any> | void> => {
    try {
        var perPage = 5;
        var page: number = Number(req.query.page);
        page > 0 ? page : page = 0;

        const promos = await Promo.find().sort({ createdAt: -1 })
            .limit(perPage)
            .skip(perPage * page);
        const count = await Promo.find()
            .countDocuments();

        return res.status(StatusCodes.OK).json({
            count,
            promos
        });
    } catch (error) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
}


const deletePromo = async (
    req: Request,
    res: Response,
    next: NextFunction

): Promise<Response<any> | void> => {

    try {
        const id = new ObjectId(req.params.id);

        const promo = await Promo.deleteOne(id);
        if (!promo) {
            throw new CustomError(StatusCodes.NOT_FOUND, 'promo not found');
        }
        return res.status(StatusCodes.OK).json(promo);
    } catch (error) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
}

// update promo
const updatePromo = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response<any> | void> => {
    const { id } = req.params;
    const { code, discount, expire_date } = req.body;

    try {
        const promo = await Promo.findByIdAndUpdate(
            id,
            {
                code,
                discount,
                expire_date
            },
            { new: true }
        );
        if (!promo) {
            throw new CustomError(StatusCodes.NOT_FOUND, 'promo not found');
        }
        return res.status(StatusCodes.OK).json(promo);
    } catch (error) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
}


const getValidPromos = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response<any> | void> => {
    try {
        const currentDate = new Date().toISOString().split('T')[0]; // Extract the current date in the format 'YYYY-MM-DD'

        const promos = await Promo.find({
            $and: [
                { expire_date: { $gte: currentDate } },
                { start_date: { $lte: currentDate } }
            ]
        });

        return res.status(StatusCodes.OK).json({ promos });
    } catch (error) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
}

const incrementTotalApply = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response<any> | void> => {
    const { id } = req.params;
    try {
        const promo = await Promo.findByIdAndUpdate(
            id,
            { $inc: { total_apply: 1 } },
            { new: true }
        );
        return res.status(StatusCodes.OK).json(promo);
    } catch (error) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
}

export { addPromo, getPromos, deletePromo, updatePromo, getValidPromos, incrementTotalApply };