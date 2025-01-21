import React from 'react'
import logo from '../assets/Logo.png'
import search from '../assets/search.png'
import cart from '../assets/cart.png'
import profile from '../assets/defaultProfile.png'

function NavSup() {
    const itens = 0
    const valor = 0

    return (
        <div>
            <nav className='navbar-top'>
                <a href='/'>
                    <img src={logo} alt='' width='40%' href='/' />
                </a>

                <div className='search-section'>
                    <img src={search} alt='' width='20%' />
                    <input placeholder='Buscar no site...' />
                </div>

                <div className='cart-section'>
                    <img src={cart} alt='' width='45%' />
                    <div className='infos-cart-section'>
                        <p>{itens} itens</p>
                        <p>R${valor},00</p>
                    </div>
                </div>

                <div className='profile-section'>
                    <img src={profile} alt='' width='20%' />
                    <div className='infos-profile-section'>
                        <span>Olá, seja bem-vindo(a)!</span>
                        <p>Faça login ou cadastre-se</p>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavSup

