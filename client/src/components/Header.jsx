import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CATEGORY_FILTER_OPTIONS,
} from '../constants/categories';

export default function Header({ selectedCategory, setSelectedCategory }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logo = '/logoRetangular.svg';

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate('/');
  };

  return (
    <Container>
      <Navigation>
        <LogoWrapper onClick={() => navigate('/')}>
          <img src={logo} alt="logo" />
        </LogoWrapper>

        {PRODUCT_CATEGORY_FILTER_OPTIONS.map((categoryOption) => (
          <NavItem
            key={categoryOption.value}
            type="button"
            onClick={() => handleCategoryClick(categoryOption.value)}
            selected={
              location.pathname === '/' &&
              selectedCategory === categoryOption.value
            }
          >
            {categoryOption.value === PRODUCT_CATEGORIES.OTHERS
              ? 'Outros Produtos'
              : categoryOption.label}
          </NavItem>
        ))}

        <NavItem
          type="button"
          onClick={() => navigate('/contato')}
          selected={location.pathname === '/contato'}
        >
          Contato
        </NavItem>
      </Navigation>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid rgba(134, 1, 148, 0.12);
  backdrop-filter: blur(8px);
  z-index: 99;

  @media (max-width: 768px) {
    min-height: 88px;
    flex-direction: column;
    justify-content: center;
    padding: 12px 16px;
    gap: 12px;
  }
`;

const LogoWrapper = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;

  > img {
    height: 80px;
    display: block;
  }

  @media (max-width: 480px) {
    > img {
      height: 50px;
    }
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 24px;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 4px;
  }
`;

const NavItem = styled.button`
  border: none;
  padding: 10px 0;
  background: transparent;
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s ease;
  white-space: nowrap;
  border-bottom: 3px solid
    ${({ selected }) => (selected ? '#C26FE0' : 'transparent')};

  &:hover {
    border-bottom-color: #C26FE0;
  }
`;
