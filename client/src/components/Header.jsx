import styled from 'styled-components';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { PRODUCT_CATEGORY_FILTER_OPTIONS } from '../constants/categories';

export default function Header({ selectedCategory, setSelectedCategory }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const logo = '/logoRetangular.svg';

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsMenuOpen(false);
    navigate('/');
  };

  const handleContactClick = () => {
    setIsMenuOpen(false);
    navigate('/contato');
  };

  return (
    <Container>
      <Navigation>
        <LogoWrapper
          onClick={() => {
            setIsMenuOpen(false);
            navigate('/');
          }}
        >
          <img src={logo} alt="logo" />
        </LogoWrapper>

        <MobileMenuButton
          type="button"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>

        <MenuWrapper $isOpen={isMenuOpen}>
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
              {categoryOption.label}
            </NavItem>
          ))}

          <NavItem
            type="button"
            onClick={handleContactClick}
            selected={location.pathname === '/contato'}
          >
            Contato
          </NavItem>
        </MenuWrapper>
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
    min-height: 74px;
    padding: 8px 16px;
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

  @media (max-width: 768px) {
    > img {
      height: 54px;
    }
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 18px;
  width: 100%;

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    justify-content: space-between;
    gap: 16px;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 18px;
  width: 100%;

  @media (max-width: 768px) {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    right: 0;
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 8px;
    padding: 12px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.98);
    border: 1px solid rgba(134, 1, 148, 0.12);
    border-radius: 12px;
    box-shadow: 0 12px 28px rgba(94, 62, 43, 0.14);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  border: none;
  background: transparent;
  color: #860194;
  cursor: pointer;
  padding: 10px;

  svg {
    width: 24px;
    height: 24px;
    display: block;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const NavItem = styled.button`
  border: none;
  padding: 10px 0;
  background: transparent;
  color: #000000;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s ease;
  white-space: nowrap;
  border-bottom: 3px solid
    ${({ selected }) => (selected ? '#C26FE0' : 'transparent')};

  &:hover {
    border-bottom-color: #C26FE0;
  }

  @media (max-width: 768px) {
    padding: 12px 14px;
    border: 1px solid
      ${({ selected }) => (selected ? '#C26FE0' : 'rgba(134, 1, 148, 0.14)')};
    border-radius: 10px;
    background-color: ${({ selected }) =>
      selected ? 'rgba(194, 111, 224, 0.16)' : '#ffffff'};
    font-size: 14px;
    text-align: left;
  }
`;
