import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import { createProduct } from '../services/productService';

function AddProduct({ onProductCreated }) {
  const [imageFile, setImageFile] = useState(null);
  const [formVersion, setFormVersion] = useState(0);

  const initialValues = {
    name: '',
    value: '',
    height: 0,
    width: 0,
    weight: 0,
    description: '',
  };

  const handleImageChange = (event) => {
    setImageFile(event.currentTarget.files[0]);
  };

  const onsubmit = async (values, { resetForm }) => {
    createProduct(values, imageFile)
      .then((createdProduct) => {
        alert('Produto adicionado com sucesso!');
        resetForm();
        setImageFile(null);
        setFormVersion((currentVersion) => currentVersion + 1);

        if (onProductCreated) {
          onProductCreated(createdProduct);
        }
      })
      .catch((err) => {
        console.error('Erro ao adicionar produto:', err);
      });
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
      secondaryAction={
        <button type="button" onClick={handleLogout}>
          Sair
        </button>
      }
    />
  );
}

export default AddProduct;
