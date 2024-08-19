import { useState } from 'react'
import './style.css'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className='container'>
      <h1 id='pName'>Hamburgueria dos Guri</h1>
      <button onClick={() => windowy.location.href='/cadastro-categorias'}>Cadastro de Categorias de Alimentos</button>
      <button onClick={() => window.location.href='/cadastro-produtos'}>Cadastro de Produtos</button>
      <button onClick={() => window.location.href='/cadastro-precos'}>Cadastro e Vinculação de Preços aos Produtos</button>
      <button onClick={() => window.location.href='/cadastro-clientes'}>Cadastro de Clientes</button>
      <button onClick={() => window.location.href='/relatorio-vendas'}>Relatório de Vendas por Produto e Categoria</button>
    </div>
  )
}

export default Home
