import React from 'react'
import NavSup from '../components/navSup'
import NavInf from '../components/navInf'

function Home() {
    return (
        <div className='home'>
            <div>
            <NavSup />
            <NavInf />
            </div>
        </div >
    )
}

export default Home