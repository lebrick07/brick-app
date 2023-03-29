import React, { useState } from 'react';
// import React from 'react';
import ChatInput from './components/ChatInput';
import ImageGeneration from './components/ImageGeneration';
import AudioTranscript from './components/AudioTranscript'
import './css/App.css';
import './css/ImageGeneration.css';
import './css/Chat.css';
import BrickBot from './images/brickbot.png';

function App() {
  const [selectedOption, setSelectedOption] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [triggerImageGeneration, setTriggerImageGeneration] = useState(false);

  const handleNewMessage = (newMessage) => {
    setConversationHistory([...conversationHistory, newMessage]);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="App">
      <h1>Brickbot</h1>
      <img
        style={{ width: '200px', height: 'auto' }}
        src={BrickBot}
        alt="Brickbot">
      </img>
      <h2>Ask me anything..</h2>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        <option value="chat">Chat</option>
        <option value="image">Image</option>
        <option value="audio">Audio</option>
      </select>
      {selectedOption === 'chat' && (
        <ChatInput
          onNewMessage={handleNewMessage}
          onTriggerImageGeneration={() => setTriggerImageGeneration(true)}
        />
      )}
      {selectedOption === 'image' && (
        <ImageGeneration
          conversationHistory={conversationHistory}
          triggerImageGeneration={triggerImageGeneration}
          onResetTrigger={() => setTriggerImageGeneration(false)}
        />
      )}
      {selectedOption === 'audio' && (
        <AudioTranscript/>
      )}
    </div>
  );
}


export default App;

