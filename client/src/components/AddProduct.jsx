import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import { createProduct } from '../services/productService';
import { getEmptyProductFormValues } from '../utils/productForm';

function AddProduct({ onProductCreated }) {
  const [imageFile, setImageFile] = useState(null);
  const [formVersion, setFormVersion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const initialValues = getEmptyProductFormValues();

  const handleImageChange = (event) => {
    setImageFile(event.currentTarget.files[0]);
  };

  const onsubmit = async (values, { resetForm }) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');

      const createdProduct = await createProduct(values, imageFile);

      alert('Produto adicionado com sucesso!');
      resetForm();
      setImageFile(null);
      setFormVersion((currentVersion) => currentVersion + 1);

      if (onProductCreated) {
        onProductCreated(createdProduct);
      }
    } catch (err) {
      console.error('Erro ao adicionar produto:', err);
      setSubmitError(
        err.response?.data?.error || 'Não foi possível cadastrar o produto.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <ProductForm
      key={formVersion}
      initialValues={initialValues}
      title="Adição de novos produtos"
      submitLabel="Cadastrar Produto"
      onSubmit={onsubmit}
      onImageChange={handleImageChange}
      imageFile={imageFile}
      submitError={submitError}
      isSubmitting={isSubmitting}
      secondaryAction={
        <button type="button" onClick={handleLogout} disabled={isSubmitting}>
          Sair
        </button>
      }
    />
  );
}

export default AddProduct;
