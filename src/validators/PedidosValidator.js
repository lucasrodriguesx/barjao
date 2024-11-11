import * as yup from 'yup';

const PedidosValidator = (pedido) => {
  const schema = yup.object().shape({
    nome: yup
      .string()
      .required('O nome do pedido é obrigatório.')
      .min(3, 'O nome do pedido deve ter pelo menos 3 caracteres.')
      .max(100, 'O nome do pedido não pode ter mais de 100 caracteres.'),
    preco: yup
      .string()
      .required('O preço é obrigatório.')
      .matches(/^R\$\s?\d+(\.\d{2})?$/, 'O preço deve estar no formato R$ 9999.99'),
  });

  try {
    schema.validateSync(pedido, { abortEarly: false }); // Validação síncrona
    return { nome: '', preco: '' }; // Se passar, retorna sem erros
  } catch (error) {
    // Se houver erros, mapeia as mensagens de erro
    const validationErrors = {};
    error.inner.forEach((err) => {
      validationErrors[err.path] = err.message;
    });
    return validationErrors;
  }
};

export default PedidosValidator;
