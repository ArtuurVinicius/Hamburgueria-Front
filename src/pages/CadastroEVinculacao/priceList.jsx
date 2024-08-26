import React from "react";

function PriceList({ prices, onEdit, onRemove }) {
  return (
    <div>
      <h2>Preços Cadastrados</h2>
      <ul>
        {prices.map((price) => (
          <li key={price.id}>
            <div>Produto: {price.product}</div>
            <div>Variação: {price.variation}</div>
            <div>Preço: R${price.price.toFixed(2)}</div>
            <button onClick={() => onEdit(price.id)}>Editar</button>
            <button onClick={() => onRemove(price.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PriceList;
