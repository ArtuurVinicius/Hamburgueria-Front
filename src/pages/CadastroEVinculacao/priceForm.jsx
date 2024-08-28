import React, { useState, useEffect } from "react";

function PriceForm({ addOrUpdatePrice, editingPrice }) {
  const [product, setProduct] = useState("");
  const [variation, setVariation] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (editingPrice) {
      setProduct(editingPrice.product);
      setVariation(editingPrice.variation);
      setPrice(editingPrice.price);
    }
  }, [editingPrice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product && variation && price > 0) {
      addOrUpdatePrice({ product, variation, price });
      setProduct("");
      setVariation("");
      setPrice("");
    } else {
      alert(
        "Todos os campos são obrigatórios e o preço deve ser maior que zero."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Produto:</label>
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Variação:</label>
        <select
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
  );
}

export default PriceForm;
