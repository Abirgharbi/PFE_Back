import { Request, Response } from 'express';

export interface PaymentHandler {
  handle(req: Request, res: Response, next: () => Promise<void>): Promise<void>;
}
