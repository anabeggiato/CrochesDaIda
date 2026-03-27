const PRODUCT_VALIDATION_ERROR = 'PRODUCT_VALIDATION_ERROR';

function createValidationError(message) {
  const error = new Error(PRODUCT_VALIDATION_ERROR);
  error.details = message;
  return error;
}

function normalizeOptionalNumber(value) {
  if (value === '' || value === null || value === undefined) {
    return null;
  }

  const normalizedValue = Number(value);

  if (Number.isNaN(normalizedValue)) {
    return NaN;
  }

  return normalizedValue;
}

function validateProductPayload(payload) {
  const name = payload?.name?.trim();
  const value = Number(payload?.value);
  const height = normalizeOptionalNumber(payload?.height);
  const width = normalizeOptionalNumber(payload?.width);
  const weight = normalizeOptionalNumber(payload?.weight);
  const description = payload?.description?.trim() || null;
  const category = payload?.category || null;

  if (!name) {
    throw createValidationError('O nome do produto é obrigatório');
  }

  if (Number.isNaN(value) || value <= 0) {
    throw createValidationError('O valor do produto deve ser maior que zero');
  }

  if (height !== null && (Number.isNaN(height) || height < 0)) {
    throw createValidationError(
      'A altura do produto deve ser um número válido'
    );
  }

  if (width !== null && (Number.isNaN(width) || width < 0)) {
    throw createValidationError(
      'A largura do produto deve ser um número válido'
    );
  }

  if (weight !== null && (Number.isNaN(weight) || weight < 0)) {
    throw createValidationError('O peso do produto deve ser um número válido');
  }

  if (category && !['amigurumi', 'others'].includes(category)) {
    throw createValidationError('A categoria do produto é inválida');
  }

  return {
    name,
    value,
    height,
    width,
    weight,
    description,
    category,
  };
}

module.exports = {
  PRODUCT_VALIDATION_ERROR,
  validateProductPayload,
};
