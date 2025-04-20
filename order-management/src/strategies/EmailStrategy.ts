export interface EmailStrategy {
    send(order: any, email: string): void;
}
