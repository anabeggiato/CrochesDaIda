import React from 'react'
import NavSup from '../components/navSup'
import NavInf from '../components/navInf'
import us from '../assets/us.png'
import reviewer from '../assets/reviewer.png'
import Footer from '../components/footer'

function Home() {
    const nomeFeira = 'Mãos e mentes Paulistanas'
    const data = '00/00/0000'
    const horario = '10h - 17h'
    const localizacao = 'Parque do cordeiro'
    const reviewerName = 'Fulano de tal'

    return (
        <div className='home'>
            <NavSup />
            <NavInf />
            <section className='hero' >
                <div className='about-us'>
                    <h2>Quem somos nós?</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac augue eu lorem fermentum lobortis. Donec ut dui quis sapien facilisis venenatis ac vitae nibh. In eget mauris imperdiet nisi sollicitudin congue. Nunc tristique lorem et odio imperdiet congue. Nunc aliquet leo id purus mattis, non tempor purus bibendum. Aliquam at mauris sed tortor facilisis lobortis eu eu sapien. Vestibulum quam lectus, porta mollis ornare ac, lobortis at lectus.</p>
                </div>
                <div className='us'>
                    <img src={us} alt='' />
                </div>
            </section>

            <section className='events'>
                <div className='event-card'>
                    <div className='event-image'></div>
                    <div className='event-infos'>
                        <h2>{nomeFeira}</h2>
                        <p>Data: {data} </p>
                        <p>Horário: {horario} </p>
                        <p>Localização: {localizacao} </p>
                    </div>
                </div>

                <div className='event-card'>
                    <div className='event-image'></div>
                    <div className='event-infos'>
                        <h2>{nomeFeira}</h2>
                        <p>Data: {data} </p>
                        <p>Horário: {horario} </p>
                        <p>Localização: {localizacao} </p>
                    </div>
                </div>

                <div className='event-card'>
                    <div className='event-image'></div>
                    <div className='event-infos'>
                        <h2>{nomeFeira}</h2>
                        <p>Data: {data} </p>
                        <p>Horário: {horario} </p>
                        <p>Localização: {localizacao} </p>
                    </div>
                </div>

                <div className='event-card'>
                    <div className='event-image'></div>
                    <div className='event-infos'>
                        <h2>{nomeFeira}</h2>
                        <p>Data: {data} </p>
                        <p>Horário: {horario} </p>
                        <p>Localização: {localizacao} </p>
                    </div>
                </div>

                <div className='event-card'>
                    <div className='event-image'></div>
                    <div className='event-infos'>
                        <h2>{nomeFeira}</h2>
                        <p>Data: {data} </p>
                        <p>Horário: {horario} </p>
                        <p>Localização: {localizacao} </p>
                    </div>
                </div>
            </section>

            <section className='reviews'>
                <div className='review-card'>
                    <div className='reviewer-image'>
                        <img src={reviewer} alt='' width='90%'/>
                    </div>
                    <div className='review-content'>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac augue eu lorem fermentum lobortis. Donec ut dui quis sapien facilisis venenatis ac vitae nibh. In eget mauris imperdiet nisi sollicitudin congue."</p>
                        <p>{reviewerName}</p>
                    </div>
                </div>

                <div className='review-card'>
                    <div className='reviewer-image'>
                        <img src={reviewer} alt='' width='90%'/>
                    </div>
                    <div className='review-content'>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac augue eu lorem fermentum lobortis. Donec ut dui quis sapien facilisis venenatis ac vitae nibh. In eget mauris imperdiet nisi sollicitudin congue."</p>
                        <p>{reviewerName}</p>
                    </div>
                </div>

                <div className='review-card'>
                    <div className='reviewer-image'>
                        <img src={reviewer} alt='' width='90%'/>
                    </div>
                    <div className='review-content'>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac augue eu lorem fermentum lobortis. Donec ut dui quis sapien facilisis venenatis ac vitae nibh. In eget mauris imperdiet nisi sollicitudin congue."</p>
                        <p>{reviewerName}</p>
                    </div>
                </div>

                <div className='review-card'>
                    <div className='reviewer-image'>
                        <img src={reviewer} alt='' width='90%'/>
                    </div>
                    <div className='review-content'>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac augue eu lorem fermentum lobortis. Donec ut dui quis sapien facilisis venenatis ac vitae nibh. In eget mauris imperdiet nisi sollicitudin congue."</p>
                        <p>{reviewerName}</p>
                    </div>
                </div>
            </section>

            <Footer />

        </div >
    )
}

export default Home