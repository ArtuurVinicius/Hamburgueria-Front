import React from 'react';

const CustomerList = ({ customers, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.email} id='cliente'>
            <div>
              <strong>Nome:</strong> {customer.name}
            </div>
            <div id="clienteTelefone">
              <strong>Telefone:</strong> {customer.phone}
            </div>
            <div id="clienteEmail">
              <strong>Email:</strong> {customer.email}
            </div>
            <div className='formActions'>
              <button id='actionEdit' onClick={() => onEdit(customer.email)}>Editar</button>
              <button id='actionRemove' onClick={() => onDelete(customer.email)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
