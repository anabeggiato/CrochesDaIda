import '../App.css'
import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import NavSup from '../components/navSup'

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
            <div className='product-img'>
              <img src={value.image_url} alt={value.name} />
              {console.log(value.image_url)}
            </div>
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
  width: 90%;
  height: 70%;
  margin-top: 2vh;
  border-radius: 1.25rem;
}

.product-img img {
  width: 100%;
  border-radius: 1.25rem;
  border: .25px solid #C514DB;
  max-height: 220px;
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