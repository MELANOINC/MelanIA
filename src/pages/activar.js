import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Activar = () => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [interest, setInterest] = useState('');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission and redirect to Melania conversational flow
    history.push(`/melania_flow?name=${name}&whatsapp=${whatsapp}&interest=${interest}`);
  };

  return (
    <div>
      <header>
        <h1>¿Querés bots que te generen ingresos mientras dormís?</h1>
        <p>Accedé gratis a tu primera estrategia automatizada con Melania IA. Resultados reales, en tiempo real.</p>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="whatsapp">WhatsApp</label>
          <input
            type="text"
            id="whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
          />

          <label htmlFor="interest">¿Qué te interesa?</label>
          <select
            id="interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            required
          >
            <option value="inversion_ia">Inversión IA</option>
            <option value="ventas_automatizadas">Ventas automatizadas</option>
            <option value="ambas">Ambas</option>
          </select>

          <button type="submit">Hablá con Melania</button>
        </form>
      </main>
    </div>
  );
};

export default Activar;
