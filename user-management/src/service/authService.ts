import { Request, Response, NextFunction } from 'express';

export interface AuthService {
    login(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    register?(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
    verifyMagicLink(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

