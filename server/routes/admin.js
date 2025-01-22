const express = require('express')
const router = express.Router()

const { Products } = require('../models')
const { Events } = require('../models')

router.post('/produtos', async(req, res) => {
    const product = req.body
    await Products.create(product);
    res.json(product);
});

router.post('/eventos', async(req, res) => {
    const event = req.body
    await Events.create(event);
    res.json(event);
});

module.exports = router