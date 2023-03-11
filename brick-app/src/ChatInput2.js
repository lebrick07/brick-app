// import React, { useState } from "react";

// function ChatInput() {
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // const url = "https://api.openai.com/v1/chat/completions";
//     const encodedURL = encodeURIComponent('https://api.openai.com/v1/chat/completions');
//     const prompt = message;
//     // const maxTokens = 60;
//     const apiKey = process.env.REACT_APP_CHATGPT_API_KEY; // Replace with your API key
//     // const model = "davinci-codex";

//     const response = await fetch(encodedURL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${apiKey}`,
//       },
//       body: JSON.stringify({
//         prompt,
//         temperature: 0.5,
//         max_tokens: 100,
//         model: "text-davinci-002"
//       }),
//     });

//     const data = await response.json();
//     if (data.choices && data.choices.length > 0) {
//       setResponse(data.choices[0].text);
//     } else {
//       setResponse("Sorry, no response was found.");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Message:
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//         </label>
//         <button type="submit">Send</button>
//       </form>
//       <p>Response: {response}</p>
//     </div>
//   );
// }

// export default ChatInput;

import React, { useState } from "react";

function ChatInput2() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const encodedURL = encodeURIComponent(
      "https://api.openai.com/v1/completions"
    );
    const prompt = message;
    const apiKey = process.env.REACT_APP_CHATGPT_API_KEY;
    const orgName = "org-QaKnT7UlYFf5r5uHNFophP3W";
    const modelName = "text-davinci-002";
    // const apiUrl = `https://api.openai.com/organizations/${orgName}/models/${modelName}/completions`;
    const apiUrl = encodedURL;
    // const org    = process.dev.REACT_APP_ORG_NAME;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        // Organization: org,
      },
      body: JSON.stringify({
        prompt,
        temperature: 0.5,
        max_tokens: 100,
        model: modelName,
        organization: orgName,
      }),
    };

    try {
    //   const response = await fetch(`https://cors-anywhere.herokuapp.com/${apiUrl}`, requestOptions);
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        setResponse(data.choices[0].text);
        setError("");
      } else {
        setResponse("");
        setError("Sorry, no response was found.");
      }
    } catch (error) {
      setError("There was an error processing your request. Please try again later.");
      setResponse("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button type="submit">Send</button>
      </form>
      {error && <p>Error: {error}</p>}
      {response && <p>Response: {response}</p>}
    </div>
  );
}

export default ChatInput2;
