import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Product() {
    let {id} = useParams();
    const [postObject, setPostObject] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/produtos/byId/${id}`).then((response) => {
           setPostObject(response.data) 
        })
    })

  return (
    <div className='productPage'>
      <h1> {postObject.name} </h1>
      <h2> {postObject.value} </h2>
      <p> {postObject.description} </p>
    </div>
  )
}

export default Product
