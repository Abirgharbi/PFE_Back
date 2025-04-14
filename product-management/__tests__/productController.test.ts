import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { describe, beforeAll, it, afterAll, expect } from '@jest/globals';
import mongoose from 'mongoose';
import http from 'http';
const api = "https://arkea-production.up.railway.app";
const productPayload = {
    "_id": "123456789012345678901234",
    "name": "sofa",
    "description": "this is an amazing sofa",
    "price": 430,
    "compare_at_price": 500,
    "productCost": 300,
    "category": "sofa",
    "quantity": 100,
    "discount": 20,
    "thumbnail": "https://res.cloudinary.com/dbkivxzek/image/upload/v1684947272/ARkea/uaufrfhpicgpmrruefwr.png",
    "colors": ["blue", "orange", "yellow"],
    "model": "https://res.cloudinary.com/dbkivxzek/image/upload/v1684947275/ARkea/qhnesinwmkddnxqi4dle.glb",
    "ratingsAverage": 4,
    "ratingsCount": 10
}

describe('Product', () => {

    let server: http.Server;
    beforeAll(async () => {
        server = http.createServer().listen(8001);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        server.close();
    });

    let createdProductId = '123456789012345678901234';

    it('should add a product to the store', async () => {
        const response = await request(api)
            .post(`/product/add`)
            .send(productPayload);

        expect(response.status).toBe(StatusCodes.OK);
        createdProductId = response.body._id;
    });

    it('should update an entity using /update/:id', async () => {
        const response = await request(api)
            .put(`/product/update/${createdProductId}`)
            .send({
                name: 'new desk',
                price: 600,
            });

        expect(response.status).toBe(StatusCodes.OK);
        // expect(response.body).toHaveProperty('name', 'new desk');
        // expect(response.body).toHaveProperty('price', 600);
    });

    it('should update the rating of a product', async () => {
        const response = await request(api)
            .put(`/product/update-rating/${createdProductId}`)
            .send({ "rating": 4 });

        expect(response.status).toBe(StatusCodes.OK);
    });

    it('should update the status of a product', async () => {
        const response = await request(api)
            .put(`/product/update-status/${createdProductId}`)

        expect(response.status).toBe(StatusCodes.OK);
    });

    it('should delete a product', async () => {
        const response = await request(api).delete(`/product/delete/${createdProductId}`);

        expect(response.status).toBe(StatusCodes.OK);
    });

    it('should filter products by rating and price', async () => {
        const response = await request(api)
            .get('/product/filter')
            .query({
                rating: 4,
                price: 100,
            });

        expect(response.status).toBe(StatusCodes.OK);
    });

    it('should get all products', async () => {
        const response = await request(api).get('/product/get');

        expect(response.status).toBe(StatusCodes.OK);
    });

    it('should get recent products', async () => {
        const response = await request(api).get('/product/recent');

        expect(response.status).toBe(StatusCodes.OK);
    });

    it('should get popular products', async () => {
        const response = await request(api).get('/product/popular');

        expect(response.status).toBe(StatusCodes.OK);
    });

    it('should get the total money earned', async () => {
        const response = await request(api).get('/product/total-money-earned');

        expect(response.status).toBe(StatusCodes.OK);
    });

    it('should get the total revenue', async () => {
        const response = await request(api).get('/product/total-revenue');

        expect(response.status).toBe(StatusCodes.OK);
    });
});
