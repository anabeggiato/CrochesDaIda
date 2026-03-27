const {
  AUTH_INVALID_PASSWORD,
  AUTH_MISSING_CREDENTIALS,
  AUTH_USER_NOT_FOUND,
  AUTH_USERNAME_IN_USE,
  loginUser,
  registerUser,
} = require('../services/auth');
const {
  AUTH_VALIDATION_ERROR,
  validateAuthPayload,
} = require('../validators/auth');

async function register(req, res) {
  try {
    const { username } = await registerUser(validateAuthPayload(req.body));

    return res.status(201).json({
      message: 'Successfully registered user!',
      username,
    });
  } catch (error) {
    if (error.message === AUTH_MISSING_CREDENTIALS) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' });
    }

    if (error.message === AUTH_USERNAME_IN_USE) {
      return res
        .status(400)
        .json({ message: 'This username is already in use' });
    }

    if (error.message === AUTH_VALIDATION_ERROR) {
      return res.status(400).json({ message: error.details });
    }

    console.error('Erro ao registrar usuário', error);
    return res
      .status(500)
      .json({ message: 'Erro ao registrar usuário', error: error.message });
  }
}

async function login(req, res) {
  try {
    const { token, username } = await loginUser(validateAuthPayload(req.body));

    return res.status(200).json({
      message: 'Login bem sucedido!',
      token,
      username,
    });
  } catch (error) {
    if (error.message === AUTH_MISSING_CREDENTIALS) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' });
    }

    if (error.message === AUTH_USER_NOT_FOUND) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (error.message === AUTH_INVALID_PASSWORD) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    if (error.message === AUTH_VALIDATION_ERROR) {
      return res.status(400).json({ message: error.details });
    }

    console.error('Erro no login:', error);
    return res
      .status(500)
      .json({ message: 'Erro no login', error: error.message });
  }
}

module.exports = {
  login,
  register,
};
