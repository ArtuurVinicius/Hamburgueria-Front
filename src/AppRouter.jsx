import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoriaAlimentos from './pages/CategoriaAlimentos';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro-categorias" element={<CategoriaAlimentos />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
