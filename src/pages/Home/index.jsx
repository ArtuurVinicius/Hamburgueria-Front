import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Home() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  return (
    <div className='container' id='home'>
      <h1 id='pName'>Hamburgueria</h1>
      <button onClick={() => navigate('/categoria-alimentos')}>Cadastro de Categorias</button>
      <button onClick={() => navigate('/cadastro-produtos')}>Cadastro de Produtos</button>
      <button onClick={() => navigate('/cadastro-precos')}>Vinculação de Preços</button>
      <button onClick={() => navigate('/cadastro-clientes')}>Cadastro de Clientes</button>
    </div>
  );
}

export default Home;
