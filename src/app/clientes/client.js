'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '../../context/AuthContext';
import './client.css';

const Client = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [clients, setClients] = useState([]);
  const [currentClient, setCurrentClient] = useState(null);
  const [isClientRegistration, setIsClientRegistration] = useState(true);
  const { login } = useAuth();

  useEffect(() => {
    const storedClients = localStorage.getItem('clients');
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  const handleSubmit = async (values) => {
    const errors = await validateClient(values);
    if (Object.keys(errors).length > 0) {
      setErrorMessage(Object.values(errors).join(' '));
      return;
    }
    setErrorMessage('');

    if (isLogin) {
      const existingClient = clients.find(client => client.username === values.username && client.password === values.password);
      if (existingClient) {
        setSuccessMessage('Login concluído com sucesso');
        localStorage.setItem('currentClient', JSON.stringify(existingClient));
        login(values.username); // Configura o usuário logado
        router.push('/');
      } else {
        setErrorMessage('Nome de usuário ou senha incorretos');
      }
    } else {
      if (currentClient) {
        const updatedClients = clients.map(client =>
          client.id === currentClient.id ? { ...client, ...values } : client
        );
        setClients(updatedClients);
        setCurrentClient(null);
        setSuccessMessage('Cliente atualizado com sucesso');
      } else {
        const newClient = { ...values, id: Date.now(), role: isClientRegistration ? 'cliente' : 'funcionario' };
        setClients(prevClients => [...prevClients, newClient]);
        setSuccessMessage(isClientRegistration ? 'Cadastro de cliente concluído com sucesso' : 'Cadastro de funcionário concluído com sucesso');
        localStorage.setItem('currentClient', JSON.stringify(newClient));
      }
    }

    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const validateClient = async (values) => {
    const errors = {};
    if (!values.name) errors.name = 'Nome é obrigatório.';
    if (!values.email) errors.email = 'E-mail é obrigatório.';
    if (!values.username) errors.username = 'Nome de usuário é obrigatório.';
    if (!values.phone) errors.phone = 'Telefone é obrigatório.';
    else if (!/^\d{10,11}$/.test(values.phone)) errors.phone = 'Telefone inválido.';
    if (!values.password) errors.password = 'Senha é obrigatória.';
    if (!isLogin && values.password !== values.confirmPassword) errors.confirmPassword = 'As senhas não coincidem.';

    if (!isClientRegistration) {
      if (!values.salary) errors.salary = 'Salário é obrigatório.';
      else if (isNaN(values.salary)) errors.salary = 'O salário deve ser um número válido.';
      if (!values.role) errors.role = 'Cargo é obrigatório.';
    }
    return errors;
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setCurrentClient(null);
    setErrorMessage('');
  };

  const toggleRegistrationType = (isClient) => {
    setIsClientRegistration(isClient);
    setErrorMessage('');
  };

  return (
    <div className="main-container">
      <div className="logo-container" onClick={() => router.push('/')}>
        <img src='https://img.icons8.com/?size=100&id=jnZk3TAlyedN&format=png&color=FAB005' alt="Logo do Bar" className="logo" />
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="content-wrapper">
        <h1>{isLogin ? 'Login' : isClientRegistration ? 'Cadastro de Cliente' : 'Cadastro de Funcionário'}</h1>

        <div className="button-container">
          {!isLogin && (
            <>
              <button
                type="button"
                onClick={() => toggleRegistrationType(true)}
                className={isClientRegistration ? 'active' : ''}
              >
                Cadastro de Cliente
              </button>
              <button
                type="button"
                onClick={() => toggleRegistrationType(false)}
                className={!isClientRegistration ? 'active' : ''}
              >
                Cadastro de Funcionário
              </button>
            </>
          )}
        </div>

        <Formik
          initialValues={{
            name: currentClient ? currentClient.name : '',
            email: currentClient ? currentClient.email : '',
            username: currentClient ? currentClient.username : '',
            phone: currentClient ? currentClient.phone : '',
            salary: currentClient ? currentClient.salary : '',
            role: currentClient ? currentClient.role : '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <Field type="text" name="name" placeholder="Nome Completo" required />
              <ErrorMessage name="name" component="div" className="error-message" />

              <Field type="email" name="email" placeholder="E-mail" required />
              <ErrorMessage name="email" component="div" className="error-message" />

              <Field type="text" name="username" placeholder="Nome de Usuário" required />
              <ErrorMessage name="username" component="div" className="error-message" />

              <Field type="text" name="phone" placeholder="Telefone" required />
              <ErrorMessage name="phone" component="div" className="error-message" />

              <Field type="password" name="password" placeholder="Senha" required />
              <ErrorMessage name="password" component="div" className="error-message" />

              {!isLogin && (
                <>
                  <Field type="password" name="confirmPassword" placeholder="Repetir Senha" required />
                  <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                </>
              )}

              {!isClientRegistration && (
                <>
                  <Field type="number" name="salary" placeholder="Salário" required />
                  <ErrorMessage name="salary" component="div" className="error-message" />

                  <Field as="select" name="role" required>
                    <option value="">Selecione o Cargo</option>
                    <option value="gerente">Gerente</option>
                    <option value="funcionario">Funcionário</option>
                  </Field>
                  <ErrorMessage name="role" component="div" className="error-message" />
                </>
              )}

              <button type="submit">
                {isLogin ? 'Entrar' : currentClient ? 'Atualizar' : isClientRegistration ? 'Cadastrar Cliente' : 'Cadastrar Funcionário'}
              </button>
            </Form>
          )}
        </Formik>

        <p>
          {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
          <span onClick={toggleForm} style={{ color: '#FFA500', cursor: 'pointer' }}>
            {isLogin ? 'Cadastre-se' : 'Faça Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Client;
