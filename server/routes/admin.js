const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { Products, Events } = require('../models');
const supabase = require('../utils/supabase');
const { v4: uuidv4 } = require('uuid');

const verifyToken = require('../middleware/verifyToken');

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

// Rota UPDATE /produtos/update
router.put('/produto/update/:id', verifyToken, upload.single('image'), async (req, res) => {
    const id = req.params.id;

    try {
        const updatedData = req.body;

        const product = await Products.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        // Se houver imagem nova, faz upload e atualiza image_url
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

            updatedData.image_url = publicUrl.publicUrl;
        }

        await product.update(updatedData);
        res.json(product);
    } catch (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
});

// Rota DELETE /produto/delete/:id
router.delete('/produto/delete/:id', async(req, res) => {
    const id = req.params.id;

    const product = await Products.findByPk(id);

    await product.destroy();
    res.json({message: `Produto ${id} deletado com sucesso!`})
})

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
