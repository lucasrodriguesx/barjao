'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GiRoundTable } from "react-icons/gi";
import { BiDrink } from "react-icons/bi";
import { FaPlusCircle, FaShoppingCart } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { MdTableRestaurant } from "react-icons/md"; 
import { FiAlignJustify, FiUser } from "react-icons/fi"; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import MesaValidador from '../../validators/MesaValidador';
import { useAuth } from '../../context/AuthContext';
import './mesas.css';
import { ToastContainer, Toast, Button } from 'react-bootstrap'; 

const Mesa = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [mesas, setMesas] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentMesa, setCurrentMesa] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMesa, setEditingMesa] = useState(null);
  const [reservationDate, setReservationDate] = useState(null);
  const [showToast, setShowToast] = useState(false); 

  const toggleMenu = () => setShowMenu(!showMenu);

  const goToHome = () => router.push('/');
  const goToBebidas = () => router.push('/bebidas');
  const goToPedidos = () => router.push('../pedidos');
  const goToClientes = () => router.push('/clientes');
  const goToFuncionarios = () => router.push('../funcionarios');
  
  const handleMesaClick = (index) => {
    setCurrentMesa(mesas[index]);
    const updatedSelected = isSelected.map((_, i) => i === index);
    setIsSelected(updatedSelected);
    setShowModal(true);
  };

  const addMesa = () => {
    setShowAddModal(true);
    setEditingMesa(null);
  };

  const confirmAddMesa = (values) => {
    const newId = mesas.length > 0 ? mesas[mesas.length - 1].id + 1 : 1;
    const newMesa = { 
      id: newId, 
      title: values.title, 
      valor: values.valor,
    };
    const updatedMesas = [...mesas, newMesa];
    setMesas(updatedMesas);
    setIsSelected([...isSelected, false]);
    setShowAddModal(false);
    localStorage.setItem('mesas', JSON.stringify(updatedMesas));
  };

  const removeMesa = () => {
    if (currentMesa) {
      const updatedMesas = mesas.filter((mesa) => mesa.id !== currentMesa.id);
      setMesas(updatedMesas);
      setShowModal(false);
      setIsSelected(isSelected.map(() => false));
      localStorage.setItem('mesas', JSON.stringify(updatedMesas));
    }
  };

  const editMesa = (mesa) => {
    setEditingMesa(mesa);
    setShowAddModal(true);
  };

  const confirmEditMesa = (values) => {
    const updatedMesas = mesas.map((mesa) =>
      mesa.id === editingMesa.id ? { ...mesa, title: values.title, valor: values.valor } : mesa
    );
    setMesas(updatedMesas);
    setEditingMesa(null);
    setShowAddModal(false);
    localStorage.setItem('mesas', JSON.stringify(updatedMesas));
  };

  const handleReservationConfirm = () => {
    if (!reservationDate) {
      alert('Por favor, selecione uma data e hora para a reserva!');
      return;
    }
    const updatedMesas = mesas.map((mesa) =>
      mesa.id === currentMesa.id ? { ...mesa, date: reservationDate } : mesa
    );
    setMesas(updatedMesas);
    setShowModal(false);
    localStorage.setItem('mesas', JSON.stringify(updatedMesas));
  };

  const cancelReservation = () => {
    if (currentMesa) {
      const updatedMesas = mesas.map((mesa) =>
        mesa.id === currentMesa.id ? { ...mesa, date: null } : mesa
      );
      setMesas(updatedMesas);
      setShowModal(false);
      localStorage.setItem('mesas', JSON.stringify(updatedMesas));
    }
  };

  const handlePedidoMesa = (mesa) => {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.push({ mesaId: mesa.id, nome: mesa.title, valor: mesa.valor });
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    setShowToast(true); 
  };

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('mesas')) || [];
    setMesas(dados);
    setIsSelected(dados.map(() => false));
  }, []);

  return (
    <div className="mesa">
      <div className="header">
        <div className="menu-icon-container">
          <FiAlignJustify className="menu-icon" onClick={toggleMenu} fontSize="large" />
        </div>
        <div className="logo-container" onClick={goToHome}>
          <img className="logo" src="https://img.icons8.com/?size=100&id=jnZk3TAlyedN&format=png&color=FAB005" alt="Logo do Bar" />
        </div>
        {user && (
          <div className="user-info">
            <span className="username">{user}</span>
            <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
          </div>
        )}
      </div>

      <h1 className="smaller-title mt-4">Mesas</h1>

      {showMenu && (
        <div className="menu">
          <ul>
            <li title="Bebidas" onClick={goToBebidas}>
              <BiDrink className="menu-icon-item" />
            </li>
            <li title="Pedido" onClick={goToPedidos}>
              <FaShoppingCart className="menu-icon-item" />
            </li>
          </ul>
        </div>
      )}

      <div className="add-mesa-container">
        <button className="btn btn-success" onClick={addMesa}>Adicionar Mesa</button>
        {currentMesa && (
          <>
            <button className="btn btn-warning ms-2" onClick={() => editMesa(currentMesa)}>Editar</button>
            <button className="btn btn-danger ms-2" onClick={removeMesa}>Excluir</button>
          </>
        )}
      </div>

      {showAddModal && (
        <Formik
          initialValues={{
            title: editingMesa ? editingMesa.title : '',
            valor: editingMesa ? editingMesa.valor : '',
          }}
          validationSchema={MesaValidador}
          onSubmit={editingMesa ? confirmEditMesa : confirmAddMesa}
        >
          <Form className="mb-3">
            <div className="mb-3">
              <label className="form-label">Nome da Mesa</label>
              <Field type="text" name="title" className="form-control" />
              <ErrorMessage name="title" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Valor</label>
              <Field type="text" name="valor" className="form-control" />
              <ErrorMessage name="valor" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-success">
              {editingMesa ? 'Editar Mesa' : 'Adicionar Mesa'}
            </button>
            <button type="button" className="btn btn-danger ms-2" onClick={() => setShowAddModal(false)}>Cancelar</button>
          </Form>
        </Formik>
      )}

      <div className="mesas-cards row gy-3">
        {mesas.length === 0 ? (
          <div className="alert alert-warning w-100">
            Nenhuma mesa disponível.
          </div>
        ) : (
          mesas.map((mesa, index) => (
            <div key={mesa.id} className={`col-md-4 col-12 mb-3`}>
              <div
                className={`mesa-card ${isSelected[index] ? 'selected' : ''}`}
                onClick={() => handleMesaClick(index)}
              >
                <div className="mesa-card-title">{mesa.title}</div>
                <div className="mesa-card-body">
                  <div className="mesa-card-info">
                    <span>{mesa.valor}</span>
                  </div>
                  {mesa.date && <span className="badge bg-primary">Reservada para {mesa.date}</span>}
                </div>
                {!mesa.date && (
                  <button className="btn btn-primary" onClick={() => handlePedidoMesa(mesa)}>Fazer Pedido</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <ToastContainer>
        <Toast show={showToast} onClose={() => setShowToast(false)}>
          <Toast.Body>Pedido adicionado!</Toast.Body>
        </Toast>
      </ToastContainer>

<div className="bottom-buttons">
  <Button className="custom-button me-2" onClick={goToBebidas}>
 Voltar pra Bebidas
  </Button>
  <Button onClick={goToPedidos} className="custom-button finalizar-pedido-button">
     Finalizar Pedidos
  </Button>
</div>
</div>
  );
};

export default Mesa;
