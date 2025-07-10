import React from 'react'
import styled from 'styled-components'
import logo from '../assets/Logo.png'
import logoRetangular from '../assets/logoRetangular.png'
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"
import { IoSearchCircle } from "react-icons/io5";

function NavSup() {
    const itens = 0
    const valor = 0

    return (
        <StyledWrapper>
            <nav className='navbar-top'>
                <a href='/'>
                    <img src={logo} alt='' width='40%' href='/' className='logo-desktop' />
                    <img src={logoRetangular} alt='' href='/' className='logo-mobile' />
                </a>

                <div className='search-section'>
                    <IoSearchCircle className='search-icon' />
                    <input placeholder='Buscar no site...' />
                </div>

                <div className='cart-section'>
                    <FaShoppingCart className='cart-icon'/>
                    <div className='infos-cart-section'>
                        <p>{itens} itens</p>
                        <span>R${valor},00</span>
                    </div>
                </div>

                <div className='profile-section'>
                    <FaUserCircle className='profile-icon' />
                    <div className='infos-profile-section'>
                        <span>Olá, seja bem-vindo(a)!</span><br/>
                        <a href='/modularizes page styling'>Faça login ou cadastre-se</a>
                    </div>
                </div>
            </nav>
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
.navbar-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  margin-top: .8rem;
  width: 100%;
}

.logo-mobile {
  display: none;
}

.search-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 1.2rem;
}

.search-icon {
  font-size: 4rem;
    color: #860194;
}

.search-section>input {
  border-radius: 20px;
  border: 1px solid #B1B1B1;
  padding: .7rem .8rem .7rem 1.2rem;
  width: 12rem;
  z-index: -1;

  color: #868686;
  font-weight: 300;

  margin-left: -1.5rem;
}

.cart-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .5rem;
}

  .cart-icon,
  .profile-icon {
    font-size: 3rem;
    color: #860194;
  }

.infos-cart-section>span {
  font-weight: 600;
}

.profile-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .5rem;
}

.infos-profile-section>span {
  font-weight: 600;
}

.infos-profile-section>a {
  font-weight: 300;
  color: black;
}

.infos-profile-section>a:hover {
  text-decoration: underline;
}

  @media (max-width: 800px) {
  .navbar-top {
    margin-top: .4rem;
  }

  .logo-desktop {
    display: none;
  }

  .logo-mobile {
    display: flex;
  }

  .cart-icon, 
  .profile-icon {
    font-size: 1.3rem;
  }

  .search-icon {
    font-size: 2rem;
  }


  .infos-cart-section,
  .infos-profile-section {
    display: none;
  }

  .search-section>input {
    border-radius: 10px;
    padding: .2rem .4rem .2rem .8rem;
    width: 6rem;
    z-index: -1;
    font-size: .5rem;
  }
}

`

export default NavSup

