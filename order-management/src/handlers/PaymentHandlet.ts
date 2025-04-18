// PaymentHandler.ts
import { Request, Response } from 'express';

export abstract class PaymentHandler {  
    protected nextHandler?: PaymentHandler;

    public setNext(handler: PaymentHandler): PaymentHandler {
        this.nextHandler = handler;
        return handler;
    }

    public async handle(req: Request, res: Response): Promise<Response<any>> {
        if (this.nextHandler) {
            return this.nextHandler.handle(req, res);
        }
        return res.status(400).send({ error: "Request not handled!" });
    }
}
