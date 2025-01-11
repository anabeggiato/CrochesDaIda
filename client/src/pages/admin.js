import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link } from 'react-router-dom'

function AddProduct() {

    const initialValues = {
        name: '',
        value: '',
        height: '',
        available: '',
        description: ''
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(30, 'O nome precisa ter no máximo 30 caracteres!').required("O campo de nome precisa ser preenchido!"),
        value: Yup.number().required('O valor do produto precisa ser preenchido!'),
        height: Yup.number(),
        available: Yup.bool(),
        description: Yup.string().max(200, 'A descrição precisa ter no máximo 200 caracteres!')
    })

    const onsubmit = (data) => {
        axios.post('http://localhost:3001/admin', data).then((response) => {
            alert('Produto adicionado com sucesso!')
            window.location.reload();
        })
    }

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onsubmit} validationSchema={validationSchema}>
                <Form className='addProductPage'>
                    <label>Nome do produto:</label>
                    <ErrorMessage name='name' component='span' />
                    <Field
                        autocomplete='off'
                        id='inputAddProduct'
                        name='name'
                        placeholder='Digite o nome do produto que deseja cadastrar'
                    />

                    <label>Valor do produto: R$</label>
                    <ErrorMessage name='value' component='span' />
                    <Field
                        autocomplete='off'
                        id='inputAddProduct'
                        name='value'
                        type='number'
                        placeholder='Digite aqui o valor do produto que deseja cadastrar'
                    />

                    <label>Tamanho do produto:</label>
                    <ErrorMessage name='height' component='span' />
                    <Field
                        autocomplete='off'
                        id='inputAddProduct'
                        name='height'
                        placeholder='Digite aqui o tamanho (em cm) do produto que deseja cadastrar'
                    />

                    <label>Disponibilidade:</label>
                    <ErrorMessage name='available' component='span' />
                    <Field
                        autocomplete='off'
                        id='inputAddProduct'
                        name='available'
                        placeholder='digite ´true´ para disponivel e ´false´ para indisponível'
                    />

                    <label>Descrição:</label>
                    <ErrorMessage name='description' component='span' />
                    <Field
                        autocomplete='off'
                        id='inputAddProduct'
                        name='description'
                        placeholder='Adicione uma pequena descrição ao produto'
                    />

                    <button type="submit">Cadastrar Produto</button>
                    <Link to='/produtos' className='link'>Ver produtos já cadastrados</Link>
                </Form>

                
            </Formik>
        </div>
    )
}

export default AddProduct