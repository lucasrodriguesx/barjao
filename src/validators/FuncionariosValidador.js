import * as Yup from 'yup';

const FuncionariosValidador = Yup.object().shape({
  nome: Yup.string()
    .required('O campo Nome é obrigatório.')
    .min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  cargo: Yup.string()
    .required('O campo Cargo é obrigatório.')
    .min(2, 'O cargo deve ter pelo menos 2 caracteres.'),
  salario: Yup.number()
    .required('O campo Salário é obrigatório.')
    .positive('O salário deve ser um valor positivo.')
});

export default FuncionariosValidador;
