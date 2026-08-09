import styled from 'styled-components';
import {
  getProductImageSrcSet,
  getProductImageUrl,
} from '../utils/productImages';

export default function ProductCard({ product, onClick }) {
  const imageSrc = getProductImageUrl(product, 'thumbnail');
  const imageSrcSet = getProductImageSrcSet(product, 'thumbnail');

  return (
    <Card onClick={onClick}>
      <div className="product-img">
        <img
          src={imageSrc}
          srcSet={imageSrcSet}
          sizes="(max-width: 480px) 45vw, (max-width: 768px) 40vw, (max-width: 1144px) 25vw, 18vw"
          alt={product.name}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      </div>
      <div className="product-card-infos">
        <h2>{product.name} em crochê</h2>
        <span>R${product.value}, 00</span>
      </div>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  gap: 0.5rem;

  &:hover {
    cursor: pointer;
  }

  .product-img {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 12px;
    background-color: #f3f3f3;
  }

  .product-img::before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  .product-img img {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .product-card-infos {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h2 {
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    text-transform: capitalize;
  }

  span {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
  }

  @media (min-width: 769px) and (max-width: 989px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 90%;
    row-gap: 1rem;

    .product-card-infos > h2 {
      max-width: 90%;
    }
  }
`;
