const { v4: uuidv4 } = require('uuid');
const supabase = require('../utils/supabase');
const { Products } = require('../models');

const PRODUCT_IMAGE_UPLOAD_FAILED = 'PRODUCT_IMAGE_UPLOAD_FAILED';
const PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND';

async function uploadProductImage(file) {
  if (!file) {
    return null;
  }

  const fileExt = file.originalname.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;

  const { error } = await supabase.storage
    .from('products')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) {
    throw new Error(PRODUCT_IMAGE_UPLOAD_FAILED);
  }

  const { data: publicUrl } = supabase.storage
    .from('products')
    .getPublicUrl(fileName);

  return publicUrl.publicUrl;
}

async function buildProductPayload(productData, file) {
  const imageUrl = await uploadProductImage(file);

  if (!imageUrl) {
    return { ...productData };
  }

  return {
    ...productData,
    image_url: imageUrl,
  };
}

async function createProduct(productData, file) {
  const payload = await buildProductPayload(productData, file);
  return Products.create(payload);
}

async function listProducts() {
  return Products.findAll();
}

async function getProductById(productId) {
  const product = await Products.findByPk(productId);

  if (!product) {
    throw new Error(PRODUCT_NOT_FOUND);
  }

  return product;
}

async function updateProduct(productId, productData, file) {
  const product = await Products.findByPk(productId);

  if (!product) {
    throw new Error(PRODUCT_NOT_FOUND);
  }

  const payload = { ...productData };

  if (file) {
    payload.image_url = await uploadProductImage(file);
  }

  await product.update(payload);

  return product;
}

async function deleteProduct(productId) {
  const product = await Products.findByPk(productId);

  if (!product) {
    throw new Error(PRODUCT_NOT_FOUND);
  }

  await product.destroy();
}

module.exports = {
  buildProductPayload,
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  PRODUCT_IMAGE_UPLOAD_FAILED,
  PRODUCT_NOT_FOUND,
  updateProduct,
  uploadProductImage,
};
