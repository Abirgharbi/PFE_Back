import { describe, beforeAll, it, afterAll, expect } from '@jest/globals';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';

dotenv.config();

describe('Promo Controller', () => {
  const api = "https://arkea-production.up.railway.app";

  it('should add a promo and return it', async () => {
    const response = await request(api)
      .post('/order/promo/add')
      .send({
        "code": "PROMO10",
        "discount": 10,
        "expire_date": "2023-12-31",
        "start_date": "2023-01-01",
      });

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.code).toBe('PROMO10');
    expect(response.body.discount).toBe(10);
  });

  it('should get a list of promos', async () => {
    const response = await request(api).get('/order/promo/get');

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.count).toBeDefined();
    expect(response.body.promos).toBeDefined();
  });

  it('should not delete the promo because i pass a wrong id', async () => {
    const response = await request(api).delete('/order/promo/delete/somePromoId');

    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
