import React from 'react'
import styled from 'styled-components'
import AddProduct from '../components/addproduct'

function Admin() {
  return (
    <StyledWrapper>
      <AddProduct />
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  .addProductPage {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 500px;
    margin: 5rem auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0,0,0,0.05);
    background-color: #fafafa;
  }

  .addProductPage > span {
    font-size: 12px;
    color: red;
  }

  .link {
    text-align: center;
  }
`

export default Admin