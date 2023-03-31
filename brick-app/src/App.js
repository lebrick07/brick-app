import React, { useState } from 'react';
import ChatInput from './components/ChatInput';
import ImageGeneration from './components/ImageGeneration';
import AudioTranscript from './components/AudioTranscript';
import BrickBot from './images/brickbot.png';
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';

function App() {
  const [selectedOption, setSelectedOption] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [triggerImageGeneration, setTriggerImageGeneration] = useState(false);

  const handleNewMessage = (newMessage) => {
    setConversationHistory([...conversationHistory, newMessage]);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        '& .MuiTypography-root': {
          color: (theme) => theme.palette.text.primary,
        },
      }}
    >
      <Typography variant="h1">Brickbot</Typography>
      <img
        style={{ width: '200px', height: 'auto' }}
        src={BrickBot}
        alt="Brickbot">
      </img>
      <Typography variant="h2">Ask me anything..</Typography>
      <br></br>
      {/* <FormControl variant="outlined">
        <Select 
          value={selectedOption}
          onChange={handleOptionChange}
          label="Select an option"
          displayEmpty>
          <MenuItem value="">
            <em>Select an option</em>
          </MenuItem>
          <MenuItem value="chat">Chat with Brickbot</MenuItem>
          <MenuItem value="image">Image Generator</MenuItem>
          <MenuItem value="audio">Audio Transcriber</MenuItem>
        </Select>
      </FormControl> */}
      <FormControl variant="outlined" sx={{ borderRadius: '10px' }}>
        <Select 
          value={selectedOption}
          onChange={handleOptionChange}
          label="Select an option"
          displayEmpty
        >
          <MenuItem value="">
            <em>Select an option</em>
          </MenuItem>
          <MenuItem value="chat">Chat with Brickbot</MenuItem>
          <MenuItem value="image">Image Generator</MenuItem>
          <MenuItem value="audio">Audio Transcriber</MenuItem>
        </Select>
      </FormControl>

      {selectedOption === 'chat' && (
        <ChatInput
          onNewMessage={handleNewMessage}
          onTriggerImageGeneration={() => setTriggerImageGeneration(true)}
        />
      )}
      {selectedOption === 'image' && (
        <ImageGeneration
          conversationHistory={conversationHistory}
          triggerImageGeneration={triggerImageGeneration}
          onResetTrigger={() => setTriggerImageGeneration(false)}
        />
      )}
      {selectedOption === 'audio' && (
        <AudioTranscript/>
      )}
    </Box>
  );
}

export default App;
