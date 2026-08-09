import api from './api';
import { compressImageFile } from '../utils/productImages';

function normalizeProductsResponse(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.products)) {
    return data.products;
  }

  return [];
}

async function buildProductFormData(values, imageFile) {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, value);
  });

  if (imageFile) {
    const optimizedImageFile = await compressImageFile(imageFile);
    formData.append('image', optimizedImageFile);
  }

  return formData;
}

export async function fetchProducts() {
  const response = await api.get('');
  return normalizeProductsResponse(response.data);
}

export async function createProduct(values, imageFile) {
  const formData = await buildProductFormData(values, imageFile);

  const response = await api.post('admin/produtos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

export async function updateProduct(productId, values, imageFile) {
  const formData = await buildProductFormData(values, imageFile);

  const response = await api.put(
    `admin/produto/update/${productId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
}

export async function deleteProduct(productId) {
  const response = await api.delete(`admin/produto/delete/${productId}`);
  return response.data;
}
