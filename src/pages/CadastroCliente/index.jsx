import React, { useState, useEffect } from 'react';
import './style.css';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../../services/customerService';

const CadastroCliente = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSave = async (customer) => {
    try {
      if (customer.id) {
        const updatedCustomer = await updateCustomer(customer.id, customer);
        setCustomers(customers.map(c => (c.id === customer.id ? updatedCustomer : c)));
      } else {
        const newCustomer = await createCustomer(customer);
        setCustomers([...customers, newCustomer]);
      }
      setEditingCustomer(null);
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const handleEdit = (id) => {
    const customer = customers.find(c => c.id === id);
    setEditingCustomer(customer);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      setCustomers(customers.filter(c => c.id !== id));
    } catch (error) {
      console.error('Erro ao remover cliente:', error);
    }
  };

  const CustomerForm = ({ onSave, initialData }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [phone, setPhone] = useState(initialData?.phone || '');
    const [email, setEmail] = useState(initialData?.email || '');
    const [id, setId] = useState(initialData?.id || null);
    const [error, setError] = useState('');

    useEffect(() => {
      setName(initialData?.name || '');
      setPhone(initialData?.phone || '');
      setEmail(initialData?.email || '');
      setId(initialData?.id || null);
    }, [initialData]);

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
      const phoneRegex = /^\+55 \d{2} \d{5}-\d{4}$/;
      return phoneRegex.test(phone);
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!validateEmail(email)) {
        setError('Email inválido.');
        return;
      }

      if (!validatePhone(phone)) {
        setError('Telefone inválido. Use o formato +55 99 99999-9999.');
        return;
      }

      setError('');
      onSave({ id, name, phone, email });
    };

    const handleCancel = () => {
      setName('');
      setPhone('');
      setEmail('');
      setId(null);
      setError('');
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            id="clienteNome"
            type="text"
            placeholder="João"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            id="clienteTelefone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="+55 99 99999-9999"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            id="clienteEmail"
            type="email"
            placeholder="joao@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="formActions">
          <button className="formButton" type="submit">Salvar</button>
          <button className="formButton" type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    );
  };

  const CustomerList = ({ customers, onEdit, onDelete }) => {
    return (
      <div>
        <h2>Lista de Clientes</h2>
        <ul>
          {customers.map((customer) => (
            <li key={customer.id} id="cliente">
              <div>
                <strong>Nome:</strong> {customer.name}
              </div>
              <div id="telefoneCard">
                <strong>Telefone:</strong> {customer.phone}
              </div>
              <div id="emailCard">
                <strong>Email:</strong> {customer.email}
              </div>
              <div className="formActions">
                <button id="actionEdit" onClick={() => onEdit(customer.id)}>Editar</button>
                <button id="actionRemove" onClick={() => onDelete(customer.id)}>Remover</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="container">
      <button id="voltar" onClick={handleBack}>Voltar</button> {/* Botão de Voltar */}
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
