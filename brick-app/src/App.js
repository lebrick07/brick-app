import React, { useState } from 'react';
import ChatInput from './components/ChatInput';
import ImageGeneration from './components/ImageGeneration';
import AudioTranscript from './components/AudioTranscript';
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

function App() {
  const [selectedOption, setSelectedOption] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [triggerImageGeneration, setTriggerImageGeneration] = useState(false);

  const handleNewMessage = (newMessage) => {
    setConversationHistory([...conversationHistory, newMessage]);
  };

  const handleOptionChange = (event, newOption) => {
    setSelectedOption(newOption);
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
      <Typography variant="h2" sx={{ marginBottom: '20px' }}>Ask me anything</Typography>
      <ToggleButtonGroup
        value={selectedOption}
        exclusive
        onChange={handleOptionChange}
        sx={{ marginBottom: '20px' }}
      >
        <ToggleButton value="chat" sx={{ width: '33%' }}>
          Chat
        </ToggleButton>
        <ToggleButton value="image" sx={{ width: '33%' }}>
          Text to Image
        </ToggleButton>
        <ToggleButton value="audio" sx={{ width: '33%' }}>
          Audio to Text
        </ToggleButton>
      </ToggleButtonGroup>

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
        <AudioTranscript />
      )}
    </Box>
  );
}

export default App;

