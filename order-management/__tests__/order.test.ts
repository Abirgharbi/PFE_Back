import { describe, beforeAll, it, afterAll, expect } from '@jest/globals';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';

dotenv.config();

describe('Order Controller', () => {
    const api = "https://arkea-production.up.railway.app";

    describe('addOrder', () => {
        it('should add an order and return it', async () => {
            const response = await request(api)
                .post('/order/add')
                .send({
                    amount: 10,
                    productCard: [],
                    addressId: 'addressId',
                    revenue: 100,
                    customerId: 'customerId',
                });

            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body.amount).toBe(10);
            expect(response.body.revenue).toBe(100);
        });

        it('should handle errors and call the error handler', async () => {
            const response = await request(api)
                .post('/order/add')
                .send({});

            expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        });
    });

    describe('getOrders', () => {
        it('should get a list that contain only the few first orders (pagination)', async () => {
            const response = await request(api).get('/order/get?page=0');

            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.count).toBeDefined();
            expect(response.body.orders).toBeDefined();
        });

        it('should get the same result', async () => {
            const response = await request(api).get('/order/get');

            expect(response.status).toBe(StatusCodes.OK);
        });
    });

    // Add more tests for other functions if needed
});
