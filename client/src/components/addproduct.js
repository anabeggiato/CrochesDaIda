import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link } from 'react-router-dom'

function AddProduct() {

    const [imageFile, setImageFile] = useState(null)

    const initialValues = {
        name: '',
        value: '',
        height: '',
        width: '',
        weight: '',
        available: '',
        description: ''
    }

    const handleImageChange = (event) => {
        setImageFile(event.currentTarget.files[0]);
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(30, 'O nome precisa ter no máximo 30 caracteres!').required("O campo de nome precisa ser preenchido!"),
        value: Yup.number().required('O valor do produto precisa ser preenchido!'),
        height: Yup.number(),
        width: Yup.number(),
        weight: Yup.number(),
        available: Yup.bool(),
        description: Yup.string().max(200, 'A descrição precisa ter no máximo 200 caracteres!')
    })

    const onsubmit = (values) => {
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }
        if (imageFile) {
            formData.append('image', imageFile);
        }

        axios.post(`${process.env.REACT_APP_API_URL}/produtos`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                alert('Produto adicionado com sucesso!')
                window.location.reload();
            })
            .catch((err) => {
                console.error('Erro ao adicionar produto:', err)
            })
    }

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onsubmit} validationSchema={validationSchema}>
                <Form className='addProductPage'>
                    <h2> Adição de novos produtos</h2>
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

                    <label>Altura do produto:</label>
                    <ErrorMessage name='height' component='span' />
                    <Field
                        autocomplete='off'
                        id='inputAddProduct'
                        name='height'
                        placeholder='Digite aqui a altura (em cm) do produto que deseja cadastrar'
                    />

                    <label>Largura do produto:</label>
                    <ErrorMessage name='width' component='span' />
                    <Field
                        autocomplete='off'
                        id='inputAddProduct'
                        name='width'
                        placeholder='Digite aqui a largura (em cm) do produto que deseja cadastrar'
                    />

                    <label>Peso do produto:</label>
                    <ErrorMessage name='weight' component='span' />
                    <Field
                        autocomplete='off'
                        id='inputAddProduct'
                        name='weight'
                        placeholder='Digite aqui o peso (em g) do produto que deseja cadastrar'
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

                    <label>Imagem do produto:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />


                    <button type="submit">Cadastrar Produto</button>
                    <Link to='/' className='link'>Ver produtos já cadastrados</Link>
                </Form>


            </Formik>
        </div>
    )
}

export default AddProduct