import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(30, 'O nome precisa ter no máximo 30 caracteres!')
    .required('O campo de nome precisa ser preenchido!'),
  value: Yup.number().required('O valor do produto precisa ser preenchido!'),
  height: Yup.number(),
  width: Yup.number(),
  weight: Yup.number(),
  available: Yup.bool(),
  description: Yup.string().max(
    200,
    'A descrição precisa ter no máximo 200 caracteres!'
  ),
});

export default function ProductForm({
  initialValues,
  title,
  submitLabel,
  onSubmit,
  onImageChange,
  secondaryAction,
}) {
  return (
    <FormCard>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, helpers) => onSubmit(values, helpers)}
        validationSchema={validationSchema}
      >
        <Form className="productForm">
          <h2>{title}</h2>

          <label>Nome do produto:</label>
          <ErrorMessage name="name" component="span" />
          <Field
            autoComplete="off"
            id="inputAddProduct"
            name="name"
            placeholder="Digite o nome do produto que deseja cadastrar"
          />

          <label>Valor do produto: R$</label>
          <ErrorMessage name="value" component="span" />
          <Field
            autoComplete="off"
            id="inputAddProduct"
            name="value"
            type="number"
            placeholder="Digite aqui o valor do produto que deseja cadastrar"
          />

          <label>Altura do produto:</label>
          <ErrorMessage name="height" component="span" />
          <Field
            autoComplete="off"
            id="inputAddProduct"
            name="height"
            placeholder="Digite aqui a altura (em cm) do produto que deseja cadastrar"
          />

          <label>Largura do produto:</label>
          <ErrorMessage name="width" component="span" />
          <Field
            autoComplete="off"
            id="inputAddProduct"
            name="width"
            placeholder="Digite aqui a largura (em cm) do produto que deseja cadastrar"
          />

          <label>Peso do produto:</label>
          <ErrorMessage name="weight" component="span" />
          <Field
            autoComplete="off"
            id="inputAddProduct"
            name="weight"
            placeholder="Digite aqui o peso (em g) do produto que deseja cadastrar"
          />

          <label>Descrição:</label>
          <ErrorMessage name="description" component="span" />
          <Field
            autoComplete="off"
            id="inputAddProduct"
            name="description"
            placeholder="Adicione uma pequena descrição ao produto"
          />

          <label>Categoria:</label>
          <ErrorMessage name="category" component="span" />
          <Field
            as="select"
            id="category"
            name="category"
            placeholder="Selecione a categoria do produto"
          >
            <option value="">Selecione...</option>
            <option value="amigurumi">Amigurumi</option>
            <option value="others">Outros</option>
          </Field>

          <label>Imagem do produto:</label>
          <input type="file" accept="image/*" onChange={onImageChange} />

          <div className="actions">
            <button type="submit">{submitLabel}</button>
            {secondaryAction}
            <Link to="/admin/produtos" className="link">
              Ver tabela de produtos já cadastrados
            </Link>
            <Link to="/" className="link">
              Voltar ao catálogo
            </Link>
          </div>
        </Form>
      </Formik>
    </FormCard>
  );
}

const FormCard = styled.div`
  width: 60%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(250, 214, 255);
  border-radius: 30px;

  .productForm {
    display: flex;
    flex-direction: column;
    margin: 5rem;
    gap: 5px;
  }

  .productForm > span {
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
    padding: 0.5rem 0;
    border-radius: 15px;
    background-color: #c514db;
    color: #fff;
    margin-top: 1rem;
  }

  button:hover {
    cursor: pointer;
    background-color: #860194;
  }

  input,
  select {
    border: none;
    border-radius: 10px;
    padding-left: 0.5rem;
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
`;
