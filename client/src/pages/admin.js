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

  margin: 5rem;
  gap: 5px;
}

.addProductPage>span {
  font-size: 10px;
  color: red;
}

.link {
  text-align: center;
}
`

export default Admin