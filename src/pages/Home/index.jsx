import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h1 id="pName">Hamburgueria</h1>
      <button onClick={() => navigate('/categoria-alimentos')}>Cadastro de Categorias de Alimentos</button>
      <button onClick={() => navigate('/cadastro-produtos')}>Cadastro de Produtos</button>
      <button onClick={() => navigate('/cadastro-precos')}>Cadastro e Vinculação de Preços aos Produtos</button>
      <button onClick={() => navigate('/cadastro-clientes')}>Cadastro de Clientes</button>
    </div>
  );
}

export default Home;
