import { EmailStrategyFactory } from '../strategies/EmailStrategyFactory';

export class EmailService {
    static async sendShippingStatusEmail(status: string, order: any, email: string) {
        const strategy = EmailStrategyFactory.getStrategy(status);
        if (strategy && email) {
            strategy.send(order, email);
        }
    }
}
