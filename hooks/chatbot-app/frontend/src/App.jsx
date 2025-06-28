import React, { useState } from 'react';
import Chatbot from './components/Chatbot';
import './App.css';

const App = () => {
    const [messages, setMessages] = useState([]);

    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    return (
        <div className="App">
            <h1>Chatbot Application</h1>
            <Chatbot messages={messages} addMessage={addMessage} />
        </div>
    );
};

export default App;