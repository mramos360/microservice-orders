const express = require('express');
const router = express.Router();
const db = require('../models');

router.get("/", (req, res) => {
    db.orders.findAll()
        .then(results => {
            const response = {
                count: results.length,
                orders: results.map(result => {
                    return {
                        id: result.id,
                        orderNo: result.orderNo,
                        quantity: result.quantity,
                        createdAt: result.createdAt,
                        updatedAt: result.updatedAt
                    }
                })
            }
            res.status(200).json(response);
        })
})

router.get("/:id", (req, res) => {
    db.orders.findAll({
        where: {
            id: req.params.id
        }
    }).then(results => {
        res.status(200).json(results[0]);
    })
})

router.post("/", (req, res) => {
    db.orders.create({
        orderNo: req.body.orderNo,
        quantity: req.body.quantity
    }).then(result => {
        res.status(201).json({
            message: "Order created",
            createdOrder: {
                orderNo: result.orderNo,
                quantity: result.quantity
            }
        })
    })
})

router.patch("/:id", (req, res) => {
    db.orders.update({
        name: req.body.name
    },{
        where: {
            id: req.params.id
        }
    }).then(result => {        
        if (result == 1) {
            res.status(200).json({
                message: "Order updated",
                product: {
                    id: req.params.id,
                    quantity: req.body.quantity
                }
            })
        } else {
            res.status(404).json({
                message: "Order not found"
            })
        }
    }).catch(err => {
        res.status(404).json({
            error: err
        })
    })
})

module.exports = router;