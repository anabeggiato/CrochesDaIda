import React from 'react'
import styled from 'styled-components'

function NavSup() {

  return (
    <StyledWrapper>
      <nav className='navbar-top'>
        <h1>Nossos Produtos</h1>
        <span>Encomende já o seu!</span>
      </nav>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
.navbar-top {
  color: #FFF;
  width: 100%;
  background-color: #C514DB;
  padding: 1.5rem;
  text-align: center
}

.navbar-top span {
  color: #FFF;
}

.logo-mobile {
  display: none;
}`

export default NavSup

