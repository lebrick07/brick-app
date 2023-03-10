import React, { useState } from "react";

function ChatInput2() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = "https://api.openai.com/v1/engines/davinci-codex/completions";
    const prompt = message;
    const maxTokens = 60;
    const apiKey = process.env.REACT_APP_CHATGPT_API_KEY; // Replace with your API key

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt,
        max_tokens: maxTokens,
      }),
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      setResponse(data.choices[0].text);
    } else {
      setResponse("Sorry, no response was found.");
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
      <p>Response: {response}</p>
    </div>
  );
}

export default ChatInput2;
