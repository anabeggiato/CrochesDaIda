const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Admin } = require('../models');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST /register - cria um novo admin
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await Admin.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      username,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Admin criado com sucesso', admin: newAdmin.username });
  } catch (err) {
    console.error('Erro ao cadastrar admin:', err);
    res.status(500).json({ error: 'Erro ao cadastrar admin' });
  }
});

module.exports = router;
