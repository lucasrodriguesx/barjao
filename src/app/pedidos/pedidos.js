'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Table } from 'react-bootstrap';
import { FaPlusCircle, FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FiAlignJustify } from "react-icons/fi";
import { BiDrink } from "react-icons/bi";
import { LiaChairSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { mask } from 'remask'; 
import PedidosValidador from '../../validators/PedidosValidador'; 
import './pedidos.css';

const Pedidos = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('pedidos')) || [];
    setPedidos(dados);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const goToHome = () => {
    router.push('/'); 
  };

  const goToBebidas = () => {
    router.push('../bebidas'); 
  };

  const goToClientes = () => {
    router.push('../clientes'); 
  };

  const goToMesas = () => {
    router.push('../mesas'); 
  };
  const goToFuncionarios = () => {
    router.push('../funcionarios'); 
  };
  const excluir = (id) => {
    if (confirm('Deseja realmente excluir o pedido?')) {
      const dados = pedidos.filter(item => item.id !== id);
      localStorage.setItem('pedidos', JSON.stringify(dados));
      setPedidos(dados);
    }
  };

  const handleNovoPedido = () => {
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
    const totalValue = parseFloat(values.total.replace(',', '.')); 

    
    if (isNaN(totalValue)) {
      alert("O valor total deve ser um número válido.");
      return;
    }

    const novoPedidoComId = { ...values, id, total: totalValue };
    const dados = [...pedidos, novoPedidoComId];
    localStorage.setItem('pedidos', JSON.stringify(dados));
    setPedidos(dados);
    resetForm(); 
    closeForm(); 
  };

  const realizarPedido = () => {
    alert('Pedido realizado com sucesso!'); 
  };

  return (
    <div className="pedidos">
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

      <h1 className="smaller-title mt-4">Pedidos</h1>
      
      {showMenu && (
        <div className="menu">
          <ul>
            <li title="Login" onClick={goToClientes}> 
              <FiUser className="menu-icon-item" />
            </li>
            <li title="Reserve a sua Mesa" onClick={goToMesas}>
              <LiaChairSolid className="menu-icon-item" />
            </li>
            <li title="Bebidas" onClick={goToBebidas}>
              <BiDrink className="menu-icon-item" />
            </li>
            <li title="Pedido">
              <FaShoppingCart className="menu-icon-item" />
            </li>
            <li title="Funcionarios" onClick={goToFuncionarios}>
              <AiOutlineTeam className="menu-icon-item" />
            </li>
          </ul>
        </div>
      )}

      <button className="btn btn-warning mb-3" onClick={handleNovoPedido}>
        <FaPlusCircle /> Novo Pedido
      </button>

      {showForm && (
        <Formik
          initialValues={{ cliente: '', itens: '', mesa: '', total: '' }}
          validationSchema={PedidosValidador}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="mb-3">
              <div className="mb-3">
                <label className="form-label">Cliente</label>
                <Field type="text" name="cliente" className="form-control" />
                <ErrorMessage name="cliente" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label className="form-label">Bebidas</label>
                <Field type="text" name="itens" className="form-control" />
                <ErrorMessage name="itens" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label className="form-label">Mesa</label>
                <Field name="mesa">
                  {({ field }) => (
                    <input
                      {...field}
                      className="form-control"
                      onChange={(e) => setFieldValue('mesa', handleMask(e.target.value, '999'))}
                    />
                  )}
                </Field>
                <ErrorMessage name="mesa" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label className="form-label">Preço Total</label>
                <Field name="total">
                  {({ field }) => (
                    <input
                      {...field}
                      className="form-control"
                      onChange={(e) => {
                        const rawValue = handleMask(e.target.value, 'R$ 9999,9');
                        setFieldValue('total', rawValue);
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage name="total" component="div" className="text-danger" />
              </div>
              <button type="submit" className="btn btn-success">Adicionar Pedido</button>
              <button type="button" className="btn btn-danger ms-2" onClick={closeForm}>Cancelar</button>
            </Form>
          )}
        </Formik>
      )}

      <Table striped bordered hover className="table-dark text-white">
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Bebidas</th>
            <th>Mesa</th>
            <th>Preço Total</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((item) => (
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
              <td>{item.cliente}</td>
              <td>{item.itens}</td>
              <td>{item.mesa}</td>
              <td>{typeof item.total === 'number' ? item.total.toFixed(2) : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <button className="btn btn-primary" onClick={realizarPedido}>
        Realizar Pedido
      </button>

      <div className="footer mt-4">
        <h3 className="smaller-title">Informações</h3>
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

export default Pedidos;
