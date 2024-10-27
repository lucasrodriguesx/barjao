"use client";

import React, { useState } from 'react';
import { FiAlignJustify, FiUser } from "react-icons/fi";
import { LiaChairSolid } from "react-icons/lia";
import { BiDrink } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import './client.css';
import { useRouter } from 'next/navigation';

const Client = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);

  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', confirmPassword: '', phoneNumber: '' }); // Limpa o formulário
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      setSuccessMessage('Login concluído com sucesso');
    } else {
      if (editingClient) {
        const updatedClients = clients.map((client) =>
          client.id === editingClient.id ? { ...formData, id: client.id } : client
        );
        setClients(updatedClients);
        setEditingClient(null);
        setSuccessMessage('Cliente atualizado com sucesso');
      } else {
        setClients([...clients, { ...formData, id: Date.now() }]);
        setSuccessMessage('Cadastro concluído com sucesso');
      }
    }
    setTimeout(() => setSuccessMessage(''), 3000);
    setFormData({ email: '', password: '', confirmPassword: '', phoneNumber: '' });
  };

  const handleEdit = (client) => {
    setFormData(client);
    setEditingClient(client);
    setIsLogin(false);
  };

  const handleDelete = (id) => {
    const filteredClients = clients.filter((client) => client.id !== id);
    setClients(filteredClients);
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
            <li title="Reserve a sua Mesa">
              <LiaChairSolid className="menu-icon-item" />
            </li>
            <li title="Bebidas" onClick={() => router.push('../bebidas')}>
              <BiDrink className="menu-icon-item" />
            </li>
            <li title="Pedido">
              <FaShoppingCart className="menu-icon-item" />
            </li>
          </ul>
        </div>
      )}

      <div className="logo-container" onClick={() => router.push('/')}>
        <img src='https://img.icons8.com/?size=100&id=jnZk3TAlyedN&format=png&color=FAB005' alt="Logo do Bar" className="logo" />
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="content-wrapper">
        <h1>{isLogin ? 'Login' : 'Cadastro'}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {!isLogin && (
            <>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repetir Senha"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Número de Telefone"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </>
          )}
          <button type="submit">{isLogin ? 'Entrar' : editingClient ? 'Atualizar' : 'Cadastrar'}</button>
        </form>
        <p>
          {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
          <span onClick={toggleForm} style={{ color: '#FFA500', cursor: 'pointer' }}>
            {isLogin ? 'Cadastre-se' : 'Faça Login'}
          </span>
        </p>

        {/* Lista de Clientes - Movido para baixo */}
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
    </div>
  );
};

export default Client;
