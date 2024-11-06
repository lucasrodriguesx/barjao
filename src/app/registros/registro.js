'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './registro.css';

const Registro = () => {
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editClient, setEditClient] = useState(null);
  const [editEmployee, setEditEmployee] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedClients = localStorage.getItem('clients');
    if (storedClients) {
      const allClients = JSON.parse(storedClients);
      setClients(allClients.filter(client => client.role === 'cliente'));
      setEmployees(allClients.filter(client => client.role === 'funcionario'));
    }
  }, []);

  // Função para editar o cliente
  const handleEditClient = (client) => {
    setEditClient(client);
  };

  // Função para editar o funcionário
  const handleEditEmployee = (employee) => {
    setEditEmployee(employee);
  };

  // Função para salvar o cliente editado
  const handleSaveClient = (e) => {
    e.preventDefault();
    const updatedClients = clients.map(client =>
      client.id === editClient.id ? editClient : client
    );
    setClients(updatedClients);
    localStorage.setItem('clients', JSON.stringify([...updatedClients, ...employees]));
    setEditClient(null); // Fecha o formulário de edição
  };

  // Função para salvar o funcionário editado
  const handleSaveEmployee = (e) => {
    e.preventDefault();
    const updatedEmployees = employees.map(employee =>
      employee.id === editEmployee.id ? editEmployee : employee
    );
    setEmployees(updatedEmployees);
    localStorage.setItem('clients', JSON.stringify([...clients, ...updatedEmployees]));
    setEditEmployee(null); // Fecha o formulário de edição
  };

  // Função para excluir um cliente
  const handleDeleteClient = (id) => {
    const updatedClients = clients.filter(client => client.id !== id);
    setClients(updatedClients);
    localStorage.setItem('clients', JSON.stringify([...updatedClients, ...employees]));
  };

  // Função para excluir um funcionário
  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem('clients', JSON.stringify([...clients, ...updatedEmployees]));
  };

  return (
    <div className="admin-container">
      <h1>Registros</h1>
      <button className="back-button" onClick={() => router.push('/')}>Voltar</button>

      {/* Formulário de Edição de Cliente */}
      {editClient && (
        <div className="edit-form">
          <h2>Editar Cliente</h2>
          <form onSubmit={handleSaveClient}>
            <label className='texto'>
              Nome:
              <input
                type="text"
                value={editClient.name}
                onChange={(e) => setEditClient({ ...editClient, name: e.target.value })}
              />
            </label>
            <label>
              E-mail:
              <input
                type="email"
                value={editClient.email}
                onChange={(e) => setEditClient({ ...editClient, email: e.target.value })}
              />
            </label>
            <label>
              Telefone:
              <input
                type="text"
                value={editClient.phone}
                onChange={(e) => setEditClient({ ...editClient, phone: e.target.value })}
              />
            </label>
            <label>
              Usuário:
              <input
                type="text"
                value={editClient.username}
                onChange={(e) => setEditClient({ ...editClient, username: e.target.value })}
              />
            </label>
            <button type="submit">Salvar</button>
            <button type="button" onClick={() => setEditClient(null)}>Cancelar</button>
          </form>
        </div>
      )}

      {/* Formulário de Edição de Funcionário */}
      {editEmployee && (
        <div className="edit-form">
          <h2>Editar Funcionário</h2>
          <form onSubmit={handleSaveEmployee}>
            <label>
              Nome:
              <input
                type="text"
                value={editEmployee.name}
                onChange={(e) => setEditEmployee({ ...editEmployee, name: e.target.value })}
              />
            </label>
            <label>
              E-mail:
              <input
                type="email"
                value={editEmployee.email}
                onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })}
              />
            </label>
            <label>
              Telefone:
              <input
                type="text"
                value={editEmployee.phone}
                onChange={(e) => setEditEmployee({ ...editEmployee, phone: e.target.value })}
              />
            </label>
            <label>
              Cargo:
              <select
                value={editEmployee.role}
                onChange={(e) => setEditEmployee({ ...editEmployee, role: e.target.value })}
              >
                <option value="gerente">Gerente</option>
                <option value="funcionario">Funcionário</option>
              </select>
            </label>
            <label>
              Salário:
              <input
                type="number"
                value={editEmployee.salary}
                onChange={(e) => setEditEmployee({ ...editEmployee, salary: e.target.value })}
              />
            </label>
            <button type="submit">Salvar</button>
            <button type="button" onClick={() => setEditEmployee(null)}>Cancelar</button>
          </form>
        </div>
      )}

      {/* Tabela de Clientes */}
      <div className="clients-section">
        <h2>Clientes Registrados</h2>
        {clients.length === 0 ? (
          <p>Não há clientes cadastrados.</p>
        ) : (
          <table className="records-table">
            <thead>
              <tr>
                <th className='texto'>Nome</th>
                <th className='texto'>E-mail</th>
                <th className='texto'>Telefone</th>
                <th className='texto'>Usuário</th>
                <th className='texto'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td className='texto'>{client.name}</td>
                  <td className='texto'>{client.email}</td>
                  <td className='texto'>{client.phone}</td>
                  <td className='texto'>{client.username}</td>
                  <td className='texto'>
                    <button onClick={() => handleEditClient(client)}>Editar</button>
                    <button onClick={() => handleDeleteClient(client.id)}>Apagar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Tabela de Funcionários */}
      <div className="employees-section">
        <h2>Funcionários Registrados</h2>
        {employees.length === 0 ? (
          <p>Não há funcionários cadastrados.</p>
        ) : (
          <table className="records-table">
            <thead>
              <tr>
                <th className='texto'>Nome</th>
                <th className='texto'>E-mail</th>
                <th className='texto'>Telefone</th>
                <th className='texto'>Cargo</th>
                <th className='texto'>Salário</th>
                <th className='texto'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id}>
                  <td className='texto'>{employee.name}</td>
                  <td className='texto'>{employee.email}</td>
                  <td className='texto'>{employee.phone}</td>
                  <td className='texto'>{employee.role === 'gerente' ? 'Gerente' : 'Funcionário'}</td>
                  <td className='texto'>{employee.salary}</td>
                  <td className='texto'>
                    <button onClick={() => handleEditEmployee(employee)}>Editar</button>
                    <button onClick={() => handleDeleteEmployee(employee.id)}>Apagar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Registro;
