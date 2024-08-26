import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoriaAlimentos from './pages/CategoriaAlimentos';
import CadEVinculacao from './pages/CadastroEVinculacao';
import CadProdutos from './pages/CadastroProdutos';
import CadastroCliente from './pages/CadastroCliente';


function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria-alimentos" element={<CategoriaAlimentos />} />
        <Route path="/cadastro-precos" element={<CadEVinculacao />} />
        <Route path="/cadastro-produtos" element={<CadProdutos />} />
        <Route path="/cadastro-clientes" element={<CadastroCliente />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
