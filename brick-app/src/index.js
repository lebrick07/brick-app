import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './css/styles.css';
import './css/Navbar.css';
import CryptoDonations from './components/CryptoDonations';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import About from './components/pages/About';
import Contact from './components/pages/Contact';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
