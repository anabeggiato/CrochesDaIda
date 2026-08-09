import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CATEGORY_FILTER_OPTIONS,
} from '../constants/categories';

export default function Sidebar({
  isOpen,
  onClose,
  selectedCategory,
  setSelectedCategory,
}) {
  const navigate = useNavigate();

  return (
    <Container sidebar={isOpen}>
      <FaTimes onClick={onClose} />
      <Content>
        {PRODUCT_CATEGORY_FILTER_OPTIONS.map((categoryOption) => (
          <Category
            key={categoryOption.value}
            onClick={() => {
              setSelectedCategory(categoryOption.value);
              navigate('/');
              onClose();
            }}
            selected={selectedCategory === categoryOption.value}
          >
            {categoryOption.value === PRODUCT_CATEGORIES.OTHERS
              ? 'Outros Produtos'
              : categoryOption.label}
          </Category>
        ))}
        <Category
          onClick={() => {
            navigate('/contato');
            onClose();
          }}
        >
          Contato
        </Category>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  background-color: #c514db;
  position: fixed;
  height: 100%;
  top: 0px;
  left: 0px;
  width: 300px;
  left: ${(props) => (props.sidebar ? '0' : '-100%')};
  animation: showSidebar 0.4s;

  > svg {
    position: fixed;
    color: white;
    width: 30px;
    height: 30px;
    margin-top: 32px;
    margin-left: 32px;
    cursor: pointer;
  }

  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 300px;
    }
  }
`;

const Content = styled.div`
  margin-top: 100px;
`;

const Category = styled.p`
  font-size: 20px;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  margin: 0 15px 20px;
  background-color: ${({ selected }) =>
    selected ? '#860194' : 'rgba(239, 110, 255, 0.35)'};

  &:hover {
    background-color: #860194;
  }
`;
