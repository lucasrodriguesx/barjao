// src/app/components/bebidas/bebidas.js
"use client";

import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './bebidas.css';
import { FiAlignJustify } from "react-icons/fi";
import { BiDrink } from "react-icons/bi";
import { LiaChairSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const Bebidas = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Função para redirecionar para a página inicial ao clicar na logo
  const goToHome = () => {
    router.push('/'); // Redireciona para a página inicial
  };

  // Função para abrir o modal de pedido
  const handleOrder = (bebida) => {
    alert(`Você pediu: ${bebida}`);
    // Aqui você pode implementar o código para abrir um modal ou algo similar
  };

  return (
    <div className="bebidas">
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

      <h1 className="smaller-title mt-4">Bebidas do Jao</h1>

      {showMenu && (
        <div className="menu">
          <ul>
            <li title="Login">
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

      <div className="bebidas-container">
        {[
          { nome: 'Whisky', descricao: 'A única bebida que te faz dançar até o sofá.', imgSrc: 'https://img.freepik.com/free-photo/glass-bottle-with-iced-cocktail_23-2148722514.jpg?t=st=1729898471~exp=1729902071~hmac=3ee0034d7ddf46440fb5040df3ac4bd7632ff3d773a0afe9d350c03f89e82fc1&w=740' },
          { nome: 'Caipirinha', descricao: 'O remédio perfeito para qualquer mal!', imgSrc: 'https://img.freepik.com/premium-photo/babi-guling-with-lime-wedge_1114710-224080.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid' },
          { nome: 'Uísque', descricao: 'É como um abraço quentinho... que desce queimando!', imgSrc: 'https://img.freepik.com/free-photo/close-up-ice-cold-drinks-ready-be-served_23-2148617679.jpg?t=st=1729898766~exp=1729902366~hmac=be5bc8700b8f7200dfd3378f3257cc0f3071897bd96ffa6e93e663160f7abbe3&w=740' },
          { nome: 'Cerveja', descricao: 'A refrescância que todos adoram!', imgSrc: 'https://img.freepik.com/free-photo/fresh-beer-glass-with-bubbles_23-2148791998.jpg?t=st=1729898953~exp=1729902553~hmac=f9c3fda75308f799c6f79c80c798c407bc23e5c2f554fa04735c04199e4da4d2&w=740' },
          { nome: 'Vinho Tinto', descricao: 'O clássico que combina com tudo!', imgSrc: 'https://img.freepik.com/free-photo/glass-red-wine-on-table_23-2148736366.jpg?t=st=1729899128~exp=1729902728~hmac=da1da07ff93f443642ee57246831c28c55a41701d1c6e71d8de92941efb28228&w=740' },
          { nome: 'Margarita', descricao: 'Uma explosão de sabor e alegria!', imgSrc: 'https://img.freepik.com/free-photo/margarita-cocktail-summer-drink-with-salted-rim_23-2148597656.jpg?t=st=1729899238~exp=1729902838~hmac=cf6e03f4e4fd7478f62bde27f929650e924d8ba6f3994cded9e394b8ff8e2648&w=740' },
          { nome: 'Cachaça', descricao: 'A base da nossa caipirinha!', imgSrc: 'https://img.freepik.com/free-photo/cachaca-alcool-bottle-with-lime_23-2148727073.jpg?t=st=1729899302~exp=1729902902~hmac=fb2c07e2ffb91de8fd54e6b282444004d8495482fbb1bc486eb78be3a486bbd7&w=740' },
          { nome: 'Aperol Spritz', descricao: 'O drink que é pura diversão!', imgSrc: 'https://img.freepik.com/free-photo/aperol-spritz-cocktail-ice_23-2148558315.jpg?t=st=1729899368~exp=1729902968~hmac=c07951719be5bca87f769dc5efb376ac64d6f0fa0ed9f0c572774207d9dc1ac7&w=740' },
          { nome: 'Batida de Coco', descricao: 'Uma delícia tropical!', imgSrc: 'https://img.freepik.com/free-photo/coconut-cocktail_23-2148792518.jpg?t=st=1729899437~exp=1729903037~hmac=9ff7ae75b52f78c6600c92e24c1183af2f70648c3eaa25ea0b06f1b7e7b7df58&w=740' },
          { nome: 'Suco Natural', descricao: 'Para refrescar e revitalizar!', imgSrc: 'https://img.freepik.com/free-photo/cocktail-with-fruits-and-lemon_23-2148792519.jpg?t=st=1729899462~exp=1729903062~hmac=554038ea4465a6f243b73974fcb740308c1d85d224b0de28a8b56013f4e7dbb4&w=740' }
        ].map((bebida, index) => (
          <Card key={index} className="bebida-card" onClick={() => handleOrder(bebida.nome)}>
            <Card.Img variant="top" src={bebida.imgSrc} />
            <Card.Body>
              <Card.Title>{bebida.nome}</Card.Title>
              <Card.Text>{bebida.descricao}</Card.Text>
              <Button variant="primary">Pedir</Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="footer">
        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/color/48/000000/instagram-new.png" alt="Instagram" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/color/48/000000/twitter-squared.png" alt="Twitter" />
          </a>
        </div>
        <p>© 2024 Bar do Jao. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default Bebidas;
