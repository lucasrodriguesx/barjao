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
      const newClient = { ...values, id: Date.now(), role: 'cliente' };
      setClients(prevClients => [...prevClients, newClient]);
      setSuccessMessage('Cadastro de cliente concluído com sucesso');
      localStorage.setItem('currentClient', JSON.stringify(newClient));
    }

    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const validateClient = async (values) => {
    const errors = {};
    if (!values.username) errors.username = 'Nome de usuário é obrigatório.';
    if (!values.password) errors.password = 'Senha é obrigatória.';
    if (!isLogin && values.password !== values.confirmPassword) errors.confirmPassword = 'As senhas não coincidem.';

    if (!isLogin) {
      if (!values.name) errors.name = 'Nome é obrigatório.';
      if (!values.email) errors.email = 'E-mail é obrigatório.';
      if (!values.phone) errors.phone = 'Telefone é obrigatório.';
      else if (!/^\d{10,11}$/.test(values.phone)) errors.phone = 'Telefone inválido.';
    }
    
    return errors;
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
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
        <h1>{isLogin ? 'Login' : 'Cadastro de Cliente'}</h1>

        <Formik
          initialValues={{
            name: '',
            email: '',
            username: '',
            phone: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              {isLogin ? (
                <>
                  <Field type="text" name="username" placeholder="Nome de Usuário" required />
                  <ErrorMessage name="username" component="div" className="error-message" />
                  <Field type="password" name="password" placeholder="Senha" required />
                  <ErrorMessage name="password" component="div" className="error-message" />
                </>
              ) : (
                <>
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
                  <Field type="password" name="confirmPassword" placeholder="Repetir Senha" required />
                  <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                </>
              )}

              <button type="submit">{isLogin ? 'Entrar' : 'Cadastrar Cliente'}</button>
            </Form>
          )}
        </Formik>

        <div className="links-container">
          <p>
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
            <span onClick={toggleForm} style={{ color: '#FFA500', cursor: 'pointer' }}>
              {isLogin ? 'Cadastre-se' : 'Faça Login'}
            </span>
          </p>
          <div className="additional-links">
            <a href="/registros" className="additional-link">Registros</a> | 
            <a href="/Informacoes" className="additional-link"> Informações</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
