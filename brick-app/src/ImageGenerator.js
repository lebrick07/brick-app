import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

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
      const response = await axios.post('https://api.openai.com/v1/images/generations', {
        model: 'image-alpha-001',
        prompt: conversation,
        n: 1,
        size: '512x512',
        response_format: 'url'
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        }
      });

      setImageURL(response.data.data[0].url);
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
