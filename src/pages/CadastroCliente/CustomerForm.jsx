import React, { useState } from 'react';

const CustomerForm = ({ onSave, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    // Regex para validar o formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Regex para validar o formato do telefone +55 99 99999-9999
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
    onSave({ name, phone, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Telefone:</label>
        <input 
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
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Salvar</button>
    </form>
  );
};

export default CustomerForm;
