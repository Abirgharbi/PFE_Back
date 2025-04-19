export interface IEmailService {
  sendConfirmationEmail(order: any, email: string): void;
  sendDeliveredEmail(email: string): void;
}
