import React from 'react'
import styled from 'styled-components'
import AddProduct from '../components/addproduct'
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <StyledWrapper>
      <AddProduct />
      <button onClick={handleLogout}>Sair</button>
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