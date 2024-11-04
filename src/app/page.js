
import Home from './home/home'; 
import Client from './clientes/client';
import Mesas from './mesas/mesas';
import Pedidos from './pedidos/pedidos';
import Funcionarios from './funcionarios/funcionarios';
import Bebidas from './bebidas/bebidas';
import Informacoes from './Informacoes/informacoes';
const Page = () => {
  return (
    <div className="home"> {/* Mantendo a classe para garantir o fundo preto */}
      <Home />
    </div>
  );
};

export default Page;
