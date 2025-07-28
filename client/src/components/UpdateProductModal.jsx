import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function UpdateProductModal({ product, closeModal }) {
  const [imageFile, setImageFile] = useState(null)

  const initialValues = {
    name: product.name,
    value: product.value,
    height: product.height,
    width: product.width,
    weight: product.weight,
    description: product.description,
    category: product.category || ''
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

    axios.put(`http://localhost:3001/admin/produto/update/${product.id}`, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((response) => {
        alert('Produto atualizado com sucesso!')
        closeModal();
        window.location.reload()
      })
      .catch((err) => {
        console.error('Erro ao atualizar produto:', err.response?.data || err);
        alert('Erro ao atualizar produto.');
      })
  }

  return (
    <FormContainer>
      <AddProductContainer>
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

            <label>Descrição:</label>
            <ErrorMessage name='description' component='span' />
            <Field
              autocomplete='off'
              id='inputAddProduct'
              name='description'
              placeholder='Adicione uma pequena descrição ao produto'
            />

            <label>Categoria:</label>
            <ErrorMessage name='category' component='span' />
            <Field
              as="select"
              id="category"
              name="category"
              placeholder="Selecione a categoria do produto">
              <option value="">Selecione...</option>
              <option value="amigurumi">Amigurumi</option>
              <option value="others">Outros</option>
            </Field>

            <label>Imagem do produto:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />


            <div className='actions'>
              <button type="submit">Atualizar Produto</button>
              <button onClick={closeModal}>Cancelar</button>
              <Link to='/admin/produtos' className='link'>Ver tabela de produtos já cadastrados</Link>
              <Link to='/' className='link'>Voltar ao catálogo</Link>
            </div>
          </Form>
        </Formik>
      </AddProductContainer>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(128, 128, 128, 0.7);
  position: fixed;
  top: 0;
  left: 0;
`

const AddProductContainer = styled.div`
  width: 60%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(250, 214, 255);
  border-radius: 30px;

  .addProductPage {
    display: flex;
    flex-direction: column;

    margin: 5rem;
    gap: 5px;
  }

  .addProductPage>span {
    font-size: 10px;
    color: red;
  }

  .link {
    text-align: center;
}

  h2 {
      width: 100%;
      text-align: center;
      color: #860194;
  }

  .actions {
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  button {
      width: 50%;
      border: none;
      padding: .5rem 0;
      border-radius: 15px;
      background-color: #C514DB;
      color: #fff;
      margin-top: 1rem;
  }

  button:hover {
      cursor: pointer;
      background-color: #860194;
  }

  input, select {
      border: none;
      border-radius: 10px;
      padding-left: .5rem;
  }

  select {
      background-color: #fff;
  }

  option {
      padding: 10px;
      font-size: 16px;
  }

  @media (max-width: 900px) {
      width: 90%;
  }
`