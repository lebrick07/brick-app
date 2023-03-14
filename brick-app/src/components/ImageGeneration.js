import React, { useState } from "react";
import axios from "axios";

const apiEndpoint = process.env.REACT_APP_OPENAI_IMAGE_API_URL;

const ImageGeneration = () => {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [prompt, setPrompt] = useState("");

  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const generateImage = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        apiEndpoint,
        {
          model: "image-alpha-001",
          prompt: prompt,
          size: "1024x1024",
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
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to generate image");
    }

    setLoading(false);
  };

  return (
    <div>
      <label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </label>
      {errorMessage && <div>{errorMessage}</div>}
      <button onClick={generateImage} disabled={loading}>
        {loading ? "Generating Image..." : "Generate Image"}
      </button>
      <br />
      {generatedImage && <img src={generatedImage} alt="Generated" />}
    </div>
  );
};

export default ImageGeneration;
