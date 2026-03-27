import React, { useState } from 'react';
import styled from 'styled-components';
import ProductForm from './ProductForm';
import { updateProduct } from '../services/productService';

export default function UpdateProductModal({
  product,
  closeModal,
  onProductUpdated,
}) {
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const initialValues = {
    name: product.name,
    value: product.value,
    height: product.height,
    width: product.width,
    weight: product.weight,
    description: product.description,
    category: product.category || '',
  };

  const handleImageChange = (event) => {
    setImageFile(event.currentTarget.files[0]);
  };

  const onsubmit = async (values) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');

      const updatedProduct = await updateProduct(product.id, values, imageFile);

      alert('Produto atualizado com sucesso!');

      if (onProductUpdated) {
        onProductUpdated(updatedProduct);
      }

      closeModal();
    } catch (err) {
      console.error('Erro ao atualizar produto:', err.response?.data || err);
      setSubmitError(
        err.response?.data?.error || 'Não foi possível atualizar o produto.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <ProductForm
        initialValues={initialValues}
        title="Adição de novos produtos"
        submitLabel="Atualizar Produto"
        onSubmit={onsubmit}
        onImageChange={handleImageChange}
        submitError={submitError}
        isSubmitting={isSubmitting}
        secondaryAction={
          <button type="button" onClick={closeModal} disabled={isSubmitting}>
            Cancelar
          </button>
        }
      />
    </FormContainer>
  );
}

const FormContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(128, 128, 128, 0.7);
  position: fixed;
  top: 0;
  left: 0;
`;
