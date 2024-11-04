import * as Yup from 'yup';

export const validateClient = async (data) => {
    const schema = Yup.object().shape({
        email: Yup.string()
            .email('O e-mail não é válido.')
            .required('O e-mail é obrigatório.'),
        password: Yup.string()
            .min(6, 'A senha deve ter pelo menos 6 caracteres.')
            .required('A senha é obrigatória.'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'As senhas devem corresponder.')
            .when('isLogin', {
                is: false, 
                then: Yup.string().required('É necessário repetir a senha.'),
            }),
        phoneNumber: Yup.string()
            .matches(/^\d{10,15}$/, 'O número de telefone deve conter entre 10 e 15 dígitos.')
            .required('O número de telefone é obrigatório.')
    });

    try {
        await schema.validate(data, { abortEarly: false }); 
        return {};
    } catch (err) {
        const validationErrors = {};
        err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
        });
        return validationErrors;
    }
};
