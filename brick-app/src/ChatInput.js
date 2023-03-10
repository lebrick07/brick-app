import React, { useState } from 'react';
import generateResponse from './knowledgeSource';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const output = await generateResponse(input);
    setResponse(output);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Input:
        <input type="text" value={input} onChange={handleInputChange} />
      </label>
      <button type="submit">Submit</button>
      <div>Response: {response}</div>
    </form>
  );
};

export default ChatInput;
