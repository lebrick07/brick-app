import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './css/styles.css';
import './css/Navbar.css';
// import About from './components/pages/About';
// import Contact from './components/pages/Contact';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <nav class="navbar">
      <div class="container">
        {/* <a class="navbar-brand" href="#">ChatBot</a> */}
        <div class="navbar-nav">
          <a class="nav-link" href="index">Home</a>
          <a class="nav-link" href="About">About</a>
          <a class="nav-link" href="Contact">Contact</a>
        </div>
      </div>
    </nav>
    <h1>Brick</h1>
    {/* <h2>Ask me anything...</h2> */}
    <App />
    <br></br>
      <footer>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <p>&copy; 2023 <a href="https://brick.autometalabs.io">Autometa Labs</a></p>
          </div>
        </div>
      </div>
      </footer>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();