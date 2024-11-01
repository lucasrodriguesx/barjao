"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiAlignJustify, FiUser } from "react-icons/fi";
import { GiRoundTable } from "react-icons/gi";
import './mesas.css';
import { BiDrink } from 'react-icons/bi';
import { FaShoppingCart } from 'react-icons/fa';

const Mesa = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [mesas, setMesas] = useState([
    { id: 1, title: "Mesa dos Conquistadores de Cerveja" },
    { id: 2, title: "Mesa dos Campeões da Ressaca" },
    { id: 3, title: "Mesa dos Caçadores de Promoção" },
    { id: 4, title: "Mesa dos Contadores de História" },
    { id: 5, title: "Mesa dos Degustadores Famosos" },
    { id: 6, title: "Mesa dos Gladiadores da Madrugada" }
  ]);
  const [isSelected, setIsSelected] = useState(Array(6).fill(false));
  const [showModal, setShowModal] = useState(false);
  const [currentMesa, setCurrentMesa] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMesaTitle, setNewMesaTitle] = useState('');
  const [showPedidoModal, setShowPedidoModal] = useState(false);
  const [pedidoInfo, setPedidoInfo] = useState({ nome: '', telefone: '', quantidade: '', adicionais: '' });

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const goToHome = () => {
    router.push('/');
  };

  const handleMesaClick = (index) => {
    setCurrentMesa(mesas[index]);
    const updatedSelected = isSelected.map((_, i) => i === index);
    setIsSelected(updatedSelected);
  };

  const addMesa = () => {
    setShowAddModal(true);
  };

  const confirmAddMesa = () => {
    if (newMesaTitle.trim() !== '') {
      const newId = mesas.length + 1;
      const newMesa = { id: newId, title: newMesaTitle };
      setMesas([...mesas, newMesa]);
      setIsSelected([...isSelected, false]);
      setNewMesaTitle('');
      setShowAddModal(false);
    }
  };

  const removeMesa = () => {
    if (currentMesa) {
      setMesas(mesas.filter((mesa) => mesa.id !== currentMesa.id));
      setShowModal(false);
    }
  };

  const editMesaTitle = (newTitle) => {
    if (currentMesa) {
      const updatedMesas = mesas.map((mesa) =>
        mesa.id === currentMesa.id ? { ...mesa, title: newTitle } : mesa
      );
      setMesas(updatedMesas);
    }
  };

  const confirmPedido = () => {
    alert(`Pedido da mesa "${currentMesa.title}" confirmado para ${pedidoInfo.nome}!`);
    setShowPedidoModal(false);
    setPedidoInfo({ nome: '', telefone: '', quantidade: '', adicionais: '' });
  };

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
            <li title="Login">
              <FiUser className="menu-icon-item" />
            </li>
            <li title="Reserve sua Mesa">
              <GiRoundTable className="menu-icon-item" />
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
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Adicionar Nova Mesa</h3>
            <input
              type="text"
              placeholder="Nome da nova mesa"
              value={newMesaTitle}
              onChange={(e) => setNewMesaTitle(e.target.value)}
            />
            <div className="button-container">
              <button onClick={confirmAddMesa} className="btn-confirm">Confirmar Adição</button>
              <button onClick={() => setShowAddModal(false)} className="btn-remove">Cancelar</button>
            </div>
          </div>
        </div>
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
              placeholder="Quantidade de Pessoas"
              value={pedidoInfo.quantidade}
              onChange={(e) => setPedidoInfo({ ...pedidoInfo, quantidade: e.target.value })}
            />
            <input
              type="text"
              placeholder="Informações Adicionais"
              value={pedidoInfo.adicionais}
              onChange={(e) => setPedidoInfo({ ...pedidoInfo, adicionais: e.target.value })}
            />
            <div className="button-container">
              <button onClick={confirmPedido} className="btn-confirm">Confirmar Pedido</button>
              <button onClick={() => setShowPedidoModal(false)} className="btn-remove">Cancelar</button>
            </div>
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
