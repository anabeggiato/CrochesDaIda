import '../App.css'
import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from 'react'

import NavSup from '../components/navSup'

function Products() {
  const [listOfProducts, setListOfProducts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/`)
      .then((response) => {
        console.log('Resposta da API:', response.data)
        setListOfProducts(response.data)
      })
      .catch(err => {
        console.error('Erro ao buscar produtos:', err)
      })
  }, [])


  return (
    <StyledWrapper>
      <NavSup />
      <div className='products'>
        {Array.isArray(listOfProducts) ? (
          listOfProducts.map((value, key) => (
            <div className='product' key={value.id || key}>
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
          ))
        ) : (
          <p>Carregando produtos ou resposta inválida</p>
        )}

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
}

.product-img {
  width: 90%;
  height: 70%;
  margin-top: 2vh;
  border-radius: 1.25rem;
}

.product-img img {
  width: 100%;
  height: 100%;
  border-radius: 1.25rem;
  max-height: 220px;
}

.product-card-infos {
  display: flex;
  flex-direction: column;
  align-items: center;
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
}

@media (min-width: 1145px) and (max-width: 1625px) {
  .products {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}

@media (min-width: 990px) and (max-width: 1144px) {
  .products {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

@media (min-width: 769px) and (max-width: 989px) {
  .products {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .product {
    width: 90%;
  }
}

@media (max-width: 768px) {
  .products {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .products {
    margin: 2vh 1vw;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .product {
    width: 90%;
    row-gap: 1rem;
  }

  .product-img {
    max-height: 155px;
    align-items: center;
  }

  .product-card-infos>h2 {
    max-width: 90%;
  }
}
`

export default Products