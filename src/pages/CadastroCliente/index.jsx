import React, { useState } from 'react';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import './style.css';

const CadastroCliente = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const handleSave = (customer) => {
    const existingCustomerIndex = customers.findIndex(c => c.email === customer.email);
    
    if (existingCustomerIndex > -1) {
      const updatedCustomers = [...customers];
      updatedCustomers[existingCustomerIndex] = customer;
      setCustomers(updatedCustomers);
    } else {
      setCustomers([...customers, customer]);
    }

    setEditingCustomer(null);
  };

  const handleEdit = (email) => {
    const customer = customers.find(c => c.email === email);
    setEditingCustomer(customer);
  };

  const handleDelete = (email) => {
    const updatedCustomers = customers.filter(c => c.email !== email);
    setCustomers(updatedCustomers);
  };

  return (
    <div className="container">
      <h1>Cadastro de Clientes</h1>
      <CustomerForm 
        onSave={handleSave} 
        initialData={editingCustomer} 
      />
      <CustomerList 
        customers={customers} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default CadastroCliente;
