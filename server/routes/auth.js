const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models'); // <-- CORRETO

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    try {
        const existingUser = await Users.findOne({ where: { username } }); // <-- ajuste aqui
        if (existingUser) {
            return res.status(400).json({ message: "This username is already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await Users.create({ username, password: hashedPassword }); // <-- ajuste aqui

        res.status(201).json({ message: "Successfully registered user!", username });
    } catch (error) {
        console.error("Erro ao registrar usuário", error);
        res.status(500).json({ message: "Erro ao registrar usuário", error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const user = await Users.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" }); // <-- status corrigido
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: 'Login bem sucedido!',
            token,
            username: user.username
        });
    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ message: "Erro no login", error: error.message });
    }
});

module.exports = router;
