const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { Events } = require('../models');
const productController = require('../controllers/products');

const verifyToken = require('../middleware/verifyToken');

// Rota protegida: POST /produtos
router.post('/produtos', verifyToken, upload.single('image'), productController.create);

// Rota UPDATE /produtos/update
router.put('/produto/update/:id', verifyToken, upload.single('image'), productController.update);

// Rota DELETE /produto/delete/:id
router.delete('/produto/delete/:id', verifyToken, productController.remove)

// Rota protegida: POST /eventos
router.post('/eventos', verifyToken, async (req, res) => {
    try {
        if (!Events) {
            return res.status(501).json({ error: 'Funcionalidade de eventos indisponivel' });
        }

        const event = req.body;
        const newEvent = await Events.create(event);
        res.status(201).json(newEvent);
    } catch (err) {
        console.error('Erro ao criar evento:', err);
        res.status(500).json({ error: 'Erro ao criar evento' });
    }
});

module.exports = router;
