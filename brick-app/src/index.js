import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <h1>Magic Brick</h1>
    <h2>Ask me anything...</h2>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { CssBaseline } from '@mui/material';
// import { ChatInput } from './Chat';
// import { makeStyles } from '@mui/styles';

// const theme = createTheme();

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     border: '2px solid #ccc',
//     padding: theme.spacing(2),
//   },
// }));

// function App() {
//   const classes = useStyles();
//   return (
//     <div className={classes.root}>
//       <ChatInput apiKey={process.env.REACT_APP_CHATGPT_API_KEY} />
//       <ChatOutput apiKey={process.env.REACT_APP_CHATGPT_API_KEY} />
//     </div>
//   );
// }

// ReactDOM.render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <App />
//     </ThemeProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
