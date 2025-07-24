import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'

export default function Sidebar({ active, selectedCategory, setSelectedCategory }) {
    const closeSidebar = () => {
        active(false)
    }

    return (
        <Container sidebar={active}>
            <FaTimes onClick={closeSidebar} />
            <Content>
                <Category
                    onClick={() => setSelectedCategory('all')}
                    selected={selectedCategory === 'all'}
                >
                    Todos
                </Category>
                <Category
                    onClick={() => setSelectedCategory('amigurumi')}
                    selected={selectedCategory === 'amigurumi'}
                >
                    Amigurumis
                </Category>
                <Category
                    onClick={() => setSelectedCategory('others')}
                    selected={selectedCategory === 'others'}
                >
                    Outros Produtos
                </Category>
                <Category selected={false}>Contato</Category>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    background-color: #C514DB;
    position: fixed;
    height: 100%;
    top: 0px;
    left: 0px;
    width: 300px;
    left: ${props => props.sidebar ? '0' : '-100%'};
    animation: showSidebar .4s;

    > svg {
        position: fixed;
        color: white;
        width: 30px;
        height: 30px;
        margin-top: 32px;
        margin-left: 32px;
        cursor: pointer;
    }

    @keyframes showSidebar {
        from {
            opacity: 0;
            width: 0;
        }
        to {
            opacity: 1;
            width: 300px;
        }
    }
`

const Content = styled.div`
    margin-top: 100px;
`

const Category = styled.p`
    font-size: 20px;
    color: white;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    margin: 0 15px 20px;
    background-color: ${({ selected }) =>
        selected ? '#860194' : 'rgba(239, 110, 255, 0.35)'};

    &:hover {
        background-color: #860194;
    }
`
