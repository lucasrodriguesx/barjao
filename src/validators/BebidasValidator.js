import * as Yup from 'yup';

const BebidasValidador = Yup.object().shape({
  nome: Yup.string().required('Nome é obrigatório'),
  tipo: Yup.string().required('Tipo é obrigatório'),
  preco: Yup.string()
    .required('Preço é obrigatório')
    // Valida o formato do valor, incluindo o símbolo 'R$' e a vírgula para centavos
    .matches(/^R\$\s\d{1,4},\d{2}$/, 'Formato do preço deve ser R$ 9999,99'),
  descricao: Yup.string().required('Descrição é obrigatória'),
  imagem: Yup.string().url('URL inválida').required('URL da imagem é obrigatória'),
});

export default BebidasValidador;
