const {
  WHATSAPP_DRAFT_NOT_FOUND,
  cancelDraft,
  completeDraft,
  findActiveDraftByPhone,
  getOrCreateActiveDraft,
  updateDraft,
} = require('../services/whatsappDrafts');
const {
  WHATSAPP_DRAFT_VALIDATION_ERROR,
  validateDraftUpdatePayload,
  validatePhonePayload,
} = require('../validators/whatsappDrafts');

async function getActiveByPhone(req, res) {
  try {
    const { phone } = validatePhonePayload(req.params);
    const draft = await findActiveDraftByPhone(phone);

    if (!draft) {
      return res.status(404).json({ error: 'Rascunho nao encontrado' });
    }

    return res.json(draft);
  } catch (error) {
    if (error.message === WHATSAPP_DRAFT_VALIDATION_ERROR) {
      return res.status(400).json({ error: error.details });
    }

    console.error('Erro ao buscar rascunho do WhatsApp:', error);
    return res.status(500).json({ error: 'Erro ao buscar rascunho' });
  }
}

async function start(req, res) {
  try {
    const { phone } = validatePhonePayload(req.body);
    const draft = await getOrCreateActiveDraft(phone);

    return res.status(201).json(draft);
  } catch (error) {
    if (error.message === WHATSAPP_DRAFT_VALIDATION_ERROR) {
      return res.status(400).json({ error: error.details });
    }

    console.error('Erro ao iniciar rascunho do WhatsApp:', error);
    return res.status(500).json({ error: 'Erro ao iniciar rascunho' });
  }
}

async function update(req, res) {
  try {
    const updates = validateDraftUpdatePayload(req.body);
    const draft = await updateDraft(req.params.id, updates);

    return res.json(draft);
  } catch (error) {
    if (error.message === WHATSAPP_DRAFT_VALIDATION_ERROR) {
      return res.status(400).json({ error: error.details });
    }

    if (error.message === WHATSAPP_DRAFT_NOT_FOUND) {
      return res.status(404).json({ error: 'Rascunho nao encontrado' });
    }

    console.error('Erro ao atualizar rascunho do WhatsApp:', error);
    return res.status(500).json({ error: 'Erro ao atualizar rascunho' });
  }
}

async function cancel(req, res) {
  try {
    const draft = await cancelDraft(req.params.id);
    return res.json(draft);
  } catch (error) {
    if (error.message === WHATSAPP_DRAFT_NOT_FOUND) {
      return res.status(404).json({ error: 'Rascunho nao encontrado' });
    }

    console.error('Erro ao cancelar rascunho do WhatsApp:', error);
    return res.status(500).json({ error: 'Erro ao cancelar rascunho' });
  }
}

async function complete(req, res) {
  try {
    const draft = await completeDraft(req.params.id);
    return res.json(draft);
  } catch (error) {
    if (error.message === WHATSAPP_DRAFT_NOT_FOUND) {
      return res.status(404).json({ error: 'Rascunho nao encontrado' });
    }

    console.error('Erro ao concluir rascunho do WhatsApp:', error);
    return res.status(500).json({ error: 'Erro ao concluir rascunho' });
  }
}

module.exports = {
  cancel,
  complete,
  getActiveByPhone,
  start,
  update,
};
