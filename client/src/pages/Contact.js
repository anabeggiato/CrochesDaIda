import React, { useState } from 'react'
import Header from '../components/Header'
import styled from 'styled-components'

export default function Contact() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    return (
        <ContactPage>
            <Header selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <h1>TELA EM DESENVOLVIMENTO</h1>
        </ContactPage>
    )
}

const ContactPage = styled.div`
    h1 {
        margin-top: 120px;
        margin-left: 20px;
    }
`
