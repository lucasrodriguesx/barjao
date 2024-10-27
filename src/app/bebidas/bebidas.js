"use client";

import { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './bebidas.css';
import { FiAlignJustify } from "react-icons/fi";
import { BiDrink } from "react-icons/bi";
import { LiaChairSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";
import { FaShoppingCart, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import home from '../home/home'

const Bebidas = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [bebidasList, setBebidasList] = useState([
    { nome: 'Cerveja Artesanal', descricao:'Cerveja feita em pequenos lotes, com sabores únicos.', imagem: 'https://img.freepik.com/fotos-gratis/celebracao-do-oktoberfest-com-cerveja-e-naturezas-mortas_23-2151639905.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
    { nome: 'Gin Tônica', descricao: 'Refrescante mistura de gin e água tônica, com rodelas de limão.', imagem: 'https://img.freepik.com/fotos-gratis/vista-frontal-de-oculos-aromaticos-de-cocktails_23-2148617546.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
    { nome: 'Negroni', descricao: 'Mistura clássica de gin, vermute e Campari.', imagem: 'https://img.freepik.com/fotos-gratis/copo-de-espaco-fresco-copia-cocktail_23-2148340084.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
    { nome: 'Daiquiri', descricao: 'Coquetel de rum, limão e açúcar, servido congelado ou líquido.', imagem: 'https://img.freepik.com/fotos-gratis/um-copo-de-coquetel-com-limao-e-copie-o-espaco_23-2148454366.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
    { nome: 'Caipirinha', descricao: 'o remédio perfeito para qualquer mal!', imagem: 'https://img.freepik.com/premium-photo/babi-guling-with-lime-wedge_1114710-224080.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
    { nome: 'Cuba Libre', descricao: 'Refrescante combinação de rum, cola e limão.', imagem: 'https://img.freepik.com/fotos-gratis/bebidas-na-mesa_23-2148667940.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
    { nome: 'Sangria', descricao: 'Bebida espanhola à base de vinho tinto e frutas.', imagem: 'https://img.freepik.com/fotos-gratis/bebida-refrescante-em-fundo-escuro_23-2148340044.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
    { nome: 'Uísque', descricao: 'é como um abraço quentinho... que desce queimando.', imagem: 'https://img.freepik.com/free-photo/close-up-ice-cold-drinks-ready-be-served_23-2148617679.jpg?t=st=1729898766~exp=1729902366~hmac=be5bc8700b8f7200dfd3378f3257cc0f3071897bd96ffa6e93e663160f7abbe3&w=740' },
    { nome: 'Vinho Tinto', descricao: 'Vinho encorpado, ideal para acompanhar carnes vermelhas.', imagem: 'https://img.freepik.com/fotos-gratis/vinho-tinto-esta-sendo-derramado-em-vidro-com-haste-longa-no-escuro_140725-593.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
    { nome: 'Margarita', descricao: 'Clássico mexicano feito com tequila, limão e licor de laranja', imagem: 'https://img.freepik.com/fotos-premium/respingo-em-copo-de-coquetel-de-bebida-refrescante-007-vesper-com-martini-leve-e-vinho-branco-na-mesa-de-madeira-e-fundo-escuro_465253-987.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
    { nome: 'Cachaça', descricao: 'A base da famosa caipirinha, é um destilado brasileiro com sabor marcante.', imagem: 'https://img.freepik.com/fotos-gratis/conhaque-de-vista-frontal-em-copo-horizontal_23-2148673802.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
    { nome: 'Irish Coffee', descricao: 'Uma deliciosa combinação de café, açúcar, uísque e creme, perfeita para aquecer as noites frias.', imagem: 'https://img.freepik.com/fotos-gratis/graos-de-cafe-organicos-vida-morta_23-2151762360.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
    { nome: 'Cosmopolitan', descricao: 'Um coquetel chic feito com vodka, limão e licor de laranja, famoso entre as mulheres modernas.', imagem: 'https://img.freepik.com/fotos-gratis/deliciosa-bebida-em-copo-alto-chique-com-cereja_23-2148644605.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
    { nome: 'Rum', descricao: 'Feito a partir da cana-de-açúcar, é perfeito para drinques tropicais e noites de festa.', imagem: 'https://img.freepik.com/fotos-gratis/feche-acima-do-espaco-saboroso-da-copia-da-bebida_23-2148340053.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
    { nome: 'Whisky', descricao: 'a única bebida que te faz dançar até o sofá.', imagem: 'https://img.freepik.com/free-photo/glass-bottle-with-iced-cocktail_23-2148722514.jpg?t=st=1729898471~exp=1729902071~hmac=3ee0034d7ddf46440fb5040df3ac4bd7632ff3d773a0afe9d350c03f89e82fc1&w=740' },
    { nome: 'Baileys', descricao: ' Um licor cremoso de whisky e creme de leite, perfeito para os amantes de bebidas doces.', imagem: 'https://img.freepik.com/fotos-gratis/closeup-tiro-de-um-copo-de-cappuccino-de-gelo-em-uma-placa-de-madeira-com-enfeites-em-preto_181624-24413.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
    { nome: 'Pina Colada', descricao: 'Uma bebida tropical feita com rum, coco e abacaxi, perfeita para dias na praia.', imagem: 'https://img.freepik.com/fotos-gratis/uma-grande-porcao-de-maca-de-abacaxi-misturada-bebida-de-verao_114579-1986.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
    { nome: 'Aperol', descricao: 'Um licor italiano com um sabor levemente amargo, perfeito para um refrescante spritz.', imagem: 'https://img.freepik.com/fotos-gratis/arranjo-de-comida-para-festa-de-halloween_23-2149085632.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
    { nome: 'Long Island Iced Tea', descricao: 'Um coquetel forte que combina várias bebidas destiladas, ideal para quem busca algo intenso.', imagem: 'https://img.freepik.com/fotos-gratis/vista-frontal-de-bebida-quente-em-vidro_23-2148453632.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
    { nome: 'Champanhe', descricao: 'O símbolo de celebração, essa bebida espumante é perfeita para brindar momentos especiais.', imagem: 'https://img.freepik.com/fotos-gratis/dois-copos-elegantes-com-champanhe-ouro_144627-6619.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
  ]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  const goToHome = () => {
    router.push('/');
  };
  
  const goToClients = () => {
    router.push('/clientes');
  };

  const handleOrderClick = (bebida) => {
    setSelectedDrink(bebida);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDrink(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newBeverage = {
      nome: event.target.nome.value,
      descricao: event.target.descricao.value,
      imagem: event.target.imagem.value,
    };
    setBebidasList([...bebidasList, newBeverage]);
    setShowForm(false);
  };

  const handleEditClick = (bebida) => {
    setSelectedDrink(bebida);
    setShowForm(true);
  };

  const handleDeleteClick = (bebida) => {
    const updatedBeverages = bebidasList.filter(b => b !== bebida);
    setBebidasList(updatedBeverages);
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
          <li title="Login" onClick={goToClients}>
              <FiUser className="menu-icon-item" />
            </li>
            <li title="Reserve a sua Mesa">
              <LiaChairSolid className="menu-icon-item" />
            </li>
            <li title="Bebidas">
              <BiDrink className="menu-icon-item" />
            </li>
            <li title="Pedido">
              <FaShoppingCart className="menu-icon-item" />
            </li>
          </ul>
        </div>
      )}

      <Button className="mb-3" onClick={() => setShowForm(true)}>Adicionar Bebida</Button>

      {showForm && (
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" name="nome" required />
          </Form.Group>
          <Form.Group controlId="formDescricao">
            <Form.Label>Descrição</Form.Label>
            <Form.Control type="text" name="descricao" required />
          </Form.Group>
          <Form.Group controlId="formImagem">
            <Form.Label>Imagem URL</Form.Label>
            <Form.Control type="text" name="imagem" required />
          </Form.Group>
          <Button type="submit">Adicionar</Button>
          <Button variant="secondary" onClick={() => setShowForm(false)}>Cancelar</Button>
        </Form>
      )}

      <div className="bebidas-container">
        {bebidasList.map((bebida, index) => (
          <Card key={index} className="bebida">
            <Card.Img variant="top" src={bebida.imagem} />
            <Card.Body>
              <Card.Title>{bebida.nome}</Card.Title>
              <Card.Text>{bebida.descricao}</Card.Text>
              <div className="button-group">
                <Button variant="primary" onClick={() => handleOrderClick(bebida)}>Pedir</Button>
                <Button variant="secondary" onClick={() => handleEditClick(bebida)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDeleteClick(bebida)}>Excluir</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showModal} onHide={closeModal} className="modal-custom">
        <Modal.Header closeButton>
          <Modal.Title>Pedido de {selectedDrink?.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'black', color: 'orange' }}>
          {selectedDrink && (
            <>
              <img src={selectedDrink.imagem} alt={selectedDrink.nome} style={{ width: '100%' }} />
              <p>{selectedDrink.descricao}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'black', color: 'orange' }}>
          <Button variant="secondary" onClick={closeModal}>
            Fechar
          </Button>
          <Button variant="primary">Confirmar Pedido</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Bebidas;