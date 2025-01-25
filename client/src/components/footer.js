import React, { Component } from 'react'
import logo from '../assets/Logo.png'
import instagram from '../assets/instagram.png'
import whatsapp from '../assets/whatsapp.png'
import email from '../assets/email.png'
import PaymentMethods from './paymentMethods'

export class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <img src={logo} alt='' className='logo-footer'/>

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
    )
  }
}

export default Footer
