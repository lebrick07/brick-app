import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import openai from "openai";

const ImageGeneration = ({ conversation }) => {
  const [imageURL, setImageURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    if (timeRemaining === 0) {
      setShowButton(true);
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [timeRemaining]);

  const generateImage = async () => {
    setIsLoading(true);
  
    try {
      const response = await openai.createImageVariation({
        model: 'image-alpha-001',
        prompt: conversation,
        size: '512x512',
        n: 1,
      });
  
      setImageURL(response.output[0].data.url);
    } catch (error) {
      console.log(error);
    }
  
    setIsLoading(false);
  }
  
  return (
    <div>
      {timeRemaining > 0 &&
        <h4>Time remaining: {timeRemaining}</h4>
      }
      {showButton &&
        <Button onClick={generateImage}>Generate Image</Button>
      }
      {isLoading &&
        <p>Loading...</p>
      }
      {imageURL &&
        <img src={imageURL} alt="Generated" />
      }
    </div>
  );
}

export default ImageGeneration;

