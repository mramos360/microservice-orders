const path = require('path');
const { Pact } = require('@pact-foundation/pact');

const productProvider = () => {
    return new Pact({
        consumer: "Order",
        provider: "Product",
        port: 9001,
        log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
        dir: path.resolve(process.cwd(), "pacts"),
        logLevel: "ERROR",
        pactfileWriteMode: "update",
        spec: 2,
    })
}

module.exports = {
    productProvider
}