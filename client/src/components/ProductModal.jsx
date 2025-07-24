import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'

export default function ProductModal({ product, closeModal }) {
    return (
        <Popup>
            <Card>
                <FaTimes onClick={closeModal} />
                <img src={product.image_url} alt='item de croche' />
                <div className='infos'>
                    <h2>{product.name}</h2>
                    <span>R${product.value},00</span>
                    <div className='dimensions'>
                        <h4>Especificações:</h4>
                        <p>Altura: {product.height}cm</p>
                        <p>Largura: {product.width}cm</p>
                        <p>Peso: {product.weight}g</p>
                    </div>
                </div>
            </Card>
        </Popup>
    )
}

const Popup = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(128, 128, 128, 0.7);
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Card = styled.div`
  display: flex;
  flex-direction: column; 
  background-color: #fad6ff;
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;

  img {
    width: 100%;
    height: auto;
    max-height: 570px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  .infos {
    text-align: center;
  }

  h2 {
    font-size: 20px;
  }

  span {
    font-size: 24px;
  }

  .dimensions {
    margin-top: 1rem;
    font-size: 16px;
    color: black;
  }

  > svg {
    margin-bottom: 2rem;
  }

  > svg:hover {
    color: white;
    cursor: pointer;
  }

  @media (max-width: 1350px) {
    width: 70%;
  }
`

