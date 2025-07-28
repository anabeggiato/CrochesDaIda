import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { MdOutlineEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";
import UpdateProductModal from '../components/UpdateProductModal';
import DeleteProductModal from '../components/DeleteProductModal';

const menuItemStyle = {
};



export default function AdminProducts() {
    const [listOfProducts, setListOfProducts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState();
    const [confirmDeletion, setConfirmDeletion] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showFilter, setShowFilter] = useState(false);
    const filterRef = useRef(null)

    const handleEditPopup = (id) => {
        const product = listOfProducts.find(product => product.id === id);
        setSelectedProduct(product);
        setShowPopup(true);
    }

    const closeModal = () => {
        setShowPopup(false);
    }

    const handleDeletePopup = (id) => {
        const product = listOfProducts.find(product => product.id === id);
        setSelectedProduct(product);
        setConfirmDeletion(true);
    }


    const closeConfirmDeletion = () => {
        setConfirmDeletion(false);
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/`)
            .then((response) => {
                console.log('Resposta da API:', response.data)
                setListOfProducts(response.data.sort((a, b) => a.name.localeCompare(b.name)))
            })
            .catch(err => {
                console.error('Erro ao buscar produtos:', err)
            })
    }, [])

    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilter(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <TablePage>

            <Link to='/admin' className='link'>Voltar</Link>
            <table>
                <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Altura</th>
                    <th>Largura</th>
                    <th>Peso</th>
                    <th ref={filterRef} style={{ position: 'relative' }}>
                        Categoria <IoFilter onClick={() => setShowFilter(prev => !prev)} style={{ cursor: 'pointer' }} />

                        {showFilter && (
                            <FilterDropdown>
                                <FilterOption onClick={() => { setSelectedCategory('all'); setShowFilter(false); }}>Todos</FilterOption>
                                <FilterOption onClick={() => { setSelectedCategory('amigurumi'); setShowFilter(false); }}>Amigurumi</FilterOption>
                                <FilterOption onClick={() => { setSelectedCategory('others'); setShowFilter(false); }}>Outros</FilterOption>
                            </FilterDropdown>
                        )}
                    </th>

                    <th></th>
                    <th></th>
                </tr>
                {listOfProducts
                    .filter(product => {
                        if (selectedCategory === 'all') return true;
                        if (selectedCategory === 'amigurumi') return product.category === 'amigurumi';
                        else return product.category === 'others';
                    })
                    .map((value, key) => (
                        <tr key={key}>
                            <td className='content'>{value.name}</td>
                            <td className='content'>R${value.value},00</td>
                            <td className='content'>{value.height}cm</td>
                            <td className='content'>{value.width}cm</td>
                            <td className='content'>{value.weight}g</td>
                            <td className='content'>{value.category}</td>
                            <td><MdOutlineEdit onClick={() => handleEditPopup(value.id)} /></td>
                            <td><BsTrash onClick={() => handleDeletePopup(value.id)} /></td>
                        </tr>
                    ))}

                {showPopup && <UpdateProductModal product={selectedProduct} closeModal={closeModal} />}
                {confirmDeletion && <DeleteProductModal product={selectedProduct} closeModal={closeConfirmDeletion} />}
            </table>
        </TablePage>
    )
}


const TablePage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem 0;
    text-align: right;

    svg:hover {
        cursor: pointer;
    }

    table {
        border-collapse: collapse;
        text-align: left;
        width: 80%;
    }

    th, td {
        padding: 1rem;
    }

    th {
        background-color: rgba(239, 110, 255, 0.30);
        font-weight: 600;
    }

    tr:nth-child(even) td {
        background-color: rgba(239, 110, 255, 0.10);


    tr:nth-child(odd) td {
        background-color: transparent;
    }

    td.content {
        font-weight: 200;
        border-bottom: 1px solid #ccc;
    }

`;

const FilterDropdown = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
    z-index: 5;
`;

const FilterOption = styled.div`
    padding: 8px 12px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
    white-space: nowrap;

    &:hover {
    background-color: #f1f1f1;
    }
`;


