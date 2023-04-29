import React, { useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useStyles } from '../css/components/ImageGeneration';
import '../css/components/Loading.css';

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
          model: process.env.REACT_APP_OPENAI_IMAGE_MODEL,
          prompt: prompt,
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
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to generate image");
    }

    setLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      generateImage();
    }
  };

  const classes = useStyles();

  return (
    <div>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className={classes.container}>
          <TextField
            className={classes.input}
            label="Enter your prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {errorMessage && <p className={classes.errorMessage}>Error: {errorMessage}</p>}
          <Button type="submit" variant="contained" onClick={generateImage} disabled={loading}>Generate Image</Button>
          {generatedImage && <img src={generatedImage} alt="Generated" className={classes.generatedImage} />}
        </div>
      )}
    </div>
  );
};

export default ImageGeneration;

