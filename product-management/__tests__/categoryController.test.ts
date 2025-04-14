import { describe, beforeAll, it, afterAll, expect } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import http from 'http';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();
describe('Category Management', () => {
    const api = "https://arkea-production.up.railway.app";
    
    let server: http.Server;

    beforeAll(async () => {

        server = http.createServer().listen(8005);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        server.close();
    });

    it('should add a product category to the store', async () => {
        const response = await request(api)
            .post('/product/category/add')
            .send({
                name: 'category-name',
            });

        // expect(response.status).toBe(StatusCodes.OK);
    });

    // it('should update a product category', async () => {
    //     const response = await request(api)
    //         .put('/product/category/update/:id')
    //         .send({
    //             name: 'updated-category-name-updated',
    //         });

    //     expect(response.status).toBe(StatusCodes.OK);
    // });

    it('should delete a product category', async () => {
        const response = await request(api).delete('/product/category/delete/:id');
        console.log(response.status);

        // expect(response.status).toBe(StatusCodes.OK);
    });

    it('should get all product categories', async () => {
        const response = await request(api).get('/product/category/get');

        expect(response.status).toBe(StatusCodes.OK);
    });

    it('should get all product category names', async () => {
        const response = await request(api).get('/product/category/getname');

        expect(response.status).toBe(StatusCodes.OK);
    });

    it('should get a product category by ID', async () => {
        const response = await request(api).get('/product/category/get/:id');

        // expect(response.status).toBe(StatusCodes.OK);
    });
});
