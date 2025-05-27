document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const whatsapp = urlParams.get('whatsapp');
    const interest = urlParams.get('interest');

    const conversationFlow = {
        start: {
            message: `Hola 👋 Soy Melania, copiloto IA de MELANO INC. ¿Querés que activemos tu primer bot de inversión ahora mismo?`,
            options: [
                { text: 'Sí, quiero scalping', next: 'scalping' },
                { text: 'Quiero arbitraje', next: 'arbitraje' },
                { text: 'Contame de los bots', next: 'info' },
                { text: 'Solo quiero mirar', next: 'observe' }
            ]
        },
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

    function displayMessage(message) {
        const chatBox = document.getElementById('chatBox');
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
    }

    function displayOptions(options) {
        const optionsBox = document.getElementById('optionsBox');
        optionsBox.innerHTML = '';
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.addEventListener('click', () => handleOptionClick(option.next));
            optionsBox.appendChild(button);
        });
    }

    function handleOptionClick(nextStep) {
        const next = conversationFlow[nextStep];
        displayMessage(next.message);
        if (next.options.length > 0) {
            displayOptions(next.options);
        }
    }

    // Start the conversation
    displayMessage(conversationFlow.start.message);
    displayOptions(conversationFlow.start.options);
});
