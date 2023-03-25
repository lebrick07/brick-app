import React, { useState, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

function ChatInput() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatHistory, setShowChatHistory] = useState(false);

  const chatHistoryRef = useRef(null);

  const isCode = (text) => {
    const codeIndicators = ['{', '}', ';', '(', ')', '=', '=>', 'function', 'const', 'let', 'var', 'import', 'export'];
  
    return codeIndicators.some((indicator) => text.includes(indicator));
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add your API key, model name, and API URL here.
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const modelName = process.env.REACT_APP_OPENAI_TEXT_MODEL;
    const apiUrl = process.env.REACT_APP_OPENAI_URL;

    const historyPrompt = chatHistory.map((entry) => `User: ${entry.message}\n ${entry.response}`).join('\n\n');
    const prompt = `${historyPrompt}\n\nUser: ${message}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt,
        temperature: 0.5,
        max_tokens: 2000,
        model: modelName,
      }),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const newResponse = data.choices[0].text;
        setResponse(newResponse);
        setError('');
        setChatHistory((prevHistory) => [...prevHistory, { message, response: newResponse }]);
      } else {
        setResponse('');
        setError('Sorry, no response was found.');
      }
    } catch (error) {
      setError('There was an error processing your request. Please try again later.');
      setResponse('');
    }

    setMessage('');
  };

  const toggleChatHistory = () => {
    setShowChatHistory((prevShow) => !prevShow);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <button type="submit">Send</button>
      </form>
      {error && <p>Error: {error}</p>}
      {response && (
        isCode(response) ? (
          <pre className="response-box">
            <SyntaxHighlighter style={dracula}>
              {response}
            </SyntaxHighlighter>
          </pre>
        ) : (
          <p className="response-box2">{response}</p>
        )
      )}
      <button onClick={toggleChatHistory}>
        {showChatHistory ? 'Hide chat history' : 'Show chat history'}
      </button>
      {showChatHistory && (
        <div className="chat-history" ref={chatHistoryRef}>
          {chatHistory.map((entry, index) => (
            <div key={index}>
              <p>User: {entry.message}</p>
              <p>Bot: {entry.response}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatInput;