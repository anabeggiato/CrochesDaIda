import '../App.css'
import React from 'react'
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
        <div>
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
        </div>
    )
}

export default Products