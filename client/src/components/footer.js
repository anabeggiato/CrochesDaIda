import React, { Component } from 'react'
import logo from '../assets/Logo.png'
import instagram from '../assets/instagram.png'
import whatsapp from '../assets/whatsapp.png'
import visa from '../assets/Visa.png'
import mastercard from '../assets/Mastercard.png'
import maestro from '../assets/Maestro.png'
import elo from '../assets/Elo.png'
import boleto from '../assets/Boleto.png'
import email from '../assets/email.png'

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
                <div className='payment-methods'>
                    <div className='payment-method'>
                        <img src={visa} alt='' />
                    </div>

                    <div className='payment-method'>
                        <img src={mastercard} alt='' />
                    </div>

                    <div className='payment-method'>
                        <img src={maestro} alt='' />
                    </div>

                    <div className='payment-method'>
                        <img src={elo} alt='' />
                    </div>

                    <div className='payment-method'>
                        <img src={boleto} alt='' />
                    </div>
                </div>

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
