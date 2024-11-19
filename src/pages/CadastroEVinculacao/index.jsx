import React, { useState, useEffect } from "react";
import './style.css';

function App() {
  const [prices, setPrices] = useState([]);
  const [editingPrice, setEditingPrice] = useState(null);
  const [product, setProduct] = useState("");
  const [variation, setVariation] = useState("");
  const [price, setPrice] = useState("");

  const addOrUpdatePrice = (priceData) => {
    if (editingPrice) {
      setPrices((prevPrices) =>
        prevPrices.map((price) =>
          price.id === editingPrice.id ? priceData : price
        )
      );
      setEditingPrice(null);
    } else {
      setPrices([...prices, { ...priceData, id: Date.now() }]);
    }
  };

  const removePrice = (id) => {
    setPrices(prices.filter((price) => price.id !== id));
  };

  const editPrice = (id) => {
    const priceToEdit = prices.find((price) => price.id === id);
    setEditingPrice(priceToEdit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product && variation && price > 0) {
      addOrUpdatePrice({ product, variation, price });
      setProduct("");
      setVariation("");
      setPrice("");
    } else {
      alert("Todos os campos são obrigatórios e o preço deve ser maior que zero.");
    }
  };

  useEffect(() => {
    if (editingPrice) {
      setProduct(editingPrice.product);
      setVariation(editingPrice.variation);
      setPrice(editingPrice.price);
    }
  }, [editingPrice]);

  return (
    <div className="container" id="cadastroPreco">
      <h1>Cadastro e Vinculação de Preços aos Produtos</h1>

      {/* Formulário de Preço */}
      <div style={{ position: 'relative' }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Produto:</label>
            <input
              id="precoProduto"
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Variação:</label>
            <select
              id="variacaoProduto"
              value={variation}
              onChange={(e) => setVariation(e.target.value)}
              required
            >
              <option value="">Selecione uma variação</option>
              <option value="Pequeno">Pequeno</option>
              <option value="Médio">Médio</option>
              <option value="Grande">Grande</option>
            </select>
          </div>

          <div>
            <label>Preço:</label>
            <input
              id="precoProduto"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
            />
          </div>
          <button type="submit">
            {editingPrice ? "Atualizar Preço" : "Adicionar Preço"}
          </button>
        </form>
      </div>

      {/* Lista de Preços */}
      <div>
        <h2>Preços Cadastrados</h2>
        <ul>
          {prices.map((price) => (
            <li key={price.id}>
              <div><strong>Produto:</strong> {price.product}</div>
              <div><strong>Variação:</strong> {price.variation}</div>
              <div><strong>Preço:</strong> R${price.price.toFixed(2)}</div>
              <div className="formActions">
                <button id='actionEdit' onClick={() => editPrice(price.id)}>Editar</button>
                <button id='actionRemove' onClick={() => removePrice(price.id)}>Remover</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
