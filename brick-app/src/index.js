import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CryptoDonations from './components/CryptoDonations';
import GoogleLoginButton, { useGoogleLogin } from './components/GoogleLoginButton';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Settings from './components/pages/Settings';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CssBaseline, Switch, AppBar, Toolbar, IconButton, Typography, Button, Box, Drawer, List, ListItem, ListItemText, } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, grey } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';

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
    MuiListItem: {
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
    MuiListItem: {
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
  const isLoggedIn = useGoogleLogin();
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

  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleNavOpen = () => { setIsNavOpen(true); };
  const handleNavClose = () => { setIsNavOpen(false); };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Switch onChange={handleThemeToggle} />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleNavOpen}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome to Brickbot,{' '}
              {localStorage.getItem('loggedUser') ? localStorage.getItem('loggedUser') : 'explorer'}
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button color="inherit" href="/">
                Home
              </Button>
              <Button color="inherit" href="/about">
                About
              </Button>
              <Button color="inherit" href="/contact">
                Contact
              </Button>
              {isLoggedIn && (
                <Button color="inherit" href="/settings">
                  Settings
                </Button>
              )}
              <Button color="inherit">
                <GoogleLoginButton />
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={isNavOpen} onClose={handleNavClose}>
          <Box sx={{ width: 250 }} role="presentation" onClick={handleNavClose} onKeyDown={handleNavClose}>
            <List>
              <ListItem component={Link} to="/">
                <ListItemText primary="HOME" />
              </ListItem>
              <ListItem component={Link} to="/about">
                <ListItemText primary="ABOUT" />
              </ListItem>
              <ListItem component={Link} to="/contact">
                <ListItemText primary="CONTACT" />
              </ListItem>
              {isLoggedIn && (
                <ListItem component={Link} to="/settings">
                  <ListItemText primary="Settings" />
                </ListItem>
              )}
              <ListItem>
                <GoogleLoginButton />
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 64px - 72px)',
          }}
        >
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {isLoggedIn && <Route path="/settings" element={<Settings />} />}
          </Routes>
        </Box>
        <footer>
          <div className="container">
            <div className="footer-container">
              <div className="footer-center" style={{ textAlign: 'center' }}>
                <p>
                  &copy; 2023 <a href="https://brick.autometalabs.io">Autometa Labs</a>
                </p>
              </div>
              <div className="footer-right" style={{ textAlign: 'center' }}>
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
  <MainApp />
);

reportWebVitals();
