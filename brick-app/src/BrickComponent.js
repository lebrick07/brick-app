// import React, { useState } from "react";

// function ChatInput() {
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState("");
//   const [error, setError] = useState("");
//   const [history, setHistory] = useState([]);

//   const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
//   const modelName = process.env.REACT_APP_OPENAI_MODEL;
//   const apiUrl = process.env.REACT_APP_OPENAI_URL;

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const prompt = buildPrompt();
//     const requestOptions = buildRequestOptions(prompt);

//     try {
//       const response = await fetch(apiUrl, requestOptions);
//       const data = await response.json();
//       if (data.choices && data.choices.length > 0) {
//         const botResponse = data.choices[0].text;
//         const updatedHistory = [...history, { message, response: botResponse }];
//         setHistory(updatedHistory);
//         setResponse(botResponse);
//         setError("");
//       } else {
//         setResponse("");
//         setError("Sorry, no response was found.");
//       }
//     } catch (error) {
//       setError("There was an error processing your request. Please try again later.");
//       setResponse("");
//     }
//   };

//   const buildPrompt = () => {
//     if (history.length === 0) {
//       return message;
//     } else {
//       const lastMessage = history[history.length - 1].message;
//       const lastResponse = history[history.length - 1].response;
//       return `${lastMessage}\n\n${lastResponse}\n\n${message}`;
//     }
//   };

//   const buildRequestOptions = (prompt) => {
//     return {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${apiKey}`,
//       },
//       body: JSON.stringify({
//         prompt,
//         temperature: 0.5,
//         max_tokens: 100,
//         model: modelName,
//       }),
//     };
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//         </label>
//         <button type="submit">Send</button>
//       </form>
//       {error && <p>Error: {error}</p>}
//       {response && <p className="response-box2">{response}</p>}
//       {/* {response} */}
//       <div className="chat-history">
//       <div className="history-box">
//         {history.map((entry, index) => (
//           <div key={index}>
//             <p className="response-box"><b>User:</b> {entry.message}</p>
//             <p className="response-box"><b>Bot:</b> {entry.response}</p>
//           </div>
//         ))}
//       </div>
//       </div>
//     </div>
//   );
// }

// export default ChatInput;

//////////////////////////////////////////////////////////

// import React, { useState, useRef } from "react";

// function ChatInput() {
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState("");
//   const [error, setError] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [showChatHistory, setShowChatHistory] = useState(false);

//   const chatHistoryRef = useRef(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const prompt = message;
//     const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
//     const modelName = process.env.REACT_APP_OPENAI_MODEL;
//     const apiUrl = process.env.REACT_APP_OPENAI_URL;

//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${apiKey}`,
//       },
//       body: JSON.stringify({
//         prompt,
//         temperature: 0.5,
//         max_tokens: 100,
//         model: modelName,
//       }),
//     };

//     try {
//       const response = await fetch(apiUrl, requestOptions);
//       const data = await response.json();
//       if (data.choices && data.choices.length > 0) {
//         const newResponse = data.choices[0].text;
//         setResponse(newResponse);
//         setError("");
//         setChatHistory((prevHistory) => [...prevHistory, { message, response: newResponse }]);
//       } else {
//         setResponse("");
//         setError("Sorry, no response was found.");
//       }
//     } catch (error) {
//       setError("There was an error processing your request. Please try again later.");
//       setResponse("");
//     }

//     setMessage("");
//   };

//   const toggleChatHistory = () => {
//     setShowChatHistory((prevShow) => !prevShow);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//         </label>
//         <button type="submit">Send</button>
//       </form>
//       {error && <p>Error: {error}</p>}
//       {response && <p className="response-box2">{response}</p>}
//       <button onClick={toggleChatHistory}>
//         {showChatHistory ? "Hide chat history" : "Show chat history"}
//       </button>
//       {showChatHistory && (
//         <div className="chat-history" ref={chatHistoryRef}>
//           {chatHistory.map((entry, index) => (
//             <div key={index}>
//               <p>User: {entry.message}</p>
//               <p>Bot: {entry.response}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChatInput;

////////////////////////////////////////

import React, { useState, useRef } from "react";

function ChatInput() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatHistory, setShowChatHistory] = useState(false);

  const chatHistoryRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const modelName = process.env.REACT_APP_OPENAI_MODEL;
    const apiUrl = process.env.REACT_APP_OPENAI_URL;

    const historyPrompt = chatHistory.map((entry) => `User: ${entry.message}\n ${entry.response}`).join("\n\n");
    const prompt = `${historyPrompt}\n\nUser: ${message}`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt,
        temperature: 0.5,
        max_tokens: 100,
        model: modelName,
      }),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const newResponse = data.choices[0].text;
        setResponse(newResponse);
        setError("");
        setChatHistory((prevHistory) => [...prevHistory, { message, response: newResponse }]);
      } else {
        setResponse("");
        setError("Sorry, no response was found.");
      }
    } catch (error) {
      setError("There was an error processing your request. Please try again later.");
      setResponse("");
    }

    setMessage("");
  };

  const toggleChatHistory = () => {
    setShowChatHistory((prevShow) => !prevShow);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button type="submit">Send</button>
      </form>
      {error && <p>Error: {error}</p>}
      {response && <p className="response-box2">{response}</p>}
      <button onClick={toggleChatHistory}>
        {showChatHistory ? "Hide chat history" : "Show chat history"}
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
