import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AdminProductsTable from '../components/AdminProductsTable';
import PageState from '../components/PageState';
import UpdateProductModal from '../components/UpdateProductModal';
import DeleteProductModal from '../components/DeleteProductModal';
import useProducts from '../hooks/useProducts';
import { PRODUCT_CATEGORIES } from '../constants/categories';
import {
  filterProductsByCategory,
  sortProductsByName,
} from '../utils/products';

export default function AdminProductsPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    PRODUCT_CATEGORIES.ALL
  );
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);
  const {
    error,
    loading,
    products: listOfProducts,
    refreshProducts,
    setProducts: setListOfProducts,
  } = useProducts();

  const handleEditPopup = (id) => {
    const product = listOfProducts.find((product) => product.id === id);
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const closeModal = () => {
    setShowPopup(false);
  };

  const handleDeletePopup = (id) => {
    const product = listOfProducts.find((product) => product.id === id);
    setSelectedProduct(product);
    setConfirmDeletion(true);
  };

  const closeConfirmDeletion = () => {
    setConfirmDeletion(false);
  };

  const handleProductUpdated = (updatedProduct) => {
    setListOfProducts((currentProducts) =>
      sortProductsByName(
        currentProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      )
    );
  };

  const handleProductDeleted = (deletedProductId) => {
    setListOfProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== deletedProductId)
    );
  };

  const filteredProducts = useMemo(
    () => filterProductsByCategory(listOfProducts, selectedCategory),
    [listOfProducts, selectedCategory]
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <TablePage>
      <Link to="/admin" className="link">
        Voltar
      </Link>
      {loading && (
        <PageState
          title="Carregando produtos"
          description="Estamos buscando os produtos cadastrados."
        />
      )}
      {!loading && error && (
        <PageState
          title="Não foi possível carregar a tabela"
          description="Tente atualizar os dados novamente."
          action={<button onClick={refreshProducts}>Tentar novamente</button>}
        />
      )}
      {!loading && !error && filteredProducts.length === 0 && (
        <PageState
          title="Nenhum produto encontrado"
          description="Nao ha produtos cadastrados para esse filtro."
        />
      )}
      {!loading && !error && filteredProducts.length > 0 && (
        <AdminProductsTable
          products={filteredProducts}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          filterRef={filterRef}
          onEdit={handleEditPopup}
          onDelete={handleDeletePopup}
        />
      )}
      {showPopup && (
        <UpdateProductModal
          product={selectedProduct}
          closeModal={closeModal}
          onProductUpdated={handleProductUpdated}
        />
      )}
      {confirmDeletion && (
        <DeleteProductModal
          product={selectedProduct}
          closeModal={closeConfirmDeletion}
          onProductDeleted={handleProductDeleted}
        />
      )}
    </TablePage>
  );
}

const TablePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;
  text-align: right;
`;
