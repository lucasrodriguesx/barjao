"use client"; // Habilita o uso do estado e hooks

import Bebidas from './bebidas';
import React from 'react';
import { useRouter } from 'next/navigation';



const Page = () => {
  const router = useRouter();

  const handlePedido = (bebidaId) => {
    router.push(`/src/app/pedidos?id=${bebidaId}`); 
  };

  return (
    <div>
      <Bebidas onPedido={handlePedido} />
    </div>
  );
};

export default Page;
