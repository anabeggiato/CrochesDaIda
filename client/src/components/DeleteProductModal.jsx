import { useState } from 'react';
import styled from 'styled-components';
import { deleteProduct } from '../services/productService';

export default function DeleteProductModal({
  product,
  closeModal,
  onProductDeleted,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleDeleteProduct = async () => {
    try {
      setIsDeleting(true);
      setDeleteError('');

      await deleteProduct(product.id);
      alert('Produto deletado com sucesso!');

      if (onProductDeleted) {
        onProductDeleted(product.id);
      }

      closeModal();
    } catch (err) {
      console.error('Erro ao deletar produto:', err.response?.data || err);
      setDeleteError(
        err.response?.data?.error || 'Não foi possível deletar o produto.'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Popup>
      <PopupContent>
        Tem certeza que deseja deletar o produto "{product.name}"?
        {deleteError && <p className="deleteError">{deleteError}</p>}
        <div className="buttons">
          <button onClick={handleDeleteProduct} disabled={isDeleting}>
            {isDeleting ? 'Excluindo...' : 'Sim'}
          </button>
          <button onClick={closeModal} disabled={isDeleting}>
            Não
          </button>
        </div>
      </PopupContent>
    </Popup>
  );
}

const Popup = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(128, 128, 128, 0.7);
  position: fixed;
  top: 0;
  left: 0;
`;

const PopupContent = styled.div`
  width: 30%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(250, 214, 255);
  border-radius: 30px;
  padding: 2.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  .deleteError {
    margin: 1rem 0 0;
    color: #b42318;
    text-align: center;
  }

  button {
    border: none;
    padding: 0.5rem 2rem;
    border-radius: 15px;
    background-color: #c514db;
    color: #fff;
    margin: 1rem 1rem 0 1rem;
  }

  button:hover {
    cursor: pointer;
    background-color: #860194;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
