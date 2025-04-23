import React, { useState } from 'react';
import styled from 'styled-components';
import { HiOutlineBars3 } from "react-icons/hi2";



function NavInf() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <StyledWrapper>
      <nav className='navbar-botton' >
        <a href='/' >Sobre nós</a>
        <div className='separation' />
        <a href='/produtos' >Produtos</a>
        <div className='separation' />
        <a href='/' >Categorias</a>
        <div className='separation' />
        <a href='/' >Kits e coleções</a>
      </nav>
{/* 
      <nav className='navbar-mobile'>
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
        {openMenu ? 
          <div className='navbar-mobile-content'>
            teste
          </div>
         : null }
      </nav> */}

    </StyledWrapper>
  )

}

const StyledWrapper = styled.div`
.navbar-botton {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: #C514DB;
}

.navbar-botton>a {
  padding: 1.5rem;
  font-weight: 700;
  color: #ffff;
}

.navbar-botton>a:hover {
  background-color: #ffff;
  color: #C514DB;
}

.separation {
  width: .1rem;
  height: 3rem;
  background-color: #ffff;
}

.navbar-mobile {
  display: none;
}

@media (max-width: 800px) {
  .navbar-botton>a {
    padding: 1rem .6rem;
    font-weight: 700;
    color: #ffff;
    font-size: .8rem;
  }

  .separation {
    width: 1px !important;
    height: 1.5rem;
    background-color: #ffff;
  }

}

`

export default NavInf
