import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (input) => {
    if (!input.trim()) return;

    const userMessage = { text: input, user: true };
    setMessages([...messages, userMessage]);
    setInput(input);

    try {
      console.log(input)

      const config = {
				headers: {
				    'Content-Type': 'application/json',
            'Accept': '*/*'
				},
        	validateStatus: () =>{ return true;}
			} 
      const response = await axios.post('https://pruebasipi1.vercel.app/chat', { query: input } , config)


      console.log(response)
      // Verificar la estructura de la respuesta
      const botMessageText = response.data?.openai_response?.text || 'Respuesta no disponible';
      const botMessage = { text: botMessageText, user: false };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    
      const errorMessage = { 
        text: `Sorry, there was an error processing your request. ${error.message || ''}`, 
        user: false 
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    };
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat Application</h1>
      </header>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user ? 'user' : 'bot'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;