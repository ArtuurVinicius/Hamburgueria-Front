import React from "react";

function PriceList({ prices, onEdit, onRemove }) {
  return (
    <div>
      <h2>Preços Cadastrados</h2>
      <ul>
        {prices.map((price) => (
          <li key={price.id}>
            <div><strong>Produto:</strong> {price.product}</div>
            <div><strong>Variação:</strong>Variação: {price.variation}</div>
            <div><strong>Preço:</strong> R${price.price.toFixed(2)}</div>
            <div className="formActions">
              <button id='actionEdit' onClick={() => onEdit(price.id)}>Editar</button>
              <button id='actionRemove' onClick={() => onRemove(price.id)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PriceList;
