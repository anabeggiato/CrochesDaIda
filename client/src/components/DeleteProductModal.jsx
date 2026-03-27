import styled from 'styled-components'
import { deleteProduct } from '../services/productService';

export default function DeleteProductModal({ product, closeModal, onProductDeleted }) {

    const handleDeleteProduct = () => {
        deleteProduct(product.id)
            .then(() => {
                alert('Produto deletado com sucesso!');

                if (onProductDeleted) {
                    onProductDeleted(product.id);
                }

                closeModal(); 
            })
            .catch((err) => {
                console.error('Erro ao deletar produto:', err.response?.data || err);
                alert('Erro ao deletar produto.');
            });
    }


    return (
        <Popup>
            <PopupContent>
                Tem certeza que deseja deletar o produto "{product.name}"?
                <div className='buttons'>
                    <button onClick={handleDeleteProduct}>Sim</button>
                    <button onClick={closeModal}>Não</button>
                </div>
            </PopupContent>
        </Popup>
    )
}

const Popup = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(128, 128, 128, 0.7);
  position: fixed;
  top: 0;
  left: 0;
`

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


  button {
      border: none;
      padding: .5rem 2rem;
      border-radius: 15px;
      background-color: #C514DB;
      color: #fff;
      margin: 1rem 1rem 0 1rem;

  }

  button:hover {
      cursor: pointer;
      background-color: #860194;
  }
`
