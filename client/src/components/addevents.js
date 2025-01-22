import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link } from 'react-router-dom'

function AddEvent() {

    const initialValues = {
        name: '',
        date: '',
        startTime: 0,
        endtime: 0,
        location: ''
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(25, 'O nome precisa ter no máximo 25 caracteres!').required("O campo de nome precisa ser preenchido!"),
        date: Yup.date().required('A data do evento precisa ser preenchida!'),
        startTime: Yup.number().required('O horário de início do evento precisa ser preenchido!'),
        endTime: Yup.number().required('O horário de término do evento precisa ser preenchido!'),
        location: Yup.string().max(40, 'O endereço precisa ter no máximo 40 caracteres!').required('O local do evento precisa ser preenchido!')
    })

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/admin/eventos', data).then((response) => {
            alert('Evento cadastrado com sucesso!')
            window.location.reload();
        })
    }

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='addProductPage'>
                    <h2> Adição de novos Eventos</h2>
                    <label>Nome do evento:</label>
                    <ErrorMessage name='name' component='span' />
                    <Field
                        autocomplete='off'
                        id='inputAddProduct'
                        name='name'
                        placeholder='Digite o nome do evento que deseja cadastrar'
                    />

                    <label>Data do evento:</label>
                    <ErrorMessage name='date' component='span' />
                    <Field
                        autocomplete='off'
                        id='inputAddProduct'
                        name='date'
                        type='date'
                        placeholder='Digite aqui a data do evento no formato mm/dd/aaaa'
                    />

                    <label>Horário de início do evento:</label>
                    <ErrorMessage name='startTime' component='span' />
                    <Field
                        autocomplete='off'
                        id='inputAddProduct'
                        name='startTime'
                        type='number'
                        placeholder='Digite aqui o horário de início do evento'
                    />

                    <label>Horário de término do evento:</label>
                    <ErrorMessage name='endTime' component='span' />
                    <Field
                        autocomplete='off'
                        id='inputAddProduct'
                        name='endTime'
                        type='number'
                        placeholder='Digite aqui o horário de término do evento'
                    />

                    <label>Local do evento:</label>
                    <ErrorMessage name='location' component='span' />
                    <Field
                        autocomplete='off'
                        id='inputAddProduct'
                        name='location'
                        placeholder='Digite aqui o local do evento'
                    />

                    <button type="submit">Cadastrar Evento</button>
                    <Link to='/' className='link'>Ver eventos já cadastrados</Link>
                </Form>


            </Formik>
        </div>
    )
}

export default AddEvent