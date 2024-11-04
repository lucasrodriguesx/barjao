'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Toast, ToastContainer } from 'react-bootstrap';
import { FaPlusCircle, FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FiAlignJustify, FiUser } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { LiaChairSolid } from "react-icons/lia";
import { BiDrink } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { mask } from 'remask';
import Home from '../home/home';
import BebidasValidador from '../../validators/BebidasValidator';
import './bebidas.css';

const Bebidas = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [bebidas, setBebidas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editBebida, setEditBebida] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const goToBebidas = () => {
    router.push('../bebidas'); 
  };

  const goToClientes = () => {
    router.push('../clientes'); 
  };

  const goToHome = () => {
    router.push('/'); 
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

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('bebidas')) || [];
    setBebidas(dados);
  }, []);

  const toggleMenu = () => setShowMenu(!showMenu);

  const excluir = (id) => {
    if (confirm('Deseja realmente excluir a bebida?')) {
      const dados = bebidas.filter(item => item.id !== id);
      localStorage.setItem('bebidas', JSON.stringify(dados));
      setBebidas(dados);
    }
  };

  const handleNovoBebida = () => {
    setEditBebida(null); 
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const handleEdit = (item) => {
    setEditBebida(item);
    setShowForm(true);
  };

  const handleMask = (value, maskPattern) => mask(value, maskPattern);

  const handlePedido = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleSubmit = (values, { resetForm }) => {
    let dados;
    if (editBebida) {
      dados = bebidas.map(bebida => (bebida.id === editBebida.id ? { ...values, id: bebida.id } : bebida));
    } else {
      const id = Math.random();
      const novaBebidaComId = { ...values, id };
      dados = [...bebidas, novaBebidaComId];
    }
    localStorage.setItem('bebidas', JSON.stringify(dados));
    setBebidas(dados);
    resetForm();
    closeForm();
  };

  return (
    <div className="bebidas">
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

      <h1 className="smaller-title mt-4">Bebidas</h1>

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
            <li title="Pedido" onClick={goToPedidos}>
              <FaShoppingCart className="menu-icon-item" />
            </li>
            <li title="Funcionarios" onClick={goToFuncionarios}>
              <AiOutlineTeam className="menu-icon-item" />
            </li>
          </ul>
        </div>
      )}

      <button className="btn btn-warning mb-3" onClick={handleNovoBebida}>
        <FaPlusCircle /> Nova Bebida
      </button>

      {showForm && (
        <Formik
          initialValues={editBebida || { nome: '', tipo: '', preco: '', descricao: '', imagem: '' }}
          validationSchema={BebidasValidador}
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
                <label className="form-label">Tipo</label>
                <Field type="text" name="tipo" className="form-control" />
                <ErrorMessage name="tipo" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label className="form-label">Descrição</label>
                <Field type="text" name="descricao" className="form-control" />
                <ErrorMessage name="descricao" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label className="form-label">Preço</label>
                <Field name="preco">
                  {({ field }) => (
                    <input
                      {...field}
                      className="form-control"
                      onChange={(e) => setFieldValue('preco', handleMask(e.target.value, 'R$ 9999,99'))}
                    />
                  )}
                </Field>
                <ErrorMessage name="preco" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label className="form-label">URL da Imagem</label>
                <Field type="text" name="imagem" className="form-control" />
                <ErrorMessage name="imagem" component="div" className="text-danger" />
              </div>
              <button type="submit" className="btn btn-success">Salvar</button>
              <button type="button" className="btn btn-danger ms-2" onClick={closeForm}>Cancelar</button>
            </Form>
          )}
        </Formik>
      )}

      <div className="bebidas-cards row gy-1">
        {bebidas.map((item) => (
          <div className="col-lg-2" key={item.id}>
            <Card className="bebida-card">
              <Card.Img variant="top" src={item.imagem} alt={item.nome} />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{item.tipo}</Card.Subtitle>
                <Card.Text>{item.descricao}</Card.Text>
                <Card.Text>{item.preco}</Card.Text>
                <div className="bebida-botoes">
                  <Button variant="warning" onClick={() => excluir(item.id)}>
                    <MdDelete /> Excluir
                  </Button>
                  <Button variant="info" className="ms-2" onClick={() => handleEdit(item)}>
                    <FaRegEdit /> Editar
                  </Button>
                  <Button variant="success" className="ms-2" onClick={handlePedido}>
                    Pedir
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={2000} autohide>
          <Toast.Header>
            <strong className="me-auto">Pedido</strong>
          </Toast.Header>
          <Toast.Body>Pedido concluído com sucesso!</Toast.Body>
        </Toast>
      </ToastContainer>

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

export default Bebidas;
