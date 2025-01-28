import React, { useEffect, useState } from 'react'
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

                <button className='add-cart-button' onClick={() => {navigate('/')}} >
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
    )
}

export default Product

/*
<p>  </p> */