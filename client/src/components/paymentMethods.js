import React, { Component } from 'react'
import visa from '../assets/Visa.png'
import mastercard from '../assets/Mastercard.png'
import maestro from '../assets/Maestro.png'
import elo from '../assets/Elo.png'
import boleto from '../assets/Boleto.png'

export class PaymentMethods extends Component {
  render() {
    return (
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
    )
  }
}

export default PaymentMethods
