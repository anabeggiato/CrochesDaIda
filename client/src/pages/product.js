import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import calendar from '../assets/calendar.png'
import cart from '../assets/white-cart.png'
import PaymentMethods from '../components/paymentMethods'

function Product() {
    let navigate = useNavigate();

    let { id } = useParams();
    const [postObject, setPostObject] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/produtos/byId/${id}`).then((response) => {
            setPostObject(response.data)
        })
    })

    return (
        <StyledWrapper>
            <div className='product-page'>
                <section className='images'>
                    <div className='minnor-images'>
                        <div className='minnor-image'></div>
                        <div className='minnor-image'></div>
                        <div className='minnor-image'></div>
                        <div className='minnor-image'></div>
                    </div>

                    <div className='mainly-image'>

                    </div>
                </section>

                <section className='product-infos'>
                    <div className='product-values'>
                        <h2>{postObject.name}</h2>
                        <h3>R${postObject.value},00</h3>
                        <p>ou em até 00x de R$00,00</p>
                    </div>
                    <div className='production-time'>
                        <img src={calendar} alt='' width='8%' height='100%' />
                        <div className='production-time-infos'>
                            <span>Tempo de produção</span>
                            <p>Produto pronto em até 15 dias úteis</p>
                        </div>
                    </div>

                    <button className='add-cart-button' onClick={() => { navigate('/') }} >
                        <img src={cart} alt='' />
                        Adicionar ao carrinho
                    </button>

                    <div className='payment-methods-section'>
                        <h3>Meios de pagamento:</h3>
                        <PaymentMethods />
                    </div>

                    <div className='product-description'>
                        <span>Descrição:</span>
                        <p>{postObject.description}</p>

                        <span>Tamanho:</span>
                        <p>Esse amigurumi tem {postObject.height}cm de altura</p>
                    </div>
                </section>

            </div>
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
.product-page {
  display: flex;
  flex-direction: row;
  margin-top: 4rem;
  justify-content: center;
}

.images {
  width: 40%;
  display: flex;
  flex-direction: row;
  gap: 5.5rem;
}

.minnor-images {
  width: 2.5rem;
  gap: .5rem;
}

.minnor-image {
  width: 6.3125rem;
  height: 6.3125rem;
  flex-shrink: 0;
  margin: .6rem;
  border-radius: 1rem;

  background-color: #d9d9d9;
}

.mainly-image {
  width: 32rem;
  height: 34rem;
  border-radius: 1.875rem;
  background: #d9d9d9;
}

.product-infos {
  max-width: 35vw;
  margin-left: 1rem;
}

.product-values h2 {
  color: #000;
  font-size: 2rem;
  font-weight: 500;
  text-transform: capitalize;
}

.product-values>h3 {
  color: #860194;
  font-size: 2rem;
  font-weight: 600;
  margin-top: -.5rem;
}

.product-values>p {
  color: #868686;
  font-size: 1rem;
  font-weight: 400;
}

.production-time {
  display: flex;
  flex-direction: row;
  gap: .5rem;
  align-items: center;
  margin: 1.25rem 0;
}

.production-time-infos span {
  color: #000;
  font-size: 0.875rem;
  font-weight: 400;
}

.production-time-infos p {
  color: #868686;
  font-size: 0.75rem;
  font-weight: 400;
}

.add-cart-button {
  display: flex;
  gap: .2rem;
  justify-content: center;
  align-items: center;
  margin: 2.2rem 0;
  width: 30rem;
  height: 3rem;

  border-radius: 0.625rem;
  background: #d96ee8;
  border-style: none;
  color: #ffff;
}

.add-cart-button:hover {
  background: #C514DB;
  cursor: pointer;
}

.payment-methods-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.75rem;
}

.payment-methods-section h3 {
  color: #000;
font-size: 1rem;
font-weight: 500;
}

.product-description span {
  margin-top: 2.8rem;
  color: #000;
font-size: 1rem;
font-weight: 500;
}

.product-description p {
  color: #000;
font-size: .8rem;
font-weight: 400;
}`

export default Product
