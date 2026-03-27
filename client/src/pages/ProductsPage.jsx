import '../App.css';
import styled from 'styled-components';
import { useMemo, useState } from 'react';

import Header from '../components/Header';
import PageState from '../components/PageState';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import useProducts from '../hooks/useProducts';
import { PRODUCT_CATEGORIES } from '../constants/categories';
import { filterProductsByCategory } from '../utils/products';

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState(
    PRODUCT_CATEGORIES.ALL
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    error,
    loading,
    products: listOfProducts,
    refreshProducts,
  } = useProducts();

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
      {loading && (
        <PageState
          title="Carregando produtos"
          description="Estamos buscando o catálogo para você."
        />
      )}
      {!loading && error && (
        <PageState
          title="Não foi possível carregar os produtos"
          description="Confira a conexão com a API e tente novamente."
          action={<button onClick={refreshProducts}>Tentar novamente</button>}
        />
      )}
      {!loading && !error && filteredProducts.length === 0 && (
        <PageState
          title="Nenhum produto encontrado"
          description="Ainda não há itens nessa categoria."
        />
      )}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="products">
          {filteredProducts.map((value) => (
            <ProductCard
              key={value.id}
              product={value}
              onClick={() => openProductModal(value.id)}
            />
          ))}
        </div>
      )}

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
  }
`;

export default ProductsPage;
