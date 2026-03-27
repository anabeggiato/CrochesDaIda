import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdOutlineEdit } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import { IoFilter } from 'react-icons/io5';
import PageState from '../components/PageState';
import UpdateProductModal from '../components/UpdateProductModal';
import DeleteProductModal from '../components/DeleteProductModal';
import useProducts from '../hooks/useProducts';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CATEGORY_FILTER_OPTIONS,
} from '../constants/categories';
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
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preco</th>
              <th>Altura</th>
              <th>Largura</th>
              <th>Peso</th>
              <th ref={filterRef} style={{ position: 'relative' }}>
                Categoria{' '}
                <IoFilter
                  onClick={() => setShowFilter((prev) => !prev)}
                  style={{ cursor: 'pointer' }}
                />
                {showFilter && (
                  <FilterDropdown>
                    {PRODUCT_CATEGORY_FILTER_OPTIONS.map((categoryOption) => (
                      <FilterOption
                        key={categoryOption.value}
                        onClick={() => {
                          setSelectedCategory(categoryOption.value);
                          setShowFilter(false);
                        }}
                      >
                        {categoryOption.label}
                      </FilterOption>
                    ))}
                  </FilterDropdown>
                )}
              </th>
              <th aria-label="Editar"></th>
              <th aria-label="Excluir"></th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((value) => (
              <tr key={value.id}>
                <td className="content">{value.name}</td>
                <td className="content">R${value.value},00</td>
                <td className="content">{value.height}cm</td>
                <td className="content">{value.width}cm</td>
                <td className="content">{value.weight}g</td>
                <td className="content">{value.category}</td>
                <td>
                  <MdOutlineEdit onClick={() => handleEditPopup(value.id)} />
                </td>
                <td>
                  <BsTrash onClick={() => handleDeletePopup(value.id)} />
                </td>
              </tr>
            ))}
          </tbody>

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
        </table>
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

  svg:hover {
    cursor: pointer;
  }

  table {
    border-collapse: collapse;
    text-align: left;
    width: 80%;
  }

  th,
  td {
    padding: 1rem;
  }

  th {
    background-color: rgba(239, 110, 255, 0.3);
    font-weight: 600;
  }

  tbody tr:nth-child(even) td {
    background-color: rgba(239, 110, 255, 0.1);
  }

  tbody tr:nth-child(odd) td {
    background-color: transparent;
  }

  td.content {
    font-weight: 200;
    border-bottom: 1px solid #ccc;
  }
`;

const FilterDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 5;
`;

const FilterOption = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  white-space: nowrap;

  &:hover {
    background-color: #f1f1f1;
  }
`;
