const { Matchers } = require('@pact-foundation/pact');
const { like, eachLike } = Matchers;

const PRODUCT = {
    id: like(1),
    orderNo: like("10001"),
    quantity: like(1)
}

const PRODUCT_LIST = eachLike(PRODUCT, { min: 1 } );

const getProducts = () => {
    return {
        state: "Has some products",
        uponReceiving: "a request for all products",
        withRequest: {
            method: "GET",
            path: "/products",
            headers: { Authorization: "Bearer token" },
        },
        willRespondWith: {
            status: 200,
            headers: {
            "Content-Type": "application/json; charset=utf-8",
            },
            body: PRODUCT,
        }
    }
} 

module.exports = {
    getProducts
}
