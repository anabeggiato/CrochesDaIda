import '../App.css'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Products() {
    const [listOfProducts, setListOfProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/produtos').then((response) => {
            setListOfProducts(response.data)
        })
    }, [])

    return (
        <div>
            {listOfProducts.map((value, key) => {
                return <div className='product'>
                    <div className='product-img'></div>
                    <div className='product-infos'>
                        <h2>{value.name}</h2>
                        <span>{value.value}</span>
                        <p>ou em até 00x de R$00,00</p>
                    </div>
                </div>
            })}
        </div>
    )
}

export default Products