'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Table } from 'react-bootstrap';
import { FaPlusCircle, FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FiAlignJustify } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { LiaChairSolid } from "react-icons/lia";
import { BiDrink } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { mask } from 'remask'; 
import FuncionariosValidador from '../../validators/FuncionariosValidador'; 
import './funcionarios.css';

const Funcionarios = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('funcionarios')) || [];
    setFuncionarios(dados);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const goToHome = () => {
    router.push('/'); 
  };

  const goToClientes = () => {
    router.push('../clientes'); 
  };

  const goToMesas = () => {
    router.push('../mesas'); 
  };

  const goToPedidos = () => {
    router.push('../pedidos'); 
  };

  const goToFuncionarios = () => {
    router.push('../funcionarios'); 
  };

  const goToBebidas = () => {
    router.push('/bebidas');
  };

  const excluir = (id) => {
    if (confirm('Deseja realmente excluir o funcionário?')) {
      const dados = funcionarios.filter(item => item.id !== id);
      localStorage.setItem('funcionarios', JSON.stringify(dados));
      setFuncionarios(dados);
    }
  };

  const handleNovoFuncionario = () => {
    setShowForm(true); 
  };

  const closeForm = () => {
    setShowForm(false); 
  };

  const handleMask = (value, maskPattern) => {
    const maskedValue = mask(value, maskPattern);
    return maskedValue.replace('R$', '').trim(); 
  };

  const handleSubmit = (values, { resetForm }) => {
    const id = Math.random(); 

    const novoFuncionarioComId = { ...values, id };
    const dados = [...funcionarios, novoFuncionarioComId];
    localStorage.setItem('funcionarios', JSON.stringify(dados));
    setFuncionarios(dados);
    resetForm(); 
    closeForm(); 
  };

  return (
    <div className="funcionarios">
      <div className="header">
        <FiAlignJustify className="menu-icon" onClick={toggleMenu} />
        <div className="logo-container" onClick={goToHome}>
          <img
            className="logo"
            src="https://img.icons8.com/?size=100&id=jnZk3TAlyedN&format=png&color=FAB005"
            alt="Logo do Bar"
          />
        </div>
      </div>

      <h1 className="smaller-title mt-4">Funcionários</h1>
      
      {showMenu && (
        <div className="menu">
          <ul>
            <li title="Login" onClick={goToClientes}>
              <FiUser className="menu-icon-item" />
            </li>
            <li title="Reserve sua Mesa">
              <LiaChairSolid className="menu-icon-item" />
            </li>
            <li title="Bebidas" onClick={goToBebidas}>
              <BiDrink className="menu-icon-item" />
            </li>
            <li title="Pedidos" onClick={goToPedidos}>
              <FaShoppingCart className="menu-icon-item" />
            </li>
            <li title="Funcionarios" onClick={goToFuncionarios}>
              <AiOutlineTeam className="menu-icon-item" />
            </li>
          </ul>
        </div>
      )}

      <button className="btn btn-warning mb-3" onClick={handleNovoFuncionario}>
        <FaPlusCircle /> Novo Funcionário
      </button>

      {showForm && (
        <Formik
          initialValues={{ nome: '', cargo: '', salario: '', telefone: '' }}
          validationSchema={FuncionariosValidador}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="mb-3">
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <Field type="text" name="nome" className="form-control" />
                <ErrorMessage name="nome" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label className="form-label">Cargo</label>
                <Field type="text" name="cargo" className="form-control" />
                <ErrorMessage name="cargo" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label className="form-label">Salário</label>
                <Field name="salario">
                  {({ field }) => (
                    <input
                      {...field}
                      className="form-control"
                      onChange={(e) => {
                        const rawValue = handleMask(e.target.value, 'R$ 9999,99');
                        setFieldValue('salario', rawValue);
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage name="salario" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label className="form-label">Telefone</label>
                <Field name="telefone">
                  {({ field }) => (
                    <input
                      {...field}
                      className="form-control"
                      onChange={(e) => setFieldValue('telefone', handleMask(e.target.value, '(99) 99999-9999'))}
                    />
                  )}
                </Field>
                <ErrorMessage name="telefone" component="div" className="text-danger" />
              </div>
              <button type="submit" className="btn btn-success">Adicionar Funcionário</button>
              <button type="button" className="btn btn-danger ms-2" onClick={closeForm}>Cancelar</button>
            </Form>
          )}
        </Formik>
      )}

      <Table striped bordered hover className="table-dark text-white">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Salário</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((item) => (
            <tr key={item.id}>
              <td>
                <FaRegEdit title="Editar" className="text-warning" />
                <MdDelete
                  title="Excluir"
                  className="text-danger ms-2"
                  onClick={() => excluir(item.id)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
              <td>{item.nome}</td>
              <td>{item.cargo}</td>
              <td>{typeof item.salario === 'number' ? item.salario.toFixed(2) : 'N/A'}</td>
              <td>{item.telefone}</td>
            </tr>
          ))}
        </tbody>
      </Table>

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

export default Funcionarios;
