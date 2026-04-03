import styled from 'styled-components';

export default function ProductCard({ product, onClick }) {
  return (
    <Card onClick={onClick}>
      <div className="product-img">
        <img src={product.image_url} alt={product.name} />
      </div>
      <div className="product-card-infos">
        <h2>{product.name} em crochê amigurumi</h2>
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
    width: 100%;
    height: 100%;
    max-height: 250px;
  }

  .product-img img {
    width: 100%;
    height: 100%;
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

    .product-img {
      max-height: 155px;
      align-items: center;
    }

    .product-card-infos > h2 {
      max-width: 90%;
    }
  }
`;
