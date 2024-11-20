import React, { useState, useEffect } from "react";
import './style.css';
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../services/productService"; // Importe o serviço

function App() {
  const [prices, setPrices] = useState([]);
  const [editingPrice, setEditingPrice] = useState(null);
  const [name, setName] = useState(""); // Alterado para 'name'
  const [category, setCategory] = useState("");
  const [variation, setVariation] = useState("");
  const [price, setPrice] = useState("");

  // Carrega os dados da API ao montar o componente
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const data = await getProducts(); // Obtém os produtos da API
        setPrices(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchPrices();
  }, []);

  // Adiciona ou atualiza o preço via API
  const addOrUpdatePrice = async (priceData) => {
    try {
      if (editingPrice) {
        // Atualizar produto
        await updateProduct(editingPrice.id, priceData);
        setPrices((prevPrices) =>
          prevPrices.map((price) =>
            price.id === editingPrice.id ? { ...priceData, id: editingPrice.id } : price
          )
        );
        setEditingPrice(null);
      } else {
        // Criar novo produto
        const newPrice = await createProduct(priceData);
        setPrices((prevPrices) => [...prevPrices, newPrice]);
      }
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  // Remove um preço via API
  const removePrice = async (id) => {
    try {
      await deleteProduct(id);
      setPrices(prices.filter((price) => price.id !== id));
    } catch (error) {
      console.error("Erro ao remover produto:", error);
    }
  };

  // Edita um preço
  const editPrice = (id) => {
    const priceToEdit = prices.find((price) => price.id === id);
    setEditingPrice(priceToEdit);
  };

  // Submete o formulário de preço
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && category && variation && price > 0) {
      await addOrUpdatePrice({ name, category, variation, price });
      setName(""); // Limpa o campo de nome
      setCategory(""); // Limpa o campo de categoria
      setVariation("");
      setPrice("");
    } else {
      alert("Todos os campos são obrigatórios e o preço deve ser maior que zero.");
    }
  };

  // Atualiza os campos ao editar
  useEffect(() => {
    if (editingPrice) {
      setName(editingPrice.name); // Atualiza 'name'
      setCategory(editingPrice.category);
      setVariation(editingPrice.variation);
      setPrice(editingPrice.price);
    }
  }, [editingPrice]);

  // Função para voltar à página anterior
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="container" id="cadastroPreco">
      {/* Botão de Voltar */}
      <button id="voltar" onClick={goBack}>Voltar</button>

      <h1>Vinculação de Preços</h1>

      {/* Formulário de Preço */}
      <div style={{ position: 'relative' }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              id="nomeProduto"
              type="text"
              value={name} // Alterado para 'name'
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Categoria:</label>
            <input
              id="categoriaProduto"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              <div><strong>Nome:</strong> {price.name}</div> {/* Alterado para 'name' */}
              <div><strong>Categoria:</strong> {price.category}</div>
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
