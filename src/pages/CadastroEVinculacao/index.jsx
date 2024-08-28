import React, { useState } from "react";
import PriceForm from "./priceForm";
import PriceList from "./PriceList";
import './style.css';

function App() {
  const [prices, setPrices] = useState([]);
  const [editingPrice, setEditingPrice] = useState(null);

  const addOrUpdatePrice = (priceData) => {
    if (editingPrice) {
      // Update existing price
      setPrices((prevPrices) =>
        prevPrices.map((price) =>
          price.id === editingPrice.id ? priceData : price
        )
      );
      setEditingPrice(null);
    } else {
      // Add new price
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

  return (
    <div className="container">
      <h1>Cadastro e Vinculação de Preços aos Produtos</h1>
      <PriceForm addOrUpdatePrice={addOrUpdatePrice} editingPrice={editingPrice} />
      <PriceList prices={prices} onEdit={editPrice} onRemove={removePrice} />
    </div>
  );
}

export default App;
