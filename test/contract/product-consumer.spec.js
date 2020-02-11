const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const provider = require('./helpers/provider').productProvider();
const interactions = require('./helpers/interactions');
//const supertest = require('supertest');
//const request = supertest("http://localhost:9001");
const axios = require('axios');

describe('Product Pact', () => {

    const request = axios.create({
        baseURL: "http://localhost:9001"
    })

    describe('GET /orders', () => {

        before(async () => {
            await provider.setup();
        })
    
        after(async () => {
            await provider.finalize();
        })

        beforeEach(async () => {
            await sinon.stub(request, 'get').callsFake(() => Promise.resolve({
                id: 1,
                orderNo: "10001",
                quantity: 1
            }))
        })

        afterEach(async () => {
            await request.get.restore();
        })

        it('should return all products', async () => {
            await provider.addInteraction(interactions.getProducts());
            const response = await request.get('/products');
            expect(response).to.have.property('id');
            await provider.verify();
        })
    })
})