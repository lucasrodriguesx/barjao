import * as Yup from 'yup';


const MesaValidador = Yup.object().shape({
  title: Yup.string()
    .required('O nome da mesa é obrigatório')
    .min(3, 'O nome da mesa deve ter pelo menos 3 caracteres'),
  valor: Yup.number()
    .required('O valor é obrigatório')
    .positive('O valor deve ser um número positivo'),
});

export default MesaValidador;
