// src/app/page.js
import Home from './home/home'; 
import Bebidas from './bebidas/bebidas';
import Client from './clientes/client'
const Page = () => {
  return (
    <div className="home"> {/* Mantendo a classe para garantir o fundo preto */}
      <Home />
    </div>
  );
};

export default Page;
