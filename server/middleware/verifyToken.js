// middleware/verifyToken.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; // Ex: Bearer <token>
    if (!token) return res.status(401).json({ message: "Token não fornecido" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // salva dados do usuário no req
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token inválido ou expirado" });
    }
}

module.exports = verifyToken;
