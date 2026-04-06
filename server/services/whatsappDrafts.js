const { Op } = require('sequelize');
const { WhatsappDrafts } = require('../models');

const WHATSAPP_DRAFT_NOT_FOUND = 'WHATSAPP_DRAFT_NOT_FOUND';
const WHATSAPP_DRAFT_STATUS_ACTIVE = 'active';
const WHATSAPP_DRAFT_STATUS_CANCELLED = 'cancelled';
const WHATSAPP_DRAFT_STATUS_COMPLETED = 'completed';
const WHATSAPP_DRAFT_DEFAULT_STEP = 'waiting_image';
const WHATSAPP_DRAFT_TTL_IN_HOURS = 2;

function buildExpirationDate() {
  const expirationDate = new Date();
  expirationDate.setHours(
    expirationDate.getHours() + WHATSAPP_DRAFT_TTL_IN_HOURS
  );
  return expirationDate;
}

async function findActiveDraftByPhone(phone) {
  return WhatsappDrafts.findOne({
    where: {
      phone,
      status: WHATSAPP_DRAFT_STATUS_ACTIVE,
      expires_at: {
        [Op.gt]: new Date(),
      },
    },
    order: [['updatedAt', 'DESC']],
  });
}

async function createDraft(phone) {
  return WhatsappDrafts.create({
    phone,
    step: WHATSAPP_DRAFT_DEFAULT_STEP,
    draft_json: {},
    status: WHATSAPP_DRAFT_STATUS_ACTIVE,
    expires_at: buildExpirationDate(),
  });
}

async function getOrCreateActiveDraft(phone) {
  const existingDraft = await findActiveDraftByPhone(phone);

  if (existingDraft) {
    return existingDraft;
  }

  return createDraft(phone);
}

async function updateDraft(draftId, updates = {}) {
  const draft = await WhatsappDrafts.findByPk(draftId);

  if (!draft) {
    throw new Error(WHATSAPP_DRAFT_NOT_FOUND);
  }

  const payload = {
    expires_at: buildExpirationDate(),
  };

  if (updates.step) {
    payload.step = updates.step;
  }

  if (updates.draft_json) {
    payload.draft_json = updates.draft_json;
  }

  if (Object.prototype.hasOwnProperty.call(updates, 'media_id')) {
    payload.media_id = updates.media_id;
  }

  if (Object.prototype.hasOwnProperty.call(updates, 'media_mime_type')) {
    payload.media_mime_type = updates.media_mime_type;
  }

  if (updates.status) {
    payload.status = updates.status;
  }

  await draft.update(payload);

  return draft;
}

async function cancelDraft(draftId) {
  return updateDraft(draftId, {
    status: WHATSAPP_DRAFT_STATUS_CANCELLED,
  });
}

async function completeDraft(draftId) {
  return updateDraft(draftId, {
    status: WHATSAPP_DRAFT_STATUS_COMPLETED,
  });
}

module.exports = {
  WHATSAPP_DRAFT_DEFAULT_STEP,
  WHATSAPP_DRAFT_NOT_FOUND,
  WHATSAPP_DRAFT_STATUS_ACTIVE,
  WHATSAPP_DRAFT_STATUS_CANCELLED,
  WHATSAPP_DRAFT_STATUS_COMPLETED,
  buildExpirationDate,
  cancelDraft,
  completeDraft,
  createDraft,
  findActiveDraftByPhone,
  getOrCreateActiveDraft,
  updateDraft,
};
