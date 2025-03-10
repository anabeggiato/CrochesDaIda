import '../App.css'
import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import NavSup from '../components/navSup'
import NavInf from '../components/navInf'
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
            <NavInf />
            <div className='products'>
                {listOfProducts.map((value, key) => {
                    return <div className='product' onClick={() => {navigate(`/produto/${value.id}`)}} >
                        <div className='product-img'></div>
                        <div className='product-card-infos'>
                            <h2>{value.name}</h2>
                            <div className='valores'>
                                <span>R${value.value},00</span>
                                <p>ou em até 00x de R$00,00</p>
                            </div>
                        </div>
                    </div>
                })}
            </div>

            <Footer />
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
.products {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: .8rem;

  margin: 4vh 4vw;
}

.product {
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #fad6ff;

  width: 15vw;
  height: 43vh;
  border-radius: 1.25rem;

  gap: .5rem;

}

.product:hover {
  width: 16vw;
  height: 45vh;
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
  gap: .3rem;

  height: 30%;
}

.product-card-infos>h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
}

.valores {
  display: flex;
  flex-direction: column;
}

.valores>span {
  color: #860194;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
}

.valores>p {
  color: #868686;
  text-align: center;
  font-size: 12px;
  font-style: italic;
  font-weight: 400;
  line-height: normal;
}`

export default Products