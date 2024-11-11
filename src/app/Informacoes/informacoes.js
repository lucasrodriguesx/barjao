'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bar } from 'react-chartjs-2'; // Usando gráfico de barras
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FiAlignJustify } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import './informacoes.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Informacoes = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const storedPedidos = localStorage.getItem('pedidos');
    const storedClientes = localStorage.getItem('clients');
    if (storedPedidos) setPedidos(JSON.parse(storedPedidos));
    if (storedClientes) setClientes(JSON.parse(storedClientes));
  }, []);

  // Dados para o gráfico de barras
  const data = {
    labels: ['Total de Pedidos', 'Total de Clientes'], // Nomes das barras
    datasets: [
      {
        label: 'Totais',
        data: [pedidos.length, clientes.length], // Total de pedidos e clientes
        backgroundColor: ['rgba(255, 165, 0, 1)', 'rgba(54, 162, 235, 1)'], // Laranja para pedidos e azul para clientes
        borderColor: ['rgba(255, 165, 0, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Opções para o gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Totais de Pedidos e Clientes',
      },
    },
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const goToHome = () => {
    router.push('/');
  };

  return (
    <div className="sales-dashboard">
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

      <h1 className="smaller-title mt-4">Dashboard de Vendas</h1>
      
      {showMenu && (
        <div className="menu">
          <ul>
            <li onClick={() => router.push('../pedidos')}>
              <FaShoppingCart className="menu-icon-item" />
            </li>
          </ul>
        </div>
      )}

      <div className="content">
        <div className="chart-container">
          <h2>Totais de Pedidos e Clientes</h2>
          <Bar data={data} options={options} />
        </div>
        
        <div className="clientes-info">
          <h2>Clientes Registrados</h2>
          <p>Total de Registros: {clientes.length}</p>
          <ul>
            {clientes.map(client => (
              <li key={client.id}>
                <p><strong>Nome:</strong> {client.name}</p>
                <p><strong>E-mail:</strong> {client.email}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="pedidos-info">
          <h2>Pedidos Totais</h2>
          <p>Total de Pedidos: {pedidos.length}</p>
          <ul>
            {pedidos.map(pedido => (
              <li key={pedido.id}>
                <p><strong>Produto:</strong> {pedido.produto}</p>
                <p><strong>Preço:</strong> R${pedido.preco}</p>
                <p><strong>Data:</strong> {new Date(pedido.data).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Informacoes;
