import '../App.css'
import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import NavSup from '../components/navSup'
import Footer from '../components/footer'

function Products() {
  const [listOfProducts, setListOfProducts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/produtos').then((response) => {
      setListOfProducts(response.data)
    })
  }, [])

  return (
    <StyledWrapper>
      <NavSup />
      <div className='products'>
        {listOfProducts.map((value, key) => {
          return <div className='product' >
            <div className='product-img'></div>
            <div className='product-card-infos'>
              <h2>{value.name}</h2>
              <span>R${value.value},00</span>
              <div className='dimensions'>
                <p>{value.height}cm x {value.width}cm</p>
                <p>{value.weight}g</p>
              </div>

            </div>
          </div>
        })}
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
.products {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  row-gap: 3rem;
  margin: 4vh 4vw;
}

.product {
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #fad6ff;

  width: 80%;
  border-radius: 1.25rem;
  gap: .5rem;
  min-height: 35vh;
}

.product-img {
  background-color: #ffff;

  width: 90%;
  height: 70%;
  border-radius: 1.25rem;

  margin-top: 2vh;
}

.product-card-infos {
  display: flex;
  flex-direction: column;
}

.product-card-infos>h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
}

.dimensions {
  color:rgb(141, 141, 141);
  text-align: center;
  font-size: 12px;
  padding-bottom: .5rem;
}

span {
  color: #860194;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
}`

export default Products