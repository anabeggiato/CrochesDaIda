import React from 'react'
import styled from 'styled-components'
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
        <StyledWrapper>
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

        </StyledWrapper >
    )
}

const StyledWrapper = styled.div`
.hero {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  margin: 5vh 4vw;
}

.about-us {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about-us>h2 {
  color: #000;
  text-align: center;
  font-weight: 700;
}

.about-us>p {
  width: 85%;

  color: #000;
  font-weight: 400;
}

.us {
  width: 50%;
  display: flex;
  justify-content: center;
}

.us>img {
  width: 80%;
  border-radius: 2rem;
}

.events-carroussel {
  display: flex;
  padding: 2.5rem 2.5rem .5rem 2.5rem;

  overflow-x: auto;
  scroll-behavior: smooth;

  background-color: #C514DB;
  gap: .8rem
}

.events-carroussel::-webkit-scrollbar {
  display: none;
}


.buttons {
  width: 100%;
  background-color: #C514DB;
  text-align: center;
  padding-bottom: 1.5rem;
}

.buttons img {
  width: 150%;
}

.buttons button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.buttons button:first-child img {
  transform: rotate(180deg);
}


.event-card {
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #ffff;

  width: 16vw;
  height: 46vh;
  border-radius: 1.25rem;
  flex: none;

  gap: .5rem;
  padding-bottom: .5rem;
  margin-bottom: .1rem;
}

/* .event-card:hover {
  width: 17vw;
  height: 47vh;
} */

.event-image {
  background-color: #bebebe;

  width: 90%;
  height: 70%;
  border-radius: 1.25rem;

  margin-top: 2vh;
}

.event-infos {
  display: flex;
  flex-direction: column;
  gap: .3rem;

  height: 40%;
}

.event-infos>h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;

  padding: 0 .5rem .3rem .5rem;
}

.event-infos>p {
  color: #000;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;

  padding: 0 .5rem;
}

.reviews {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  padding: 2.5rem 1rem;
  gap: .8rem;
}

.review-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 40%;
  background-color: #E084EC;

  border-radius: 2rem;
  padding: .5rem;
}

.reviewer-image {
  width: 25%;
}

.review-content {
  width: 90%;
}

.review-content>p {
  color: #000;
  text-align: center;
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
  padding: .2rem 0;
}`

export default Home