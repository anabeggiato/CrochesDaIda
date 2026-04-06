function verifyInternalToken(req, res, next) {
  const token = req.headers['x-internal-token'];

  if (!token) {
    return res.status(401).json({ error: 'Token interno não fornecido' });
  }

  if (token !== process.env.INTERNAL_API_TOKEN) {
    return res.status(403).json({ error: 'Token interno inválido' });
  }

  next();
}

module.exports = verifyInternalToken;
