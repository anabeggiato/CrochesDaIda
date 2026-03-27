const {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  PRODUCT_IMAGE_UPLOAD_FAILED,
  PRODUCT_NOT_FOUND,
  updateProduct,
} = require('../services/products');
const {
  PRODUCT_VALIDATION_ERROR,
  validateProductPayload,
} = require('../validators/products');

async function list(req, res) {
  try {
    const products = await listProducts();
    return res.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
}

async function getById(req, res) {
  try {
    const product = await getProductById(req.params.id);
    return res.json(product);
  } catch (error) {
    if (error.message === PRODUCT_NOT_FOUND) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    console.error('Erro ao buscar produto:', error);
    return res.status(500).json({ error: 'Erro ao buscar produto' });
  }
}

async function create(req, res) {
  try {
    const newProduct = await createProduct(
      validateProductPayload(req.body),
      req.file
    );
    return res.status(201).json(newProduct);
  } catch (error) {
    if (error.message === PRODUCT_VALIDATION_ERROR) {
      return res.status(400).json({ error: error.details });
    }

    if (error.message === PRODUCT_IMAGE_UPLOAD_FAILED) {
      console.error('Erro no upload do Supabase:', error);
      return res.status(500).json({ error: 'Erro ao enviar imagem' });
    }

    console.error('Erro ao criar produto:', error);
    return res.status(500).json({ error: 'Erro ao criar produto' });
  }
}

async function update(req, res) {
  try {
    const product = await updateProduct(
      req.params.id,
      validateProductPayload(req.body),
      req.file
    );
    return res.json(product);
  } catch (error) {
    if (error.message === PRODUCT_NOT_FOUND) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    if (error.message === PRODUCT_VALIDATION_ERROR) {
      return res.status(400).json({ error: error.details });
    }

    if (error.message === PRODUCT_IMAGE_UPLOAD_FAILED) {
      console.error('Erro no upload do Supabase:', error);
      return res.status(500).json({ error: 'Erro ao enviar imagem' });
    }

    console.error('Erro ao atualizar produto:', error);
    return res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
}

async function remove(req, res) {
  try {
    await deleteProduct(req.params.id);
    return res.json({
      message: `Produto ${req.params.id} deletado com sucesso!`,
    });
  } catch (error) {
    if (error.message === PRODUCT_NOT_FOUND) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    console.error('Erro ao deletar produto:', error);
    return res.status(500).json({ error: 'Erro ao deletar produto' });
  }
}

module.exports = {
  create,
  getById,
  list,
  remove,
  update,
};
