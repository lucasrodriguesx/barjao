import * as Yup from 'yup';

const PedidosValidador = Yup.object().shape({
  cliente: Yup.string()
    .required('O campo Cliente é obrigatório.')
    .min(3, 'O nome do cliente deve ter pelo menos 3 caracteres.'),
  itens: Yup.string()
    .required('O campo Bebidas é obrigatório.')
    .min(3, 'Por favor, descreva as bebidas.'),
  mesa: Yup.number()
    .required('O campo Mesa é obrigatório.')
    .positive('O número da mesa deve ser um valor positivo.')
    .integer('O número da mesa deve ser um inteiro.'),
  total: Yup.number()
    .required('O campo Preço Total é obrigatório.')
    .positive('O preço total deve ser um valor positivo.')
});
export default PedidosValidador;
