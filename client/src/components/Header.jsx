import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Sidebar from './Sidebar'
import styled from 'styled-components';

export default function Header({ selectedCategory, setSelectedCategory }) {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const logo = '/logoRetangular.svg'

    return (
        <Container>
            <FaBars onClick={showSidebar} />
            <img src = {logo} alt='logo' />
            {sidebar && <Sidebar active={setSidebar} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />}
        </Container>
    )
}

const Container = styled.div`
    position: fixed; 
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background-color: #C514DB;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99; 

    > svg {
        position: absolute;
        left: 32px;
        top: 50%;
        transform: translateY(-50%);
        color: white;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }

    > img {
        height: 80px; 
    }

    @media (max-width: 480px) {
        > img {
            height: 60px;
        }
    }
`;
