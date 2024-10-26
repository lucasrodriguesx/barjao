// src/app/components/bebidas/page.js
"use client"; // Habilita o uso do estado e hooks

import React from 'react';
import Bebidas from './bebidas';
import { useRouter } from 'next/navigation';



const Page = () => {
  const router = useRouter();

  const handlePedido = (bebidaId) => {
    // Navega para a página de pedidos, passando o ID da bebida
    router.push(`/components/pedido?id=${bebidaId}`); 
  };

  return (
    <div>
      <Bebidas onPedido={handlePedido} />
    </div>
  );
};

export default Page;
