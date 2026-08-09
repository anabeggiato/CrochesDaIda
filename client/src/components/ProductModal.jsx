import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import {
  getProductImageSrcSet,
  getProductImageUrl,
} from '../utils/productImages';

export default function ProductModal({ product, closeModal }) {
  const imageSrc = getProductImageUrl(product, 'modal');
  const imageSrcSet = getProductImageSrcSet(product, 'modal');

  const closeOnMobileBackdropClick = (event) => {
    const clickedBackdrop = event.target === event.currentTarget;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (clickedBackdrop && isMobile) {
      closeModal();
    }
  };

  return (
    <Popup onClick={closeOnMobileBackdropClick}>
      <Card>
        <FaTimes onClick={closeModal} />
        <img
          src={imageSrc}
          srcSet={imageSrcSet}
          sizes="(max-width: 768px) 90vw, min(42vw, 440px)"
          alt={product.name}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="infos">
          <h2>{product.name}</h2>
          <span>R${product.value},00</span>
          <div className="dimensions">
            <h4>Especificações:</h4>
            <p>Altura: {product.height}cm</p>
            <p>Largura: {product.width}cm</p>
            <p>Peso: {product.weight}g</p>
          </div>
        </div>
      </Card>
    </Popup>
  );
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
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  gap: 2rem;
  align-items: center;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  padding: 2rem;
  width: fit-content;
  max-width: min(90vw, 760px);
  box-sizing: border-box;

  img {
    width: min(48vw, 440px);
    height: auto;
    max-height: 620px;
    object-fit: cover;
    border-radius: 12px;
  }

  .infos {
    flex: 1;
    min-width: 0;
    text-align: left;
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
    color: #6e6e6e !important;
  }

  > svg {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
  }

  > svg:hover {
    color: white;
    cursor: pointer;
  }

  @media (max-width: 1350px) {
    max-width: min(90vw, 760px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
    width: min(88vw, 360px);
    max-height: 86vh;
    padding: 1rem;
    border-radius: 16px;
    overflow-y: auto;

    img {
      width: 100%;
      max-height: 46vh;
    }

    .infos {
      text-align: center;
    }

    h2 {
      font-size: 18px;
    }

    span {
      font-size: 22px;
    }

    .dimensions {
      margin-top: 0.75rem;
      font-size: 14px;
    }

    > svg {
      top: 0.75rem;
      right: 0.75rem;
    }
  }
`;
