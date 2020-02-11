const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoutes = require('./routes/order-routes');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/orders", orderRoutes);

module.exports = app;