import React from 'react'
import Header from '../components/Header'
import styled from 'styled-components'
import { useState } from 'react';
//import { FaInstagram, FaWhatsapp } from "react-icons/fa6"

export default function Contact() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  return (
    <ContactPage>
      <Header selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <h1>Tela em desenvolvimento</h1>
    </ContactPage>
  )
}

const ContactPage = styled.div`
    margin-top: 100px;
`