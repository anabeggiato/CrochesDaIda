const AUTH_VALIDATION_ERROR = 'AUTH_VALIDATION_ERROR';

function createValidationError(message) {
  const error = new Error(AUTH_VALIDATION_ERROR);
  error.details = message;
  return error;
}

function validateAuthPayload(payload) {
  const username = payload?.username?.trim();
  const password = payload?.password;

  if (!username || !password) {
    throw createValidationError('Username and password are required');
  }

  if (username.length < 3) {
    throw createValidationError('Username must have at least 3 characters');
  }

  if (String(password).length < 6) {
    throw createValidationError('Password must have at least 6 characters');
  }

  return {
    username,
    password: String(password),
  };
}

module.exports = {
  AUTH_VALIDATION_ERROR,
  validateAuthPayload,
};
