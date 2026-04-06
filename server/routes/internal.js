const express = require('express');
const multer = require('multer');

const productController = require('../controllers/products');
const whatsappDraftController = require('../controllers/whatsappDrafts');
const verifyInternalToken = require('../middleware/verifyInternalToken');

const router = express.Router();
const upload = multer();

router.post(
  '/whatsapp/products',
  verifyInternalToken,
  upload.single('image'),
  productController.create
);

router.get(
  '/whatsapp/drafts/:phone',
  verifyInternalToken,
  whatsappDraftController.getActiveByPhone
);

router.post(
  '/whatsapp/drafts',
  verifyInternalToken,
  whatsappDraftController.start
);

router.patch(
  '/whatsapp/drafts/:id',
  verifyInternalToken,
  whatsappDraftController.update
);

router.post(
  '/whatsapp/drafts/:id/cancel',
  verifyInternalToken,
  whatsappDraftController.cancel
);

router.post(
  '/whatsapp/drafts/:id/complete',
  verifyInternalToken,
  whatsappDraftController.complete
);

module.exports = router;
