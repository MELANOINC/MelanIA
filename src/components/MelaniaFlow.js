import React, { useState } from 'react';

const MelaniaFlow = ({ name, whatsapp, interest }) => {
  const [conversation, setConversation] = useState([
    {
      message: `Hola 👋 Soy Melania, copiloto IA de MELANO INC. ¿Querés que activemos tu primer bot de inversión ahora mismo?`,
      options: [
        { text: 'Sí, quiero scalping', next: 'scalping' },
        { text: 'Quiero arbitraje', next: 'arbitraje' },
        { text: 'Contame de los bots', next: 'info' },
        { text: 'Solo quiero mirar', next: 'observe' }
      ]
    }
  ]);

  const conversationFlow = {
    scalping: {
      message: `Perfecto, aquí tienes el link de activación: [link de activación]. ¿Necesitás ayuda con algo más?`,
      options: [
        { text: 'No, gracias', next: 'end' },
        { text: 'Sí, quiero una llamada de cierre', next: 'call' }
      ]
    },
    arbitraje: {
      message: `Genial, aquí tienes el link de activación: [link de activación]. ¿Necesitás ayuda con algo más?`,
      options: [
        { text: 'No, gracias', next: 'end' },
        { text: 'Sí, quiero una llamada de cierre', next: 'call' }
      ]
    },
    info: {
      message: `Los bots de Melania IA pueden ayudarte con scalping y arbitraje. ¿Querés activar uno ahora?`,
      options: [
        { text: 'Sí, quiero scalping', next: 'scalping' },
        { text: 'Quiero arbitraje', next: 'arbitraje' },
        { text: 'No, gracias', next: 'end' }
      ]
    },
    observe: {
      message: `Entiendo, puedes observar cómo funcionan los bots en nuestro panel de rendimiento: [link al panel]. ¿Necesitás ayuda con algo más?`,
      options: [
        { text: 'No, gracias', next: 'end' },
        { text: 'Sí, quiero una llamada de cierre', next: 'call' }
      ]
    },
    call: {
      message: `Perfecto, agenda una llamada con uno de nuestros especialistas aquí: [link para agendar llamada].`,
      options: [
        { text: 'Gracias', next: 'end' }
      ]
    },
    end: {
      message: `Gracias por tu tiempo. Si necesitas algo más, no dudes en contactarnos. ¡Hasta luego!`,
      options: []
    }
  };

  const handleOptionClick = (nextStep) => {
    const next = conversationFlow[nextStep];
    setConversation([...conversation, next]);
  };

  return (
    <div>
      {conversation.map((step, index) => (
        <div key={index}>
          <p>{step.message}</p>
          {step.options.length > 0 && (
            <div>
              {step.options.map((option, idx) => (
                <button key={idx} onClick={() => handleOptionClick(option.next)}>
                  {option.text}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MelaniaFlow;
