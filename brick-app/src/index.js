import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CryptoDonations from './components/CryptoDonations';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import About from './components/pages/About';
import Contact from './components/pages/Contact';

import { CssBaseline, Switch } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, grey } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: purple[500],
    },
    background: {
      default: grey[900],
      paper: grey[800],
    },
    text: {
      primary: grey[50],
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: purple[500],
    },
    background: {
      default: grey[50],
      paper: grey[100],
    },
    text: {
      primary: grey[900],
    },
  },
});

function MainApp() {
  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  const handleThemeToggle = () => {
    setCurrentTheme(currentTheme === darkTheme ? lightTheme : darkTheme);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Switch onChange={handleThemeToggle} />
      <Router>
        <nav className="navbar">
          <div className="container">
            <div className="navbar-nav">
              <a className="nav-link" href="/">Home</a>
              <a className="nav-link" href="/about">About</a>
              <a className="nav-link" href="/contact">Contact</a>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <br></br>
        <footer>
          <div className="container">
            <div className="footer-container">
              <div className="footer-center">
                <p>&copy; 2023 <a href="https://brick.autometalabs.io">Autometa Labs</a></p>
              </div>
              <div className="footer-right">
                <div className="crypto-donations-container">
                  <CryptoDonations />
                </div>
              </div>
            </div>
          </div>
        </footer>
      </Router>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
