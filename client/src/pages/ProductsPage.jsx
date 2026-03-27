import '../App.css';
import styled from 'styled-components';
import { useMemo, useState } from 'react';

import Header from '../components/Header';
import ProductModal from '../components/ProductModal';
import useProducts from '../hooks/useProducts';
import { PRODUCT_CATEGORIES } from '../constants/categories';
import {
  filterProductsByCategory,
  isAmigurumiProduct,
} from '../utils/products';

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState(
    PRODUCT_CATEGORIES.ALL
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products: listOfProducts } = useProducts();

  const filteredProducts = useMemo(
    () => filterProductsByCategory(listOfProducts, selectedCategory),
    [listOfProducts, selectedCategory]
  );

  const openProductModal = (id) => {
    const product = listOfProducts.find((product) => product.id === id);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <StyledWrapper>
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="products">
        {filteredProducts.map((value) => (
          <div
            className="product"
            key={value.id}
            onClick={() => openProductModal(value.id)}
          >
            <div className="product-img">
              <img src={value.image_url} alt={value.name} />
            </div>
            <div className="product-card-infos">
              <h2>{value.name}</h2>
              <span>R${value.value},00</span>
              <div className="dimensions">
                <p>
                  {value.height}cm x {value.width}cm
                </p>
                {isAmigurumiProduct(value) ? <p>{value.weight}g</p> : <></>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .products {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    justify-items: center;
    row-gap: 3rem;
    margin: calc(100px + 4vh) 4vw 4vh 4vw;
  }

  .product {
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #fad6ff;

    width: 80%;
    border-radius: 20px;
    gap: 0.5rem;
  }

  .product:hover {
    cursor: pointer;
  }

  .product-img {
    width: 90%;
    height: 70%;
    max-height: 250px;
    margin-top: 2vh;
    border-radius: 20px;
  }

  .product-img img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    max-height: 220px;
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

  .dimensions {
    color: rgb(141, 141, 141);
    text-align: center;
    font-size: 12px;
    padding-bottom: 0.5rem;
  }

  span {
    color: #860194;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
  }

  @media (min-width: 1145px) and (max-width: 1625px) {
    .products {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
  }

  @media (min-width: 990px) and (max-width: 1144px) {
    .products {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .product-img {
      max-height: 160px;
    }
  }

  @media (min-width: 769px) and (max-width: 989px) {
    .products {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }

    .product {
      width: 90%;
    }
  }

  @media (max-width: 768px) {
    .products {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 480px) {
    .products {
      margin: calc(100px + 2vh) 1vw 2vh 1vw;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .product {
      width: 90%;
      row-gap: 1rem;
    }

    .product-img {
      max-height: 155px;
      align-items: center;
    }

    .product-card-infos > h2 {
      max-width: 90%;
    }
  }
`;

export default ProductsPage;
