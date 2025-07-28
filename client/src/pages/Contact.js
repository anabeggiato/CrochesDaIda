import { useState } from 'react'
import Header from '../components/Header'
import styled from 'styled-components'
import { FaInstagram} from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function Contact() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    function handleSubmit(event) {
        event.preventDefault();

        const name = event.target.name.value;
        const message = event.target.message.value;

        const text = `Olá, sou a ${name} e ${message}`;
        const number = process.env.REACT_APP_WHATSAPP_NUMBER;

        const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

        window.open(url, '_blank');
    }

    return (
        <ContactPage>
            <Header selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <h1>Entre em contato conosco</h1>
            <form onSubmit={handleSubmit}>
                <label>Digite seu nome:</label>
                <input type="text" name="name" placeholder="Seu nome" required />
                <label>Digite sua mensagem:</label>
                <textarea name="message" placeholder="Sua mensagem" required></textarea>
                <button type="submit">Enviar via WhatsApp</button>
            </form>

            <div className='contacts'>
                <a href="https://www.instagram.com/crochesdaida/" rel='noreferrer'  target="_blank" style={{textDecoration: 'none', color: 'inherit'}}>
                    <div className='card'>
                        <FaInstagram className='media'/>
                            <div>
                                <span style={{margin: 0, fontSize: '1.1rem', fontWeigth: '500'}}>Conheça nosso instagram</span>
                                <p style={{color: '#888'}}>@crochesdaida</p>
                            </div>
                    </div>
                </a>

                <a href="mailto:crochesdaida@email.com?subject=Pedido de informações&body=Gostaria%20de%20saber%20mais%20sobre%20seu%20trabalho." style={{textDecoration: 'none', color: 'inherit'}}>
                    <div className='card'>
                        <SiGmail className='media'/>
                            <div>
                                <span style={{margin: 0, fontSize: '1.1rem', fontWeigth: '500'}}>Entre em contato por email</span>
                                <p style={{color: '#888'}}>crochesdaida@gmail.com</p>
                            </div>
                    </div>
                </a>

            </div>
        </ContactPage>
    )
}

const ContactPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        margin-top: 120px;
        font-size: 24px;
        width: 100%;
        text-align: center;
        color: #860194;
    }

    form {
        margin: 20px;

        display: flex;
        flex-direction: column;
        width: 70%;
        align-items: center;
        text-align: left;
        background-color: #fad6ff;
        padding: 2rem;
        border-radius: 15px;
        min-width: 400px;
    }

    label {
        width: 100%;
        margin-bottom: .2rem;
    }

    input, textarea {
        width: 100%;
        max-width: 100%;
        min-width: 100%;
        margin: 0 2rem 2rem 2rem;
        padding: .5rem;
        border: none;
        border-radius: 15px;
    }

    button {
        width: 60%;
        border: none;
        padding: .5rem;
        border-radius: 15px;
        background-color: #C514DB;
        color: #fff;
        margin-top: 1rem;
    }

    button:hover {
        cursor: pointer;
        background-color: #860194;
    }

    .contacts {
        margin-top: 2rem;
        display: flex;
        gap: 1rem;
    }

    .card {
        display: flex; 
        align-items: center;
        gap: 16px; 
        border: 1px solid #ddd;
        border-radius: 12px;
        padding: 16px;
        width: 400px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }

    .media {
        font-size: 36px;
        color: #860194;
    }

    @media(max-width: 900px) {
        .contacts {
            flex-direction: column;
        }
    }

    @media (max-width: 420px) {
        form {
            min-width: 150px;
        }

        .card {
            width: 300px;
        }
    }
`
