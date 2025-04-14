// payment controller changed with chaine of responsibility
import { Request, Response } from 'express';
import { CustomerValidationHandler } from '../handlers/CustomerValidationHandler';
import { PaymentMethodValidationHandler } from '../handlers/PaymentMethodValidationHandler';
import { PaymentIntentCreationHandler } from '../handlers/PaymentIntentCreationHandler';

export const pay = async (req: Request, res: Response): Promise<Response<any>> => {
    const customerHandler = new CustomerValidationHandler();
    const methodHandler = new PaymentMethodValidationHandler();
    const intentHandler = new PaymentIntentCreationHandler();

    customerHandler.setNext(methodHandler).setNext(intentHandler);

    return customerHandler.handle(req, res);
};
