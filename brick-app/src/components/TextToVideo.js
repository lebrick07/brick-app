import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import ReactPlayer from 'react-player';
import { useStyles } from '../css/components/TextToVideo';

function TextToVideo() {
  const [inputText, setInputText] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');
  const classes = useStyles();

  const generateVideo = async () => {
    try {
      const generatedText = await callOpenAI(inputText);
      const response = await callVideoGenerationService(generatedText);
      setVideoUrl(response.videoUrl);
      setError('');
    } catch (error) {
      setError('There was an error processing your request. Please try again later.');
      setVideoUrl('');
    }
  };

  const callOpenAI = async (text) => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const modelName = process.env.REACT_APP_OPENAI_TEXT_MODEL;
    const apiUrl = process.env.REACT_APP_OPENAI_URL;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: text,
        temperature: 0.5,
        max_tokens: 2000,
        model: modelName,
      }),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].text;
      } else {
        throw new Error('No response was found.');
      }
    } catch (error) {
      console.error('Error in callOpenAI:', error.message);
      throw error;
    }
  };

  const callVideoGenerationService = async (generatedText) => {
    const videoGenerationApiKey = process.env.REACT_APP_VIDEO_GENERATION_API_KEY;
    const videoGenerationApiUrl = process.env.REACT_APP_VIDEO_GENERATION_API_URL;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${videoGenerationApiKey}`,
      },
      body: JSON.stringify({
        text: generatedText,
      }),
    };

    try {
      const response = await fetch(videoGenerationApiUrl, requestOptions);

      if (response.headers.get('Content-Type').includes('application/json')) {
        const data = await response.json();

        if (data.videoUrl) {
          return data.videoUrl;
        } else {
          throw new Error('No video URL was found.');
        }
      } else {
        const errorMessage = await response.text();
        throw new Error(`Unexpected content type. Error message: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error in callVideoGenerationService:', error.message);
      throw error;
    }
  };



  return (
    <div className={classes.container}>
      <TextField
        className={classes.input}
        label="Enter text to generate video"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={generateVideo}>
                <MovieCreationIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {error && <p className={classes.errorMessage}>Error: {error}</p>}
      {videoUrl && (
        <div className={classes.videoPlayerWrapper}>
          <ReactPlayer url={videoUrl} controls={true} />
        </div>
      )}
    </div>
  );
}

export default TextToVideo;
