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

const strategyMap: Record<string, EmailStrategy> = {
    confirmed: new ConfirmedEmailStrategy(),
    shipped: new ShippedEmailStrategy(),
};

export class EmailStrategyFactory {
    static getStrategy(status: string): EmailStrategy | null {
        return strategyMap[status] || null;
    }
}
