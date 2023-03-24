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
// import React from 'react';
import ChatInput from './components/ChatInput';
import ImageGeneration from './components/ImageGeneration';
import './css/App.css';
import './css/ImageGeneration.css';
import './css/Chat.css';

function App() {
  const [conversationHistory, setConversationHistory] = useState([]);
  const [triggerImageGeneration, setTriggerImageGeneration] = useState(false);

  const handleNewMessage = (newMessage) => {
    setConversationHistory([...conversationHistory, newMessage]);
  };

  return (
    <div className="App">
      <h2>Ask me anything..</h2>
      <ChatInput
        onNewMessage={handleNewMessage}
        onTriggerImageGeneration={() => setTriggerImageGeneration(true)}
      />
      <br></br>
      <br></br>
      <h2>Wanna see a cool image?</h2>
      <ImageGeneration
        conversationHistory={conversationHistory}
        triggerImageGeneration={triggerImageGeneration}
        onResetTrigger={() => setTriggerImageGeneration(false)}
      />
    </div>
  );
}


export default App;

