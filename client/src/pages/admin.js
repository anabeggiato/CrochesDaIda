import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

function AddProduct() {

    const initialValues = {
        name: '',
        value: '',
        height: '',
        available: '',
        description: ''
    }

    const onsubmit = (data) => {
        axios.post('http://localhost:3001/admin', data).then((response) => {
            alert('Produto adicionado com sucesso!')
        })
    }

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onsubmit}>
                <Form className='addProductPage'>
                    <label>Nome do produto:</label>
                    <Field
                        autocomplete='off'
                        id='inputAddProduct'
                        name='name'
                        placeholder='Digite o nome do produto que deseja cadastrar'
                    />

                    <label>Valor do produto: R$</label>
                    <Field
                        id='inputAddProduct'
                        name='value'
                        type='number'
                        placeholder='Digite aqui o valor do produto que deseja cadastrar'
                    />

                    <label>Tamanho do produto:</label>
                    <Field
                        id='inputAddProduct'
                        name='height'
                        placeholder='Digite aqui o tamanho (em cm) do produto que deseja cadastrar'
                    />

                    <label>Disponibilidade:</label>
                    <Field
                        id='inputAddProduct'
                        name='available'
                        placeholder='digite ´true´ para disponivel e ´false´ para indisponível'
                    />

                    <label>Descrição:</label>
                    <Field
                        id='inputAddProduct'
                        name='description'
                        placeholder='Adicione uma pequena descrição ao produto'
                    />

                    <button type="submit">Cadastrar Produto</button>
                </Form>


            </Formik>
        </div>
    )
}

export default AddProduct