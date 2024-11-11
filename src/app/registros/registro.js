'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mask } from 'remask';
import * as yup from 'yup'; 
import './registro.css';

const Registro = () => {
  const [clients, setClients] = useState([]);
  const [editClient, setEditClient] = useState(null);
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', username: '', password: '' });
  const [showForm, setShowForm] = useState(false);  // Adicionado para controlar a visibilidade do formulário
  const router = useRouter();

  useEffect(() => {
    const storedClients = localStorage.getItem('clients');
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
  }, []);

  const handleEditClient = (client) => {
    setEditClient(client);
  };

  const handleSaveClient = async (e) => {
    e.preventDefault();

    const schema = yup.object().shape({
      name: yup.string().required('Nome é obrigatório'),
      email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
      phone: yup.string().required('Telefone é obrigatório'),
      username: yup.string().required('Nome de usuário é obrigatório'),
      password: yup.string().required('Senha é obrigatória')
    });

    try {
      await schema.validate(editClient, { abortEarly: false });

      const updatedClients = clients.map(client =>
        client.id === editClient.id ? editClient : client
      );
      setClients(updatedClients);
      localStorage.setItem('clients', JSON.stringify(updatedClients));
      setEditClient(null); // Fecha o formulário de edição
    } catch (error) {
      console.error(error.errors);
      alert(error.errors.join('\n'));
    }
  };

  const handleAddClient = async (e) => {
    e.preventDefault();

    const schema = yup.object().shape({
      name: yup.string().required('Nome é obrigatório'),
      email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
      phone: yup.string().required('Telefone é obrigatório'),
      username: yup.string().required('Nome de usuário é obrigatório'),
      password: yup.string().required('Senha é obrigatória')
    });

    try {
      await schema.validate(newClient, { abortEarly: false });

      const newClientWithId = { ...newClient, id: Date.now() }; // Gerar um ID único para o cliente
      const updatedClients = [...clients, newClientWithId];
      setClients(updatedClients);
      localStorage.setItem('clients', JSON.stringify(updatedClients));
      setNewClient({ name: '', email: '', phone: '', username: '', password: '' }); // Limpa o formulário
      setShowForm(false);  // Esconde o formulário após adicionar o cliente
    } catch (error) {
      console.error(error.errors);
      alert(error.errors.join('\n'));
    }
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = mask(e.target.value, ['(99) 99999-9999']);
    setEditClient({ ...editClient, phone: formattedPhone });
  };

  const handleAddPhoneChange = (e) => {
    const formattedPhone = mask(e.target.value, ['(99) 99999-9999']);
    setNewClient({ ...newClient, phone: formattedPhone });
  };

  const handleDeleteClient = (clientId) => {
    const updatedClients = clients.filter(client => client.id !== clientId);
    setClients(updatedClients);
    localStorage.setItem('clients', JSON.stringify(updatedClients));
  };

  return (
    <div className="admin-container">
      <h1>Registros de Clientes</h1>
      <button className="back-button" onClick={() => router.push('/')}>Voltar</button>

      {/* Adicionar novo cliente */}
      <button onClick={() => setShowForm(!showForm)} className="add-client-btn">
        {showForm ? 'Cancelar' : 'Adicionar Cliente'}
      </button>

      {showForm && (
        <div className="add-client-section">
          <h2>Adicionar Cliente</h2>
          <form onSubmit={handleAddClient} className="client-form">
            <div className="form-group">
              <label>Nome Completo</label>
              <input
                type="text"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                placeholder="Nome Completo"
              />
            </div>

            <div className="form-group">
              <label>E-mail</label>
              <input
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                placeholder="E-mail"
              />
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input
                type="text"
                value={newClient.phone}
                onChange={handleAddPhoneChange} 
                placeholder="Telefone"
              />
            </div>

            <div className="form-group">
              <label>Nome de Usuário</label>
              <input
                type="text"
                value={newClient.username}
                onChange={(e) => setNewClient({ ...newClient, username: e.target.value })}
                placeholder="Nome de Usuário"
              />
            </div>

            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                value={newClient.password}
                onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
                placeholder="Senha"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">Salvar</button>
            </div>
          </form>
        </div>
      )}

      {editClient && (
        <div className="edit-form">
          <h2>Editar Cliente</h2>
          <form onSubmit={handleSaveClient} className="client-form">
            <div className="form-group">
              <label>Nome Completo</label>
              <input
                type="text"
                value={editClient.name}
                onChange={(e) => setEditClient({ ...editClient, name: e.target.value })}
                placeholder="Nome Completo"
              />
            </div>

            <div className="form-group">
              <label>E-mail</label>
              <input
                type="email"
                value={editClient.email}
                onChange={(e) => setEditClient({ ...editClient, email: e.target.value })}
                placeholder="E-mail"
              />
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input
                type="text"
                value={editClient.phone}
                onChange={handlePhoneChange} 
                placeholder="Telefone"
              />
            </div>

            <div className="form-group">
              <label>Nome de Usuário</label>
              <input
                type="text"
                value={editClient.username}
                onChange={(e) => setEditClient({ ...editClient, username: e.target.value })}
                placeholder="Nome de Usuário"
              />
            </div>

            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                value={editClient.password}
                onChange={(e) => setEditClient({ ...editClient, password: e.target.value })}
                placeholder="Senha"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">Salvar</button>
              <button type="button" className="cancel-btn" onClick={() => setEditClient(null)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="clients-section">
        <ul>
          {clients.map(client => (
            <li key={client.id} className="client-item">
              <div className="client-details">
                <p><strong>Nome:</strong> {client.name}</p>
                <p><strong>Email:</strong> {client.email}</p>
                <p><strong>Telefone:</strong> {client.phone}</p>
                <p><strong>Usuário:</strong> {client.username}</p>
              </div>
              <div className="client-actions">
                <button onClick={() => handleEditClient(client)} className="edit-btn">Editar</button>
                <button onClick={() => handleDeleteClient(client.id)} className="delete-btn">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Registro;
