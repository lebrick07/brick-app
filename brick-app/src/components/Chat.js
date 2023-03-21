import { useEffect, useState } from 'react';
import ChatInput from './ChatInput';

function Chat() {
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    // fetch chat log from API and update state
  }, []);

  const handleSendMessage = (message) => {
    // send message to API and update chat log state
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div className="chat-log">
        {chatLog.map((message, index) => (
          <div key={index} className="message">
            <p className="sender">{message.sender}</p>
            <p className="text">{message.text}</p>
          </div>
        ))}
      </div>
      <ChatInput sendMessage={handleSendMessage} />
    </div>
  );
}

export default Chat;
export { ChatInput, ChatOutput };

