'use client'

import React, { useState, useEffect } from 'react';
import { FiAlignJustify, FiUser } from "react-icons/fi";
import { LiaChairSolid } from "react-icons/lia";
import { BiDrink } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import './client.css';
import { useRouter } from 'next/navigation';
import { mask } from 'remask'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Client = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [clients, setClients] = useState([]);
  const [currentClient, setCurrentClient] = useState(null);

  useEffect(() => {
    const storedClients = localStorage.getItem('clients');
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setCurrentClient(null);
    setErrorMessage('');
  };

  const handleSubmit = async (values) => {
    const errors = await validateClient(values);
    if (Object.keys(errors).length > 0) {
      setErrorMessage(Object.values(errors).join(' '));
      return;
    }
    setErrorMessage('');

    if (isLogin) {
      const existingClient = clients.find(client => client.email === values.email && client.password === values.password);
      if (existingClient) {
        setSuccessMessage('Login concluído com sucesso');
      } else {
        setErrorMessage('E-mail ou senha incorretos');
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
        const newClient = { ...values, id: Date.now() };
        setClients(prevClients => [...prevClients, newClient]);
        setSuccessMessage('Cadastro concluído com sucesso');
      }
    }
    
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const validateClient = async (values) => {
    const errors = {};

  
    const phoneNumber = values.phoneNumber.replace(/\D/g, ''); 
    if (phoneNumber.length < 10 || phoneNumber.length > 15) {
      errors.phoneNumber = 'O número de telefone deve conter entre 10 e 15 dígitos.';
    }

 
    if (!values.email) {
      errors.email = 'E-mail é obrigatório.';
    }
    if (!values.password) {
      errors.password = 'Senha é obrigatória.';
    }
    if (!isLogin && values.password !== values.confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem.';
    }

    return errors;
  };

  const handleEdit = (client) => {
    setCurrentClient(client);
    setIsLogin(false);
  };

  const handleDelete = (id) => {
    const updatedClients = clients.filter(client => client.id !== id);
    setClients(updatedClients);
    setSuccessMessage('Cliente excluído com sucesso');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="main-container">
      <FiAlignJustify className="menu-toggle-icon" onClick={toggleMenu} />

      {showMenu && (
        <div className="vertical-menu">
          <ul>
            <li title="Login" onClick={() => router.push('../clientes')}>
              <FiUser className="menu-icon-item" />
            </li>
            <li title="Reserve a sua Mesa" onClick={() => router.push('../mesas')}>
              <LiaChairSolid className="menu-icon-item" />
            </li>
            <li title="Bebidas" onClick={() => router.push('../bebidas')}>
              <BiDrink className="menu-icon-item" />
            </li>
            <li title="Pedido" onClick={() => router.push('../pedidos')}>
              <FaShoppingCart className="menu-icon-item" />
            </li>
            <li title="Funcionarios"onClick={() => router.push('../funcionarios')} >
              <AiOutlineTeam className="menu-icon-item" />
            </li>
          </ul>
        </div>
      )}

      <div className="logo-container" onClick={() => router.push('/')}>
        <img src='https://img.icons8.com/?size=100&id=jnZk3TAlyedN&format=png&color=FAB005' alt="Logo do Bar" className="logo" />
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="content-wrapper">
        <h1>{isLogin ? 'Login' : 'Cadastro'}</h1>
        <Formik
          initialValues={{
            email: currentClient ? currentClient.email : '',
            password: '',
            confirmPassword: '',
            phoneNumber: currentClient ? currentClient.phoneNumber : ''
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Field type="email" name="email" placeholder="E-mail" required />
              <ErrorMessage name="email" component="div" className="error-message" />
              <Field type="password" name="password" placeholder="Senha" required />
              <ErrorMessage name="password" component="div" className="error-message" />
              {!isLogin && (
                <>
                  <Field type="password" name="confirmPassword" placeholder="Repetir Senha" required />
                  <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                  <Field 
                    type="text" 
                    name="phoneNumber" 
                    placeholder="Número de Telefone" 
                    required 
                    onChange={e => setFieldValue('phoneNumber', mask(e.target.value, '(99) 99999-9999'))} // Aplica a máscara
                  />
                  <ErrorMessage name="phoneNumber" component="div" className="error-message" />
                </>
              )}
              <button type="submit">{isLogin ? 'Entrar' : currentClient ? 'Atualizar' : 'Cadastrar'}</button>
            </Form>
          )}
        </Formik>
        <p>
          {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
          <span onClick={toggleForm} style={{ color: '#FFA500', cursor: 'pointer' }}>
            {isLogin ? 'Cadastre-se' : 'Faça Login'}
          </span>
        </p>

  
        <div className="client-list">
          <h2>Lista de Clientes</h2>
          {clients.length === 0 ? (
            <p style={{ fontSize: '14px' }}>Nenhum cliente cadastrado.</p>
          ) : (
            <ul>
              {clients.map((client) => (
                <li key={client.id}>
                  <span>{client.email} - {client.phoneNumber}</span>
                  <button onClick={() => handleEdit(client)} className="edit-button">Editar</button>
                  <button onClick={() => handleDelete(client.id)} className="delete-button">Excluir</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>


      <div className="footer mt-4">
      <h3 className="info-list">
    <a href="../Informacoes" className="info-list">Informações</a> </h3>
       <ul className="info-list">
          <li>Ano de Fundação: 2024</li>
          <li>Redes Sociais:</li>
          <li>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> |
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a> |
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Client;
