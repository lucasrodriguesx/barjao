"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiAlignJustify, FiUser } from "react-icons/fi";
import { GiRoundTable } from "react-icons/gi";
import './mesas.css';
import { BiDrink } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { LiaChairSolid } from "react-icons/lia";
import MesaValidador from '../../validators/MesaValidador'; 
import { Formik, Form, Field, ErrorMessage } from 'formik'; 

const Mesa = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [mesas, setMesas] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentMesa, setCurrentMesa] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPedidoModal, setShowPedidoModal] = useState(false);
  const [pedidoInfo, setPedidoInfo] = useState({ nome: '', telefone: '', quantidade: '', adicionais: '' });

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const goToHome = () => {
    router.push('/');
  };

  const goToBebidas = () => {
    router.push('/bebidas');
  };

  const goToClientes = () => {
    router.push('/clientes');
  };
  const goToPedidos = () => {
    router.push('../pedidos'); 
};
const goToFuncionarios = () => {
  router.push('../funcionarios'); 
};
  const handleMesaClick = (index) => {
    setCurrentMesa(mesas[index]);
    const updatedSelected = isSelected.map((_, i) => i === index);
    setIsSelected(updatedSelected);
  };

  const addMesa = () => {
    setShowAddModal(true);
  };

  const confirmAddMesa = async (values) => {
    const newId = mesas.length > 0 ? mesas[mesas.length - 1].id + 1 : 1; 
    const newMesa = { id: newId, title: values.title, valor: values.valor };
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
      localStorage.setItem('mesas', JSON.stringify(updatedMesas)); 
    }
  };

  const editMesaTitle = () => {
    const newTitle = prompt("Digite o novo nome da mesa:", currentMesa?.title);
    if (newTitle && currentMesa) {
      const updatedMesas = mesas.map((mesa) =>
        mesa.id === currentMesa.id ? { ...mesa, title: newTitle } : mesa
      );
      setMesas(updatedMesas);
      localStorage.setItem('mesas', JSON.stringify(updatedMesas)); 
    }
  };

  const confirmPedido = () => {
    if (!currentMesa) {
      alert("Por favor, selecione uma mesa antes de fazer o pedido.");
      return;
    }

    const { title } = currentMesa;
    alert(`Pedido da mesa "${title}" confirmado para ${pedidoInfo.nome}!`);
    setShowPedidoModal(false);
    setPedidoInfo({ nome: '', telefone: '', quantidade: '', adicionais: '' });
  };

 
  useEffect(() => {
    const storedMesas = localStorage.getItem('mesas');
    if (storedMesas) {
      setMesas(JSON.parse(storedMesas));
      setIsSelected(Array(JSON.parse(storedMesas).length).fill(false));
    }
  }, []);

  return (
    <div className="mesa">
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

      <h1 className="smaller-title mt-4">Reserve sua Mesa!</h1>

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

      <div className="reservation-container">
        <h2 className="reservation-title">Escolha sua mesa</h2>
        <div className="mesas">
          {mesas.map((mesa, index) => (
            <div
              key={mesa.id}
              className={`mesa-item ${isSelected[index] ? 'selected' : ''}`}
              onClick={() => handleMesaClick(index)}
              title={mesa.title}
            >
              <GiRoundTable size={100} />
            </div>
          ))}
        </div>
        <button onClick={addMesa} className="btn-add">Adicionar Mesa</button>
        <button onClick={() => setShowPedidoModal(true)} className="btn-pedir">Pedir</button>
        <button onClick={removeMesa} className="btn-remove">Excluir Mesa</button>
        <button onClick={editMesaTitle} className="btn-edit">Editar Mesa</button>
      </div>

      {showAddModal && (
        <Formik
          initialValues={{ title: '', valor: 50 }} 
          validationSchema={MesaValidador} 
          onSubmit={confirmAddMesa} 
        >
          {({ errors, touched }) => (
            <Form className="modal-overlay">
              <div className="modal-content">
                <h3>Adicionar Nova Mesa</h3>
                <div>
                  <Field type="text" name="title" placeholder="Nome da nova mesa" />
                  <ErrorMessage name="title" component="div" className="error" />
                </div>
                <div>
                  <Field type="number" name="valor" placeholder="Valor da mesa" />
                  <ErrorMessage name="valor" component="div" className="error" />
                </div>
                <div className="button-container">
                  <button type="submit" className="btn-confirm">Confirmar Adição</button>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn-remove">Cancelar</button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}

      {showPedidoModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Pedir para {currentMesa?.title}</h3>
            <input
              type="text"
              placeholder="Nome Completo"
              value={pedidoInfo.nome}
              onChange={(e) => setPedidoInfo({ ...pedidoInfo, nome: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Telefone"
              value={pedidoInfo.telefone}
              onChange={(e) => setPedidoInfo({ ...pedidoInfo, telefone: e.target.value })}
            />
            <input
              type="number"
              placeholder="Quantidade"
              value={pedidoInfo.quantidade}
              onChange={(e) => setPedidoInfo({ ...pedidoInfo, quantidade: e.target.value })}
            />
            <input
              type="text"
              placeholder="Adicionais"
              value={pedidoInfo.adicionais}
              onChange={(e) => setPedidoInfo({ ...pedidoInfo, adicionais: e.target.value })}
            />
            <button onClick={confirmPedido} className="btn-confirm">Confirmar Pedido</button>
            <button onClick={() => setShowPedidoModal(false)} className="btn-remove">Cancelar</button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Tem certeza que deseja excluir a mesa {currentMesa?.title}?</h3>
            <button onClick={removeMesa} className="btn-confirm">Sim</button>
            <button onClick={() => setShowModal(false)} className="btn-remove">Não</button>
          </div>
        </div>
      )}
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

export default Mesa;
