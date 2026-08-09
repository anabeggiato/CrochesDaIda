const express = require('express');
const router = express.Router();
const { Events } = require('../models');
const productController = require('../controllers/products');

router.get('/', productController.list);

//rota GET produto por id
router.get('/produto/:id', productController.getById);

// POST /eventos (sem imagem)
router.post('/eventos', async (req, res) => {
  try {
    if (!Events) {
      return res
        .status(501)
        .json({ error: 'Funcionalidade de eventos indisponivel' });
    }

    const event = req.body;
    const newEvent = await Events.create(event);
    res.json(newEvent);
  } catch (err) {
    console.error('Erro ao criar evento:', err);
    res.status(500).json({ error: 'Erro ao criar evento' });
  }
});

module.exports = router;
