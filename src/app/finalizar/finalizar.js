'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Modal, Card, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { mask } from 'remask';
import { validarPagamento } from '../../validators/FinalizarValidador';
import './finalizar.css';

const Finalizar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [formaPagamento, setFormaPagamento] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const [total, setTotal] = useState(0);
  const [numeroCartao, setNumeroCartao] = useState('');
  const [nomeCartao, setNomeCartao] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const pedidosSalvos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const valorTotal = pedidosSalvos.reduce((acc, pedido) => {
      const preco = parseFloat((pedido.preco || pedido.valor || '0').replace(/[^0-9.]/g, ''));
      return acc + (isNaN(preco) ? 0 : preco);
    }, 0);
    setTotal(valorTotal);
  }, []);

  const goToHome = () => router.push('/');

  const handlePagamento = () => {
    if (!validarPagamento(formaPagamento, numeroCartao, nomeCartao, validade, cvv, cpf, email)) {
      return;
    }

    if (!formaPagamento) {
      alert("Por favor, selecione uma forma de pagamento.");
      return;
    }

    localStorage.setItem('pedidos', JSON.stringify([]));
    setConfirmado(true);
    setShowModal(false);
  };

  const handleOpenModal = (tipoPagamento) => {
    setFormaPagamento(tipoPagamento);
    setShowModal(true);
  };

  const renderFormularioPagamento = () => {
    if (formaPagamento === 'Cartão') {
      return (
        <Form>
          <Form.Group controlId="cardNumber">
            <Form.Label>Número do Cartão</Form.Label>
            <Form.Control
              type="text"
              placeholder="0000 0000 0000 0000"
              value={numeroCartao}
              onChange={(e) => setNumeroCartao(mask(e.target.value, ['9999 9999 9999 9999']))}
            />
          </Form.Group>
          <Form.Group controlId="cardName" className="mt-2">
            <Form.Label>Nome no Cartão</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome Completo"
              value={nomeCartao}
              onChange={(e) => setNomeCartao(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="cardExpiry" className="mt-2">
            <Form.Label>Validade</Form.Label>
            <Form.Control
              type="text"
              placeholder="MM/AA"
              value={validade}
              onChange={(e) => setValidade(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="cardCvv" className="mt-2">
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type="text"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </Form.Group>
        </Form>
      );
    } else if (formaPagamento === 'Pix') {
      return (
        <div style={{ textAlign: 'center' }}>
          <p>Escaneie o QR Code para pagar com Pix:</p>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgCf805gmp1HbJe0bMFd37wJ5CTpk2IexqLQ&s" alt="QR Code Pix" />
        </div>
      );
    } else if (formaPagamento === 'Boleto') {
      return (
        <Form>
          <Form.Group controlId="boletoName">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control type="text" placeholder="Nome Completo" />
          </Form.Group>
          <Form.Group controlId="boletoCpf" className="mt-2">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(mask(e.target.value, '999.999.999-99'))}
            />
          </Form.Group>
          <Form.Group controlId="boletoEmail" className="mt-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
      );
    }
  };

  return (
    <div className="finalizar">
      <div className="header">
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

      <div className="content">
        <h1>Finalizar Pedido</h1>
        <h3>Total: R$ {total.toFixed(2)}</h3>

        <div className="pagamento-cards">
          <Card className="pagamento-card" onClick={() => handleOpenModal('Cartão')}>
            <Card.Body>
              <Card.Title>Cartão</Card.Title>
            </Card.Body>
          </Card>

          <Card className="pagamento-card" onClick={() => handleOpenModal('Pix')}>
            <Card.Body>
              <Card.Title>Pix</Card.Title>
            </Card.Body>
          </Card>

          <Card className="pagamento-card" onClick={() => handleOpenModal('Boleto')}>
            <Card.Body>
              <Card.Title>Boleto</Card.Title>
            </Card.Body>
          </Card>
        </div>

        {/* Modal de Pagamento */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Pagamento ({formaPagamento})</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {renderFormularioPagamento()}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handlePagamento}>
              Confirmar e Pagar
            </Button>
          </Modal.Footer>
        </Modal>

        {confirmado && (
          <div className="confirmacao mt-3">
            <p>Pagamento realizado com sucesso!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Finalizar;
