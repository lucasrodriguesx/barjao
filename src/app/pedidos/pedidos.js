'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Toast, ToastContainer, Modal, Form } from 'react-bootstrap';
import { FaPlusCircle, FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { LiaChairSolid } from "react-icons/lia";
import { BiDrink } from "react-icons/bi";
import { useAuth } from '../../context/AuthContext'; // Contexto de autenticação
import './pedidos.css';
import { FiAlignJustify } from 'react-icons/fi';
import { mask } from 'remask'; // Importando a biblioteca remask
import PedidosValidator from '../../validators/PedidosValidator'; // Supondo que o validador esteja nesse caminho

const Pedidos = () => {
  const router = useRouter();
  const { user, logout } = useAuth(); // Usuário e função de logout do contexto
  const [pedidos, setPedidos] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null); // Pedido selecionado para edição ou exclusão
  const [showModal, setShowModal] = useState(false); // Controle do modal
  const [pedidoForm, setPedidoForm] = useState({ nome: '', preco: '' });
  const [showMenu, setShowMenu] = useState(false);
  const [errors, setErrors] = useState({ nome: '', preco: '' }); // Para armazenar erros de validação

  useEffect(() => {
    const pedidosBebidas = JSON.parse(localStorage.getItem('pedidos')) || [];
    setPedidos(pedidosBebidas);
  }, []);

  const toggleMenu = () => setShowMenu(!showMenu);

  const goToBebidas = () => {
    router.push('/bebidas');
  };

  const goToMesas = () => {
    router.push('/mesas');
  };

  const goToHome = () => {
    router.push('/');
  };

  const finalizarPedido = () => {
    if (pedidos.length === 0) {
      alert('Não há pedidos para finalizar!');
      return;
    }

    // Exibe o toast de confirmação
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);

    // Redireciona para a página de finalizar pedido
    router.push('./finalizar');
  };

  const handleSelectPedido = (pedido, index) => {
    setSelectedPedido(index); // Guardar o índice do pedido selecionado
    setPedidoForm(pedido); // Preenche o formulário com os dados do pedido selecionado
    setShowModal(true); // Abre o modal para edição
  };

  const handleAddPedido = () => {
    setPedidoForm({ nome: '', preco: '' }); // Limpar formulário ao adicionar um novo pedido
    setShowModal(true); // Abre o modal para adicionar um novo pedido
    setSelectedPedido(null); // Limpar a seleção de pedido
  };

  const handleSavePedido = () => {
    const validationErrors = PedidosValidator(pedidoForm); // Validando o pedido
    setErrors(validationErrors);

    // Se não houver erros, continuar
    if (!validationErrors.nome && !validationErrors.preco) {
      if (pedidoForm.nome && pedidoForm.preco) {
        if (selectedPedido !== null) {
          // Editar pedido existente
          const newPedidos = [...pedidos];
          newPedidos[selectedPedido] = pedidoForm; // Atualiza o pedido no índice selecionado
          localStorage.setItem('pedidos', JSON.stringify(newPedidos));
          setPedidos(newPedidos);
        } else {
          // Adicionar um novo pedido
          const newPedidos = [...pedidos, pedidoForm];
          localStorage.setItem('pedidos', JSON.stringify(newPedidos));
          setPedidos(newPedidos);
        }
        setShowModal(false); // Fechar o modal após salvar
        setPedidoForm({ nome: '', preco: '' }); // Limpar o formulário
      }
    }
  };

  const handleDeletePedido = () => {
    if (selectedPedido !== null) {
      const newPedidos = pedidos.filter((_, index) => index !== selectedPedido);
      localStorage.setItem('pedidos', JSON.stringify(newPedidos));
      setPedidos(newPedidos);
      setShowModal(false); // Fechar o modal após excluir
      setSelectedPedido(null);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'preco') {
      // Aplicando a máscara no campo de preço
      setPedidoForm({
        ...pedidoForm,
        [e.target.name]: mask(e.target.value, ['R$ 9999.99']),
      });
    } else {
      setPedidoForm({ ...pedidoForm, [e.target.name]: e.target.value });
    }
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
        {user && (
          <div className="user-info">
            <span className="username">{user}</span>
            <Button variant="outline-danger" onClick={logout}>Logout</Button>
          </div>
        )}
      </div>

      {showMenu && (
        <div className="menu">
          <ul>
            <li title="Reserve a sua Mesa" onClick={goToMesas}>
              <LiaChairSolid className="menu-icon-item" />
            </li>
            <li title="Bebidas" onClick={goToBebidas}>
              <BiDrink className="menu-icon-item" />
            </li>
          </ul>
        </div>
      )}

      <div className="pedidos-list">
        {pedidos.length === 0 ? (
          <p>Não há pedidos no momento.</p>
        ) : (
          <div>
            <h1 className="smaller-title mt-4">Pedidos</h1>
            <ul>
              {pedidos.map((pedido, index) => (
                <li key={index} onClick={() => handleSelectPedido(pedido, index)}>
                  {pedido.nome || pedido.title} - {pedido.preco || pedido.valor}
                  <FaRegEdit onClick={() => handleSelectPedido(pedido, index)} className="edit-icon" />
                  <MdDelete onClick={() => handleDeletePedido()} className="delete-icon" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bottom-buttons">
        <Button className="custom-button me-2" onClick={handleAddPedido}>
          <FaPlusCircle /> Adicionar Pedido
        </Button>
        <Button onClick={finalizarPedido} className="custom-button finalizar-pedido-button">
          Finalizar Pedido
        </Button>
      </div>

      <ToastContainer position="top-center" className="mt-4">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={2000} autohide>
          <Toast.Body>Pedido finalizado com sucesso!</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPedido !== null ? 'Editar Pedido' : 'Adicionar Pedido'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='formulario'>
            <Form.Group controlId="formPedidoNome">
              <Form.Label>Nome do Pedido</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Digite o nome do pedido"
                name="nome"
                value={pedidoForm.nome}
                onChange={handleChange}
                isInvalid={errors.nome}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nome}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPedidoPreco">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o preço do pedido"
                name="preco"
                value={pedidoForm.preco}
                onChange={handleChange}
                isInvalid={errors.preco}
              />
              <Form.Control.Feedback type="invalid">
                {errors.preco}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSavePedido}>
            {selectedPedido !== null ? 'Salvar Alterações' : 'Adicionar Pedido'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Pedidos;
