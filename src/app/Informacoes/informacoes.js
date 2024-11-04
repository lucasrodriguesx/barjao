'use client'

import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './informacoes.css'; 
import { FiAlignJustify } from "react-icons/fi";
import { useRouter } from 'next/navigation'; 
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import ptLocale from '@fullcalendar/core/locales/pt';
import { FiUser } from "react-icons/fi";
import { LiaChairSolid } from "react-icons/lia"; 
import { BiDrink } from "react-icons/bi"; 
import { FaShoppingCart } from "react-icons/fa"; 
import { AiOutlineTeam } from "react-icons/ai"; 
import './informacoes.css';
import Home from '../home/home';

const Informacoes = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const goToHome = () => {
    router.push('/'); 
  };

  return (
    <div className="informacoes">
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

      <h1 className="smaller-title mt-4">Informações do Bar</h1>
      
      {showMenu && (
        <div className="menu">
          <ul>
            <li title="Login" onClick={() => router.push('../clientes')}> 
              <FiUser className="menu-icon-item" />
            </li>
            <li title="Reserve a sua Mesa" onClick={() => router.push('../mesas')}>
              <LiaChairSolid className="menu-icon-item" />
            </li>
            <li title="Bebidas" onClick={() => router.push('../bebidas')}>
              <BiDrink className="menu-icon-item" />
            </li>
            <li title="Pedido" onClick={() => router.push('../pedidos')}>
              <FaShoppingCart className="menu-icon-item" />
            </li>
            <li title="Funcionarios" onClick={() => router.push('../funcionarios')}>
              <AiOutlineTeam className="menu-icon-item" />
            </li>
          </ul>
        </div>
      )}

      <div className="content">
        <div className="chart-container charttext" >
          <h2>Gráficos de Vendas</h2>
          <div className="charttext">
            <p>Vendas do mês</p>
            <img className= "graficoimg"src="https://img.freepik.com/vetores-gratis/zoom-de-velocidade-de-tubulacao-de-linhas-de-luz-vermelha-abstrata-na-tecnologia-de-fundo-preto_1142-8971.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid" alt="Gráfico de Vendas 1" />
          </div>
          <div className="charttext">
            <div>
            <p>Comparativo de vendas</p>
            <img  className= "graficoimg" src="https://img.freepik.com/vetores-gratis/linhas-de-luz-de-ouro-abstratas-zoom-de-velocidade-de-tubulacao-na-tecnologia-de-fundo-preto_1142-10811.jpg?uid=R170505820&ga=GA1.1.1696077591.1729889218&semt=ais_hybrid" alt="Gráfico de Vendas 2" />
          </div>
          </div>
        </div>

        <div className="calendar-container">
          <h2>Calendário</h2>
          <FullCalendar
            plugins={[dayGridPlugin]} 
            initialView="dayGridMonth" 
            locales={[ptLocale]} 
            locale='pt' 
             events ={[
              // Adicionando eventos ao calendário
              { title: 'Dia da Cachaça', date: '2024-09-13' },
              { title: 'Dia da Cerveja', date: '2024-04-05' },
              { title: 'Dia de Happy Hour', date: '2024-11-05', description: 'Bar lotado' },
              { title: 'Feriado - Bar Fechado', date: '2024-11-15' },
              { title: 'Dia de Promoção de Bebidas', date: '2024-11-20' },
              { title: 'Evento Especial - Música ao Vivo', date: '2024-11-25' },
              { title: 'Dia do Bar - Lotado', date: '2024-11-30' },
              { title: 'Bar Fechado', date: '2024-12-01' },
            ]}
            eventColor="#FFA500"
            style={{ height: '350px', width: '100%' }} // Estilo do calendário (altura reduzida)
          />
        </div>

        {/* Informações sobre os dias */}
        <div className="event-info">
          <h3>Informações dos Eventos</h3>
          <ul>
            <li><strong>13 de Setembro:</strong> Dia da Cachaça - Celebrações especiais!</li>
            <li><strong>5 de Abril:</strong> Dia da Cerveja - Promoções e ofertas!</li>
            <li><strong>5 de Novembro:</strong> Dia de Happy Hour - Bar lotado, venha cedo!</li>
            <li><strong>15 de Novembro:</strong> Feriado - Bar Fechado.</li>
            <li><strong>20 de Novembro:</strong> Dia de Promoção de Bebidas - Não perca!</li>
            <li><strong>25 de Novembro:</strong> Evento Especial - Música ao Vivo.</li>
            <li><strong>30 de Novembro:</strong> Dia do Bar - Lotado, venha aproveitar!</li>
            <li><strong>1 de Dezembro:</strong> Bar Fechado.</li>
          </ul>
        </div>
      </div>
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

export default Informacoes;
