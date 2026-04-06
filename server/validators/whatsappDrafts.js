const WHATSAPP_DRAFT_VALIDATION_ERROR = 'WHATSAPP_DRAFT_VALIDATION_ERROR';

function createValidationError(message) {
  const error = new Error(WHATSAPP_DRAFT_VALIDATION_ERROR);
  error.details = message;
  return error;
}

function validatePhonePayload(payload) {
  const phone = payload?.phone?.trim();

  if (!phone) {
    throw createValidationError('O telefone e obrigatorio');
  }

  return { phone };
}

function validateDraftUpdatePayload(payload) {
  const updates = {};

  if (payload?.step !== undefined) {
    const step = String(payload.step).trim();

    if (!step) {
      throw createValidationError('O step informado e invalido');
    }

    updates.step = step;
  }

  if (payload?.draft_json !== undefined) {
    const isObject =
      payload.draft_json !== null &&
      typeof payload.draft_json === 'object' &&
      !Array.isArray(payload.draft_json);

    if (!isObject) {
      throw createValidationError('draft_json deve ser um objeto valido');
    }

    updates.draft_json = payload.draft_json;
  }

  if (payload?.media_id !== undefined) {
    updates.media_id =
      payload.media_id === null ? null : String(payload.media_id).trim();
  }

  if (payload?.media_mime_type !== undefined) {
    updates.media_mime_type =
      payload.media_mime_type === null
        ? null
        : String(payload.media_mime_type).trim();
  }

  if (Object.keys(updates).length === 0) {
    throw createValidationError('Nenhum campo valido foi enviado para update');
  }

  return updates;
}

module.exports = {
  WHATSAPP_DRAFT_VALIDATION_ERROR,
  validateDraftUpdatePayload,
  validatePhonePayload,
};
