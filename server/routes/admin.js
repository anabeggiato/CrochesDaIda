const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // buffer de imagem
const { Products, Events } = require('../models');
const supabase = require('../utils/supabase');
const { v4: uuidv4 } = require('uuid');

const verifyToken = require('../middleware/verifyToken'); // importa o middleware

// Rota protegida: POST /produtos
router.post('/produtos', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const productData = req.body;
        let imageUrl = null;

        if (req.file) {
            const fileExt = req.file.originalname.split('.').pop();
            const fileName = `${uuidv4()}.${fileExt}`;

            const { data, error } = await supabase.storage
                .from('products')
                .upload(fileName, req.file.buffer, {
                    contentType: req.file.mimetype,
                });

            if (error) {
                console.error('Erro no upload do Supabase:', error);
                return res.status(500).json({ error: 'Erro ao enviar imagem' });
            }

            const { data: publicUrl } = supabase
                .storage
                .from('products')
                .getPublicUrl(fileName);

            imageUrl = publicUrl.publicUrl;
        }

        const newProduct = await Products.create({
            ...productData,
            image_url: imageUrl,
        });

        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Erro ao criar produto:', err);
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
});

// Rota protegida: POST /eventos
router.post('/eventos', verifyToken, async (req, res) => {
    try {
        const event = req.body;
        const newEvent = await Events.create(event);
        res.status(201).json(newEvent);
    } catch (err) {
        console.error('Erro ao criar evento:', err);
        res.status(500).json({ error: 'Erro ao criar evento' });
    }
});

module.exports = router;
