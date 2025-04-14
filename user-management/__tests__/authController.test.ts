import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { describe, it, expect } from '@jest/globals';

const api = "https://arkea-production.up.railway.app";

describe('auth', () => {

    it('POST /user/login should allow a customer to log in', async () => {
        return request(api)
            .post('/user/login')
            .send({
                "name": "ilyes",
                "email": "ilyeshajdahman81@gmail.com"
            })
            .expect('Content-Type', /json/)
    });


    it('POST /user/login should fail if the customer doesn\'n enter the email', async () => {
        return request(api)
            .post('/user/login')
            .expect('Content-Type', /json/)
            .expect(StatusCodes.CONFLICT)
            .then(res => {
                expect(res.body).toMatchObject({
                    message: ("Please create an account." || "Missing required fields. Please enter your email"),
                });
            });
    });


    it('GET /user/verifyMagicLink should fail the verification of fake token', async () => {
        return request(api)
            .get('/user/admin/verifyMagicLink?token=randomFakeToken')
            .expect(StatusCodes.INTERNAL_SERVER_ERROR)
    });
});