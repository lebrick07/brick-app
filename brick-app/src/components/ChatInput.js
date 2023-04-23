import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { getConversations, getMessages, addMessageToConversation, addConversation, clearConversation } from '../ApiConnection';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    height: 'calc(100% - 150px)',
    marginTop: theme.spacing(2),
    overflow: 'hidden',
  },
  input: {
    flexGrow: 1,
    marginBottom: theme.spacing(1),
  },
  responseBox: {
    backgroundColor: theme.palette.background.paper,
    margin: `${theme.spacing(1)}px 0`,
    borderRadius: '10px',
    overflowX: 'scroll',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '0.9rem',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  responseBoxCode: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    borderRadius: '10px',
    marginTop: theme.spacing(1),
    overflowX: 'scroll',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '0.9rem',
    [theme.breakpoints.down('sm')]: {
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
    },
    textAlign: 'left',
  },
  chatHistory: {
    marginTop: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '10px',
    padding: theme.spacing(2),
    maxHeight: '300px',
    overflowY: 'scroll',
  },
  chatHistoryEntry: {
    marginBottom: theme.spacing(1),
  },
  errorMessage: {
    color: 'red',
  },
  toggleHistoryButton: {
    marginTop: theme.spacing(1),
  },
  clearConversationButton: {
    marginTop: theme.spacing(1),
  },
  conversationButton: {
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid black',
    padding: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '4px',
    '&.focused': {
      backgroundColor: 'blue',
      color: 'white',
    },
  },
  code: {
    backgroundColor: (theme) =>
      theme.palette && theme.palette.mode === "dark"
        ? "rgb(49, 49, 49)"
        : "rgb(248, 248, 248)",
    color: (theme) =>
      theme.palette && theme.palette.mode === "dark"
        ? "rgb(189, 147, 249)"
        : "rgb(32, 32, 32)",
    padding: "0.2rem 0.5rem",
    borderRadius: "5px",
    fontSize: "1rem",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    wordWrap: "break-word",
    boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
    textAlign: 'left',
  },
  themedButton: {
    backgroundColor: theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.primary.light,
    color: theme.palette.mode === "dark"
      ? theme.palette.primary.contrastText
      : theme.palette.primary.main,
    border: `1px solid ${
      theme.palette.mode === "dark"
        ? theme.palette.primary.main
        : theme.palette.primary.dark
    }`,
    padding: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '4px',
    '&:hover': {
      backgroundColor: theme.palette.mode === "dark"
        ? theme.palette.primary.main
        : theme.palette.primary.dark,
    },
  },
}));

function ChatInput({ onNewMessage, onTriggerImageGeneration }) {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [currentConversation, setCurrentConversation] = useState({ id: '', name: '', index: '' });
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [conversations, setConversations] = useState([]);

  const classes = useStyles();

  const isCode = (text) => {
    const codeIndicators = ['{', '}', ';', '(', ')', '=', '=>', 'function', 'const', 'let', 'var', 'import', 'export'];

    return codeIndicators.some((indicator) => text.includes(indicator));
  };

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
      {response && (
        isCode(response) ? (
          <pre className={classes.responseBoxCode}>
            {response}
          </pre>
        ) : (
          <p className={classes.responseBox}>{response}</p>
        )
      )}
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
            className={`${classes.themedButton} ${
              currentConversation.index === index ? 'focused' : ''
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
          {chatHistory.map((entry, index) => (
            <div key={index} className={classes.chatHistoryEntry}>
              <p>{entry.role.charAt(0).toUpperCase() + entry.role.slice(1)}: {entry.content}</p>
            </div>
          ))}
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
