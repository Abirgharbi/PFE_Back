import { IEmailService } from '../interfaces/IEmailService';
import { sendConfimationEmail, deleveredOrder } from '../utils/sendConfirmationEmail';

export class EmailService implements IEmailService {
  sendConfirmationEmail(order: any, email: string): void {
    sendConfimationEmail(order, email);
  }

  sendDeliveredEmail(email: string): void {
    deleveredOrder(email);
  }
}
