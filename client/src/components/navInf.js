import React from 'react'
import styled from 'styled-components'

function NavInf() {
    return (
        <StyledWrapper>
            <nav className='navbar-botton' >
                <a href='/' >Sobre nós</a>
                <div className='separation'/>
                <a href='/produtos' >Produtos</a>
                <div className='separation'/>
                <a href='/' >Categorias</a>
                <div className='separation'/>
                <a href='/' >Kits e coleções</a>
            </nav>
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
}`

export default NavInf
