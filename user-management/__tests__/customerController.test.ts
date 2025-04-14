import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { describe, it, expect } from '@jest/globals';

const api = "https://arkea-production.up.railway.app";

describe('Customer API', () => {
    // Test getAllCustomers function
    it('GET /user/customer/get should return all customers', async () => {
        const response = await request(api).get('/user/customer/get');
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toHaveProperty('count');
        expect(response.body).toHaveProperty('customers');
    });

    // Test updateProfile function
    it('PUT /user/customer/update/:id should update customer profile', async () => {
        const customerId = 'dummyCustomerId';
        const response = await request(api)
            .put(`/user/customer/update/${customerId}`)
            .send({
                email: 'newemail@example.com',
                name: 'New Name',
                image: 'newimage.jpg',
                phone: '1234567890'
            });
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toHaveProperty('message', 'Profile updated successfully');
    });

    // Test deleteCustomer function
    it('DELETE /user/customer/delete/:id should not delete the customer because the id is wrong', async () => {
        const customerId = 'dummyCustomerId';
        const response = await request(api).delete(`/user/customer/delete/${customerId}`);
        expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });

    // Test getVerifiedCustomers function
    it('GET /user/customer/getVerifiedCustomers should return verified and unverified customer counts', async () => {
        const response = await request(api).get('/user/customer/getVerifiedCustomers');
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toHaveProperty('verifiedCustomers');
        expect(response.body).toHaveProperty('unVerifiedCustomers');
    });

    // Test AddAddress function
    it('POST /user/customer/address should add a new address for a customer', async () => {
        const customerEmail = 'test@example.com';
        const response = await request(api)
            .post('/user/customer/address')
            .send({
                city: 'New York',
                country: 'USA',
                state: 'New York',
                zipCode: '12345',
                line1: '123 Main St',
                line2: 'Apt 4B',
                customerEmail
            });
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('city', 'New York');
        expect(response.body).toHaveProperty('customerEmail', customerEmail);
    });

    // Test getCustomerByAddress function
    it('GET /user/customer/address/:email should return addresses for a customer', async () => {
        const customerEmail = 'test@example.com';
        const response = await request(api).get(`/user/customer/address/${customerEmail}`);
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toHaveProperty('address');
    });

    // Test updateSpending function
    it('PUT /user/customer/spending/:id should update customer spending', async () => {
        const customerId = 'dummyCustomerId';
        const response = await request(api)
            .put(`/user/customer/spending/${customerId}`)
            .send({ spend: 100 });
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toHaveProperty('message', 'spend updated successfully');
    });
});
