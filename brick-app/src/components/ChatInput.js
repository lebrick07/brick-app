import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { getConversations, getMessages } from '../ApiConnection';

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
}));

function ChatInput({ onNewMessage, onTriggerImageGeneration }) {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [conversationMessages, setConversationMessages] = useState([]);

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
      messages.push(entry);
    });
    messages.push(addMessage(message, true));

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
        setResponse(newResponse);
        setError('');
        setChatHistory((prevHistory) => [
          ...prevHistory,
          addMessage(message, true),
          addMessage(newResponse, false)
        ]);
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
          setConversations(data);
        }).catch((error) => {
          console.error(error);
        });
    }
  };

  const handleGetConversationMessages = (conversation) => {
    if (conversation && conversation.id) {
      getMessages(conversation.id)
        .then((data) => {
          setConversationMessages({conv: conversation, messages: data});
        }).catch((error) => {
          console.error(error);
        });
    }
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
      <Button className={classes.toggleHistoryButton} variant="outlined" size="small" onClick={toggleChatHistory}>
        {showChatHistory ? 'Hide chat history' : 'Show chat history'}
      </Button>
      {showChatHistory && (
        <div className={classes.chatHistory}>
          {chatHistory.map((entry, index) => (
            <div key={index} className={classes.chatHistoryEntry}>
              <p>{entry.role.charAt(0).toUpperCase() + entry.role.slice(1)}: {entry.content}</p>
            </div>
          ))}
        </div>
      )}
      <div>
        <button onClick={handleGetConversations}>Get conversations</button>
        {conversations.map((conversation, index) => (
          <button key={index} onClick={() => handleGetConversationMessages(conversation)}>
            {conversation.topic}
          </button>
        ))}
        {conversationMessages && conversationMessages.messages && (
          <div>
            <h2>{conversationMessages.conv.topic}</h2>
            {conversationMessages.messages.map((msg, index) => (
              <div key={index}><p>{msg.message}</p></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function addMessage(message, isUser) {
  return isUser ?
    { role: "user", content: message } :
    { role: "assistant", content: message }
}

export default ChatInput;
