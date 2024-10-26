// src/app/home/home.js
"use client";

import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { FiAlignJustify } from "react-icons/fi";
import { BiDrink } from "react-icons/bi";
import { LiaChairSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from 'next/navigation'; // Corrigido para o App Router

const Home = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Função para redirecionar para a página de Bebidas
  const goToBebidas = () => {
    router.push('/components/bebidas'); // Verifique se o caminho está correto
  };

  // Função para redirecionar para a página inicial ao clicar na logo
  const goToHome = () => {
    router.push('/'); // Redireciona para a página inicial
  };

  return (
    <div className="home">
      <div className="header">
        <FiAlignJustify className="menu-icon" onClick={toggleMenu} />
        <div className="logo-container" onClick={goToHome}>
          <img
            className="logo"
            src="https://img.icons8.com/?size=100&id=EOfiorApOhan&format=png&color=ffa500"
            alt="Logo do Bar do Jao"
          />
        </div>
      </div>

      <h1 className="smaller-title mt-4">Bem-vindo ao Bar do Jao!</h1>

      {showMenu && (
        <div className="menu">
          <ul>
            <li title="Login">
              <FiUser className="menu-icon-item" />
            </li>
            <li title="Reserve a sua Mesa">
              <LiaChairSolid className="menu-icon-item" />
            </li>
            <li title="Bebidas" onClick={goToBebidas}>
              <BiDrink className="menu-icon-item" />
            </li>
            <li title="Pedido">
              <FaShoppingCart className="menu-icon-item" />
            </li>
          </ul>
        </div>
      )}

      <Carousel className="mt-4" interval={100} fade>
        <Carousel.Item>
          <img
            className="d-block custom-image"
            src="https://img.freepik.com/free-photo/glass-bottle-with-iced-cocktail_23-2148722514.jpg?t=st=1729898471~exp=1729902071~hmac=3ee0034d7ddf46440fb5040df3ac4bd7632ff3d773a0afe9d350c03f89e82fc1&w=740"
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
            src="https://img.freepik.com/free-photo/close-up-ice-cold-drinks-ready-be-served_23-2148617679.jpg?t=st=1729898766~exp=1729902366~hmac=be5bc8700b8f7200dfd3378f3257cc0f3071897bd96ffa6e93e663160f7abbe3&w=740"
            alt="Uísque"
          />
          <Carousel.Caption>
            <h3>Uísque</h3>
            <p>Uísque: é como um abraço quentinho... que desce queimando!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

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

export default Home;
