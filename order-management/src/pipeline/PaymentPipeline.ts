
import { Request, Response } from 'express';
import { PaymentHandler } from './paymenthandler';

export class PaymentPipeline {
  private handlers: PaymentHandler[] = [];

  addHandler(handler: PaymentHandler): void {
    this.handlers.push(handler);
  }

  async execute(req: Request, res: Response): Promise<void> {
    let index = 0;
    const next = async () => {
      if (index < this.handlers.length) {
        const handler = this.handlers[index++];
        await handler.handle(req, res, next);
      }
    };
    await next();
  }
}
