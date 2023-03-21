// import React, { useState } from "react";
// import axios from "axios";

// const apiEndpoint = process.env.REACT_APP_OPENAI_IMAGE_API_URL;

// const ImageGeneration = () => {
//   const [generatedImage, setGeneratedImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [prompt, setPrompt] = useState("");

//   const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

//   const generateImage = async () => {
//     setLoading(true);
//     setErrorMessage("");

//     try {
//       const response = await axios.post(
//         apiEndpoint,
//         {
//           model: "image-alpha-001",
//           prompt: prompt,
//           size: "512x512",
//           n: 1,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${apiKey}`,
//           },
//         }
//       );

//       const generatedImageUrl = response.data.data[0].url;
//       setGeneratedImage(generatedImageUrl);
//     } catch (error) {
//       console.error(error);
//       setErrorMessage("Failed to generate image");
//     }

//     setLoading(false);
//   };

//   return (
//     <div>
//       <label>
//         <input
//           type="text"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//         />
//       </label>
//       {errorMessage && <div>{errorMessage}</div>}
//       <button onClick={generateImage} disabled={loading}>
//         {loading ? "Generating Image..." : "Generate Image"}
//       </button>
//       <br />
//       {generatedImage && <img src={generatedImage} alt="Generated" className="generated-image" />}
//     </div>
//   );
// };

// export default ImageGeneration;

import React, { useState, useEffect } from "react";
import axios from "axios";

const apiEndpoint = process.env.REACT_APP_OPENAI_IMAGE_API_URL;

const ImageGeneration = ({
  conversationHistory,
  triggerImageGeneration,
  onResetTrigger,
}) => {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [explanation, setExplanation] = useState("");

  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const generateExplanation = async () => {
    setLoadingExplanation(true);
    setErrorMessage("");

    const chatHistoryText = conversationHistory
      .map((entry) => `User: ${entry.message}\nBot: ${entry.response}`)
      .join("\n\n");
    const explanationPrompt = `The chat history is as follows:\n\n${chatHistoryText}\n\nBased on this conversation, provide an explanation for the generated image:`;

    try {
      const response = await axios.post(
        process.env.REACT_APP_OPENAI_URL,
        {
          model: "text-davinci-002",
          prompt: explanationPrompt,
          temperature: 0.5,
          max_tokens: 200,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const generatedExplanation = response.data.choices[0].text;
      setExplanation(generatedExplanation);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to generate explanation");
    }

    setLoadingExplanation(false);
  };

  const generateImage = async () => {
    setLoading(true);
    setErrorMessage("");

    const chatHistoryText = conversationHistory
      .map((entry) => `User: ${entry.message}\nBot: ${entry.response}`)
      .join("\n\n");
    const historyPrompt = `Based on this conversation:\n\n${chatHistoryText}\n\nGenerate an image that is related to the topic discussed in the conversation.`;

    try {
      const response = await axios.post(
        apiEndpoint,
        {
          model: "image-alpha-001",
          prompt: historyPrompt,
          size: "512x512",
          n: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const generatedImageUrl = response.data.data[0].url;
      setGeneratedImage(generatedImageUrl);

      await generateExplanation();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to generate image");
    }

    setLoading(false);
    onResetTrigger();
  };

  useEffect(() => {
    if (triggerImageGeneration) {
      generateImage();
    }
  }, [triggerImageGeneration]);

  return (
    <div>
      {errorMessage && <div>{errorMessage}</div>}
      <button
        onClick={generateImage}
        disabled={loading || loadingExplanation}
      >
        {loading || loadingExplanation
          ? "Generating Image and Explanation..."
          : "Generate Image and Explanation"}
      </button>
      <br />
      {generatedImage && (
        <img src={generatedImage} alt="Generated" className="generated-image" />
      )}
      {explanation && <p>{explanation}</p>}
    </div>
  );
};

export default ImageGeneration;




