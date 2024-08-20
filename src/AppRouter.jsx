import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoriaAlimentos from './pages/CategoriaAlimentos';
import CadProdutos from './pages/CadastroProdutos';
import CadastroCliente from './pages/CadastroCliente';


function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria-alimentos" element={<CategoriaAlimentos />} />
        <Route path="/cadastro-produtos" element={<CadProdutos />} />
        <Route path="/cadastro-clientes" element={<CadastroCliente />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
