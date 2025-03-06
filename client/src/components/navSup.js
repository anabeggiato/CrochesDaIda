import React from 'react'
import styled from 'styled-components'
import logo from '../assets/Logo.png'
import search from '../assets/search.png'
import cart from '../assets/cart.png'
import profile from '../assets/defaultProfile.png'

function NavSup() {
    const itens = 0
    const valor = 0

    return (
        <StyledWrapper>
            <nav className='navbar-top'>
                <a href='/'>
                    <img src={logo} alt='' width='40%' href='/' />
                </a>

                <div className='search-section'>
                    <img src={search} alt='' width='20%' />
                    <input placeholder='Buscar no site...' />
                </div>

                <div className='cart-section'>
                    <img src={cart} alt='' width='35%' />
                    <div className='infos-cart-section'>
                        <p>{itens} itens</p>
                        <span>R${valor},00</span>
                    </div>
                </div>

                <div className='profile-section'>
                    <img src={profile} alt='' width='18%' />
                    <div className='infos-profile-section'>
                        <span>Olá, seja bem-vindo(a)!</span><br/>
                        <a href='#'>Faça login ou cadastre-se</a>
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

.search-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 1.2rem;
}

.search-section>input {
  border-radius: 20px;
  border: 1px solid #B1B1B1;
  padding: .7rem .8rem .7rem 1.2rem;
  width: 12rem;
  z-index: -1;

  color: #868686;
  font-weight: 300;

  margin-left: -1rem;
}

.cart-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .5rem;
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
}`

export default NavSup

