// import React, { useState } from 'react';
// import ChatInput from './components/ChatInput';
// import ImageGeneration from './components/ImageGeneration';
// import AudioTranscript from './components/AudioTranscript';
// import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

// function App() {
//   const [selectedOption, setSelectedOption] = useState('');
//   const [conversationHistory, setConversationHistory] = useState([]);
//   const [triggerImageGeneration, setTriggerImageGeneration] = useState(false);

//   const handleNewMessage = (newMessage) => {
//     setConversationHistory([...conversationHistory, newMessage]);
//   };

//   const handleOptionChange = (event, newOption) => {
//     setSelectedOption(newOption);
//   };

//   return (
//     <Box
//       sx={{
//         textAlign: 'center',
//         '& .MuiTypography-root': {
//           color: (theme) => theme.palette.text.primary,
//         },
//       }}
//     >
//       <Typography variant="h2">Ask me anything..</Typography>
//       <br />
//       <ToggleButtonGroup
//         value={selectedOption}
//         exclusive
//         onChange={handleOptionChange}
//         sx={{ marginBottom: '20px' }}
//       >
//         <ToggleButton value="chat" sx={{ width: '33%' }}>
//           Chat
//         </ToggleButton>
//         <ToggleButton value="image" sx={{ width: '33%' }}>
//           Generate image
//         </ToggleButton>
//         <ToggleButton value="audio" sx={{ width: '33%' }}>
//           Audio transcriber
//         </ToggleButton>
//       </ToggleButtonGroup>

//       {selectedOption === 'chat' && (
//         <ChatInput
//           onNewMessage={handleNewMessage}
//           onTriggerImageGeneration={() => setTriggerImageGeneration(true)}
//         />
//       )}
//       {selectedOption === 'image' && (
//         <ImageGeneration
//           conversationHistory={conversationHistory}
//           triggerImageGeneration={triggerImageGeneration}
//           onResetTrigger={() => setTriggerImageGeneration(false)}
//         />
//       )}
//       {selectedOption === 'audio' && 
//         <AudioTranscript />}
//     </Box>
//   );
// }

// export default App;

import React, { useState } from 'react';
import ChatInput from './components/ChatInput';
import ImageGeneration from './components/ImageGeneration';
import AudioTranscript from './components/AudioTranscript';
import TextToVideo from './components/TextToVideo'; // Import the TextToVideo component
import GoogleLoginButton from './components/GoogleLoginButton';
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
      <Typography variant="h2">Ask me anything..</Typography>
      <br />
      <GoogleLoginButton />
      <br />
      <ToggleButtonGroup
        value={selectedOption}
        exclusive
        onChange={handleOptionChange}
        sx={{ marginBottom: '20px' }}
      >
        <ToggleButton value="chat" sx={{ width: '25%' }}>
          Chat
        </ToggleButton>
        <ToggleButton value="image" sx={{ width: '25%' }}>
          Generate image
        </ToggleButton>
        <ToggleButton value="audio" sx={{ width: '25%' }}>
          Audio transcriber
        </ToggleButton>
        <ToggleButton value="video" sx={{ width: '25%' }}> {/* Add the new ToggleButton for TextToVideo */}
          Text to Video
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
      {selectedOption === 'video' && ( // Add the TextToVideo component based on the selected option
        <TextToVideo />
      )}
    </Box>
  );
}

export default App;
