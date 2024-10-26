// src/Components/bebidas/Bebidas.js
import React, { useState } from 'react';
import './bebidas.css';

const Bebidas = () => {
  const [bebidas, setBebidas] = useState([]);
  const [nome, setNome] = useState('');
  const [idToEdit, setIdToEdit] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idToEdit !== null) {
      setBebidas(bebidas.map((bebida) => (bebida.id === idToEdit ? { id: idToEdit, nome } : bebida)));
      setIdToEdit(null);
    } else {
      setBebidas([...bebidas, { id: Date.now(), nome }]);
    }
    setNome('');
  };

  const handleEdit = (id) => {
    const bebidaToEdit = bebidas.find((bebida) => bebida.id === id);
    setNome(bebidaToEdit.nome);
    setIdToEdit(id);
  };

  const handleDelete = (id) => {
    setBebidas(bebidas.filter((bebida) => bebida.id !== id));
  };

  return (
    <div className="bebidas">
      <h2>Cadastro de Bebidas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome da bebida"
          required
        />
        <button type="submit">{idToEdit ? 'Atualizar' : 'Adicionar'}</button>
      </form>
      <ul>
        {bebidas.map((bebida) => (
          <li key={bebida.id}>
            {bebida.nome}
            <button onClick={() => handleEdit(bebida.id)}>Editar</button>
            <button onClick={() => handleDelete(bebida.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bebidas;
