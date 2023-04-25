import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { getConversations, getMessages, addMessageToConversation, addConversation, clearConversation } from '../ApiConnection';
import { useStyles } from '../css/components/ChatInput';

function ChatInput({ onNewMessage, onTriggerImageGeneration }) {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [currentConversation, setCurrentConversation] = useState({ id: '', name: '', index: '' });
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [conversations, setConversations] = useState([]);

  const classes = useStyles();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const modelName = process.env.REACT_APP_OPENAI_TEXT_MODEL;
    const apiUrl = process.env.REACT_APP_OPENAI_URL;

    const messages = [];
    chatHistory.forEach((entry) => {
      messages.push({ role: entry.role, content: entry.content });
    });
    messages.push(createNewMessage(message, true));

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelName,
        messages: messages
      }),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
        const newResponse = data.choices[0].message.content;
        var userMessage = createNewMessage(message, true);
        var assistantResponse = createNewMessage(newResponse, false);

        // If session isn't found, it means that the user isn't logged in
        const session = JSON.parse(localStorage.getItem('session'));
        if (session && session.id !== '') {
          // User is logged in and picked a conversation to continue
          if (currentConversation.id !== '') {
            await addMessageToConversation({ userSessionId: session.id, conversationId: currentConversation.id, content: userMessage.content, role: userMessage.role });
            await addMessageToConversation({ userSessionId: session.id, conversationId: currentConversation.id, content: assistantResponse.content, role: assistantResponse.role });
          } else {
            // TODO: Generate from the Chat response
            var convTopic = 'No topic yet';
            await addConversation({ userSessionId: session.id, topic: convTopic })
              .then(async (data) => {
                await addMessageToConversation({ userSessionId: session.id, conversationId: data, content: userMessage.content, role: userMessage.role });
                await addMessageToConversation({ userSessionId: session.id, conversationId: data, content: assistantResponse.content, role: assistantResponse.role });
                setCurrentConversation(prevConversation => ({ ...prevConversation, id: data, name: convTopic }));
                handleGetConversations();
              }).catch((error) => {
                console.error(error);
              });
          }
        }

        setChatHistory((prevHistory) => [
          ...prevHistory,
          userMessage,
          assistantResponse
        ]);

        setResponse(newResponse);
        setError('');
      } else {
        setResponse('');
        setError('Sorry, no response was found.');
      }
    } catch (error) {
      setError('There was an error processing your request. Please try again later.');
      setResponse('');
    }

    setMessage('');
  };

  const toggleChatHistory = () => {
    setShowChatHistory((prevShow) => !prevShow);
  };

  const handleGetConversations = () => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session && session.id !== '') {
      getConversations(session.id)
        .then((data) => {
          if (data.length > 0) {
            setConversations(data);
          }
        }).catch((error) => {
          console.error(error);
        });
    }
  };

  const handleGetConversationMessages = (conversation, idx) => {
    const session = JSON.parse(localStorage.getItem('session'));

    if (session && session.id !== '' && conversation && conversation.id) {
      getMessages(session.id, conversation.id)
        .then((data) => {
          setChatHistory(data);
          setCurrentConversation(({ id: conversation.id, name: conversation.topic, index: idx }));

          if (!showChatHistory) {
            toggleChatHistory();
          }
        }).catch((error) => {
          console.error(error);
        });
    }
  }

  const handleClearConversation = (conversationId) => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session && session.id !== '') {
      clearConversation({ userSessionId: session.id, conversationId: conversationId })
        .then(() => {
          setConversations(prevConversations => {
            return prevConversations.filter(conversation => conversation.id !== conversationId);
          });

          handleNewConversation();
        }).catch((error) => {
          console.error(error);
        });
    }
  }

  const handleNewConversation = () => {
    setCurrentConversation({ id: '', name: '', index: '' });
    setChatHistory([]);
    setResponse('');
  }

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.input}
          label="Enter your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
      {error && <p className={classes.errorMessage}>Error: {error}</p>}
      {response && (<p className={classes.responseBox}>{response}</p>)}
      <div>
        <button
          className={classes.themedButton}
          onClick={handleNewConversation}
        >
          New conversation
        </button>
        <button
          className={classes.themedButton}
          onClick={handleGetConversations}
        >
          Get conversations
        </button>
        <br></br>
        {conversations.map((conversation, index) => (
          <button
            key={index}
            onClick={() => handleGetConversationMessages(conversation, index)}
            className={`${classes.themedButton} ${currentConversation.index === index ? 'focused' : ''
              }`}
          >
            {conversation.topic}
          </button>
        ))}
      </div>
      <Button className={classes.toggleHistoryButton} variant="outlined" size="small" onClick={toggleChatHistory}>
        {showChatHistory ? 'Hide chat history' : 'Show chat history'}
      </Button>
      {showChatHistory && (
        <div className={classes.chatHistory}>
          <h1>Topic: {currentConversation.name}</h1>
          {chatHistory.map((entry, index) => {
            const splitContent = entry.content.split('```');
            return (
              <div key={index} className={classes.chatHistoryEntry}>
                {entry.role.charAt(0).toUpperCase() + entry.role.slice(1)}:{' '}
                {splitContent.map((text, i) => {
                  if (i % 2 === 1) {
                    return (
                      <p key={i} className={classes.codeBlock}>
                        {text}
                      </p>
                    );
                  } else {
                    return text;
                  }
                })}
              </div>
            );
          })}
        </div>
      )}
      {conversations.length > 0 && currentConversation.id !== '' && (
        <div>
          <Button className={classes.clearConversationButton} variant="outlined" size="small" onClick={() => handleClearConversation(currentConversation.id)}>
            Clear conversation
          </Button>
        </div>
      )}
    </div>
  );
}

function createNewMessage(message, isUser) {
  return isUser ?
    { role: "user", content: message } :
    { role: "assistant", content: message }
}

export default ChatInput;
