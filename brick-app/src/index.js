import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CryptoDonations from './components/CryptoDonations';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoogleLoginButton from './components/GoogleLoginButton';

import About from './components/pages/About';
import Contact from './components/pages/Contact';

// eslint-disable-next-line
import { CssBaseline, Switch, AppBar, Toolbar, IconButton, Typography, Button, Box } from '@mui/material';
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
  components: {
    MuiLink: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        root: {
          color: grey[50],
          '&:hover': {
            color: purple[300],
          },
        },
      },
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
  components: {
    MuiLink: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        root: {
          color: grey[900],
          '&:hover': {
            color: purple[500],
          },
        },
      },
    },
  },
});


function MainApp() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme === "dark" ? darkTheme : lightTheme;
    }

    return darkTheme;
  });

  const handleThemeToggle = () => {
    const newTheme = currentTheme === darkTheme ? lightTheme : darkTheme;
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme === darkTheme ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Switch onChange={handleThemeToggle} />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Brickbot
            </Typography>
            <Button color="inherit" href="/">Home</Button>
            <Button color="inherit" href="/about">About</Button>
            <Button color="inherit" href="/contact">Contact</Button>
            <GoogleLoginButton />
          </Toolbar>
        </AppBar>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 64px - 72px)' }}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Box>
        <footer>
          <div className="container">
            <div className="footer-container">
              <div className="footer-center" style={{ textAlign: "center" }}>
                <p>&copy; 2023 <a href="https://brick.autometalabs.io">Autometa Labs</a></p>
              </div>
              <div className="footer-right" style={{ textAlign: "center" }}>
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
