'use client'

import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { FiAlignJustify } from "react-icons/fi";
import { BiDrink } from "react-icons/bi";
import { LiaChairSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { useRouter } from 'next/navigation'; 

const Home = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

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

  return (
    <div className="home">
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

      <h1 className="smaller-title mt-4">Bem-vindo ao Bar!</h1>
      
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

      <Carousel className="mt-4" interval={0} fade>
        <Carousel.Item>
          <img
            className="d-block custom-image"
            src="https://img.freepik.com/free-photo/closeup-glass-old-fashioned-cocktail-with-ice-wooden-table-with-blurry-background_181624-59474.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid"
            alt="Whisky"
          />
          <Carousel.Caption>
            <h3>Whisky </h3>
            <p>Whisky: a única bebida que te faz dançar até o sofá.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block custom-image"
            src="https://img.freepik.com/premium-photo/babi-guling-with-lime-wedge_1114710-224080.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid"
            alt="Caipirinha"
          />
          <Carousel.Caption>
            <h3>Caipirinha</h3>
            <p>Caipirinha: o remédio perfeito para qualquer mal!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block custom-image"
            src="https://img.freepik.com/free-photo/close-up-ice-cold-drinks-ready-be-served_23-2148617679.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid"
            alt="Uísque"
          />
          <Carousel.Caption>
            <h3>Uísque</h3>
            <p>Uísque: é como um abraço quentinho... que desce queimando!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="footer mt-4">
  <h3 className="smaller-title">
    <a href="../Informacoes" className="info-list">Informações</a>
  </h3>
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

export default Home;
