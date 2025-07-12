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
  width: 100vw;
  background-color: #C514DB;
  padding: 1rem 0;
  text-align: center;
}

.navbar-top span {
  color: #FFF;
}`

export default NavSup

