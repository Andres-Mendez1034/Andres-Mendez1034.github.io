import React, { useState, useRef, useEffect } from 'react';
import "../styles/chatbot.css";

const Bot = () => {
  const [messages, setMessages] = useState([
    { sender: 'Orion', text: '¡Hola! Soy Orion, tu asistente virtual.' },
    { sender: 'Tú', text: 'Hola, ¿cómo estás?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showWarning, setShowWarning] = useState(false); // <-- Estado para el mensaje emergente
  const messagesEndRef = useRef(null);

  // 🧩 Diccionario de malas palabras en español (básico pero realista)
  const forbiddenWords = [
    'tonto', 'idiota', 'estúpido', 'imbécil', 'maldito', 
    'mierda', 'pendejo', 'puta', 'puto', 'perra', 
    'joder', 'coño', 'cabron', 'cabrón', 'gilipollas', 
    'mamon', 'mamón', 'zorra', 'culiao', 'pelotudo', 'huevon'
  ];

  const MAX_LENGTH = 100;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue === '') return;

    // Validar longitud
    if (trimmedValue.length > MAX_LENGTH) {
      alert(`El mensaje no puede exceder ${MAX_LENGTH} caracteres.`);
      return;
    }

    // Validar malas palabras
    const containsForbidden = forbiddenWords.some(word =>
      trimmedValue.toLowerCase().includes(word)
    );

    if (containsForbidden) {
      // Mostrar advertencia personalizada
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000); // se oculta después de 3 segundos
      setInputValue('');
      return;
    }

    // Agregar mensaje del usuario
    const newMessages = [...messages, { sender: 'Tú', text: trimmedValue }];
    setMessages(newMessages);
    setInputValue('');

    // Simular respuesta del bot
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'Orion', text: 'Recibí tu mensaje: ' + trimmedValue }]);
    }, 800);
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {/* Cabecera con avatar */}
        <div className="chat-header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712100.png"
            alt="Orion"
            className="bot-avatar"
          />
          <div className="bot-info">
            <h2>Orion</h2>
            <span className="status">En línea</span>
          </div>
        </div>

        {/* Mensajes */}
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === 'Tú' ? 'user-message' : 'bot-message'}`}
            >
              <span className="sender-name">{msg.sender}</span>
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Barra de entrada */}
        <div className="input-bar">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>
            <span>➤</span>
          </button>
        </div>
      </div>

      {/* ⚠️ Mensaje emergente personalizado */}
      {showWarning && (
        <div className="warning-popup">
          <p>Por favor, cuida tu forma de hablar </p>
        </div>
      )}
    </div>
  );
};

export default Bot;
