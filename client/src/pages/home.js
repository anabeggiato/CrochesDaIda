import React from 'react'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { format } from 'date-fns';

import NavSup from '../components/navSup'
import NavInf from '../components/navInf'
import Footer from '../components/footer'

import us from '../assets/us.png'
import reviewer from '../assets/reviewer.png'
import arrow from '../assets/Arrow.png'


function Home() {
    const [listOfEvents, setListOfevents] = useState([]);
    const reviewerName = 'Fulano de tal'
    const carroussel = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then((response) => {
                const formatedEvents = response.data.map(evento => ({
                    ...evento,
                    date: format(new Date(evento.date), 'dd/MM/yyyy') // Formata a data para 'dd/MM/yyyy'
                }));
                setListOfevents(formatedEvents);
            })
            .catch((error) => {
                console.error("Erro ao buscar os eventos: ", error);
            });
    }, []);


    const handleLeftClick = (e) => {
        e.preventDefault();
        console.log(carroussel.current.offsetWidth);
        carroussel.current.scrollLeft -= carroussel.current.offsetWidth
    }

    const handleRightClick = (e) => {
        e.preventDefault();
        console.log(carroussel.current.offsetWidth);
        carroussel.current.scrollLeft += carroussel.current.offsetWidth
    }

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

            <section className='events-carroussel' ref={carroussel}>
                {listOfEvents.map((value, key) => {
                    return <div className='event-card'>
                        <div className='event-image'></div>
                        <div className='event-infos'>
                            <h2>{value.name}</h2>
                            <p>Data: {value.date} </p>
                            <p>Horário: {value.startTime}h - {value.endTime}h </p>
                            <p>Localização: {value.location} </p>
                        </div>
                    </div>
                })}
            </section>

            <div className='buttons'>
                <button> <img src={arrow} alt='left arrow' onClick={handleLeftClick} /></button>
                <button> <img src={arrow} alt='right arrow' onClick={handleRightClick} /></button>
            </div>

            <section className='reviews'>
                <div className='review-card'>
                    <div className='reviewer-image'>
                        <img src={reviewer} alt='' width='90%' />
                    </div>
                    <div className='review-content'>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac augue eu lorem fermentum lobortis. Donec ut dui quis sapien facilisis venenatis ac vitae nibh. In eget mauris imperdiet nisi sollicitudin congue."</p>
                        <p>{reviewerName}</p>
                    </div>
                </div>

                <div className='review-card'>
                    <div className='reviewer-image'>
                        <img src={reviewer} alt='' width='90%' />
                    </div>
                    <div className='review-content'>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac augue eu lorem fermentum lobortis. Donec ut dui quis sapien facilisis venenatis ac vitae nibh. In eget mauris imperdiet nisi sollicitudin congue."</p>
                        <p>{reviewerName}</p>
                    </div>
                </div>

                <div className='review-card'>
                    <div className='reviewer-image'>
                        <img src={reviewer} alt='' width='90%' />
                    </div>
                    <div className='review-content'>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac augue eu lorem fermentum lobortis. Donec ut dui quis sapien facilisis venenatis ac vitae nibh. In eget mauris imperdiet nisi sollicitudin congue."</p>
                        <p>{reviewerName}</p>
                    </div>
                </div>

                <div className='review-card'>
                    <div className='reviewer-image'>
                        <img src={reviewer} alt='' width='90%' />
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