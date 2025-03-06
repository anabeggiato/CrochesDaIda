import React, { Component } from 'react'
import styled from 'styled-components'
import logo from '../assets/Logo.png'
import instagram from '../assets/instagram.png'
import whatsapp from '../assets/whatsapp.png'
import email from '../assets/email.png'
import PaymentMethods from './paymentMethods'

export class Footer extends Component {
    render() {
        return (
            <StyledWrapper>
                <div className='footer'>
                    <img src={logo} alt='' className='logo-footer' />

                    <section className='contact'>
                        <div className='contact-option'>
                            <img src={instagram} alt='' />
                            <div className='contact-option-content'>
                                <p>Instagram.com/crochesdaida</p>
                                <p>@crochesdaida</p>
                            </div>
                        </div>

                        <div className='contact-option'>
                            <img src={whatsapp} alt='' />
                            <div className='contact-option-content'>
                                <p>Renata: link1</p>
                                <p>Idamar: link2</p>
                            </div>
                        </div>
                    </section>

                    <section className='others'>
                        <div className='payment'>
                            <span className='footer-span'>Pague com</span>
                            <PaymentMethods />

                            <div className='service'>
                                <span className='footer-span'>Atendimento</span>
                                <div className='service-content'>
                                    <img src={email} alt='' />
                                    <p>crochesdaida@gmail.com</p>
                                </div>
                            </div>

                        </div>
                    </section>

                    <section className='about-store'>
                        <span className='footer-span'>Sobre a loja</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac augue eu lorem fermentum lobortis. Donec ut dui quis sapien facilisis venenatis ac vitae nibh. </p>
                    </section>
                </div>
            </StyledWrapper>
        )
    }
}

const StyledWrapper = styled.div`
.footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;

  margin: .2rem 0;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15) inset;
}

.footer-span {
  color: #860194;
  font-size: 20px;
  font-weight: 500;
}

.logo-footer {
  width: 10%;
  margin: 1rem;
}

.contact {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-option {
  display: flex;
  gap: .5rem;
}

.payment-methods {
  display: flex;
  flex-direction: row;
  gap: .2rem;
}

.service-content {
  display: flex;
  flex-direction: row;
  gap: .2rem;
}

.about-store {
  width: 25%;
}`

export default Footer
