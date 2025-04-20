import { EmailStrategy } from './EmailStrategy';
import { sendConfimationEmail, deleveredOrder } from '../utils/sendConfirmationEmail';

class ConfirmedEmailStrategy implements EmailStrategy {
    send(order: any, email: string): void {
        sendConfimationEmail(order, email);
    }
}

class ShippedEmailStrategy implements EmailStrategy {
    send(order: any, email: string): void {
        deleveredOrder(email);
    }
}

export class EmailStrategyFactory {
    static getStrategy(status: string): EmailStrategy | null {
        switch (status) {
            case 'confirmed': return new ConfirmedEmailStrategy();
            case 'shipped': return new ShippedEmailStrategy();
            default: return null;
        }
    }
}
