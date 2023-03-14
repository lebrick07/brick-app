// // import logo from './logo.svg';
// // import './css/App.css';
// // import ChatInput from './ChatInput';
// // import React from 'react';

// // function App() {
// //   return (
// //     <div className="App">
// //       <ChatInput />
// //     </div>
// //   );
// // }

// // export default App

import React, { useState } from 'react';
import ChatInput from './components/ChatInput';
import ImageGeneration from './components/ImageGeneration';
import './css/App.css';

function App() {
  const [conversationHistory, setConversationHistory] = useState([]);

  const handleNewMessage = (newMessage) => {
    setConversationHistory([...conversationHistory, newMessage]);
  };

  return (
    <div className="App">
      <ChatInput onNewMessage={handleNewMessage} />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <ImageGeneration conversationHistory={conversationHistory} />
    </div>
  );
}

export default App;
