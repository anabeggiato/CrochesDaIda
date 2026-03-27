import api from './api';

function normalizeProductsResponse(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.products)) {
    return data.products;
  }

  return [];
}

function buildProductFormData(values, imageFile) {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, value);
  });

  if (imageFile) {
    formData.append('image', imageFile);
  }

  return formData;
}

export async function fetchProducts() {
  const response = await api.get('');
  return normalizeProductsResponse(response.data);
}

export async function createProduct(values, imageFile) {
  const formData = buildProductFormData(values, imageFile);

  const response = await api.post('admin/produtos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

export async function updateProduct(productId, values, imageFile) {
  const formData = buildProductFormData(values, imageFile);

  const response = await api.put(`admin/produto/update/${productId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

export async function deleteProduct(productId) {
  const response = await api.delete(`admin/produto/delete/${productId}`);
  return response.data;
}
