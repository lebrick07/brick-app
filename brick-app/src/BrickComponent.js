import React, { useState } from "react";

function ChatInput() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const prompt = message;
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const modelName = process.env.REACT_APP_OPENAI_MODEL;
    const apiUrl = process.env.REACT_APP_OPENAI_URL;

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
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button type="submit">Send</button>
      </form>
      {error && <p>Error: {error}</p>}
      {response && <p className="response-box">{response}</p>}
    </div>
  );
}

export default ChatInput;
