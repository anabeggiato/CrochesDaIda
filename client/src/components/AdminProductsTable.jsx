import styled from 'styled-components';
import { MdOutlineEdit } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import { IoFilter } from 'react-icons/io5';
import { PRODUCT_CATEGORY_FILTER_OPTIONS } from '../constants/categories';

export default function AdminProductsTable({
  products,
  selectedCategory,
  setSelectedCategory,
  showFilter,
  setShowFilter,
  filterRef,
  onEdit,
  onDelete,
}) {
  return (
    <TableWrapper>
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
                      $active={selectedCategory === categoryOption.value}
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
          {products.map((product) => (
            <tr key={product.id}>
              <td className="content">{product.name}</td>
              <td className="content">R${product.value},00</td>
              <td className="content">{product.height}cm</td>
              <td className="content">{product.width}cm</td>
              <td className="content">{product.weight}g</td>
              <td className="content">{product.category}</td>
              <td>
                <MdOutlineEdit onClick={() => onEdit(product.id)} />
              </td>
              <td>
                <BsTrash onClick={() => onDelete(product.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
}

const TableWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  box-sizing: border-box;

  svg:hover {
    cursor: pointer;
  }

  table {
    border-collapse: collapse;
    text-align: left;
    width: min(1100px, 100%);
    margin: 0 auto;
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

  @media (max-width: 768px) {
    overflow-x: auto;

    table {
      min-width: 760px;
    }
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
  background-color: ${({ $active }) => ($active ? '#f7d5fb' : '#fff')};

  &:hover {
    background-color: #f1f1f1;
  }
`;
