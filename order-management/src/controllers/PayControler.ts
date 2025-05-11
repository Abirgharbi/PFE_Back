import { Request, Response } from 'express';
import { CustomerValidationHandler } from '../pipeline/CustomerValidationHandler';
import { PaymentMethodValidationHandler } from '../pipeline/PaymentMethodValidationHandler';
import { PaymentIntentCreationHandler } from '../pipeline/PaymentIntentCreationHandler';
import { PaymentPipeline } from 'src/pipeline/paymentPipeline';


export const pay = async (req: Request, res: Response): Promise<Response> => {
  const pipeline = new PaymentPipeline();
  pipeline.addHandler(new CustomerValidationHandler());
  pipeline.addHandler(new PaymentMethodValidationHandler());
  pipeline.addHandler(new PaymentIntentCreationHandler());

  await pipeline.execute(req, res);

  return res;
};
