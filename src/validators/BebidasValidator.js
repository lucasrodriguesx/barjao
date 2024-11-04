import * as yup from 'yup';

const schema = yup.object().shape({
  nome: yup.string().required("O nome da bebida é obrigatório."),
  descricao: yup.string().required("A descrição da bebida é obrigatória."),
  imagem: yup.string().url("A URL da imagem deve ser um URL válido.").required("A URL da imagem é obrigatória."),
});

const BebidasValidator = {
  validate(bebida) {
    return schema.validate(bebida, { abortEarly: false }) 
      .then(() => null)
      .catch(err => {
        return err.errors.join(", ");
      });
  },
};

export default BebidasValidator;
