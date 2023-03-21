// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './css/index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import './css/styles.css';
// import './css/Navbar.css';
// import CryptoDonations from './components/CryptoDonations';

// // import About from './components/pages/About';
// // import Contact from './components/pages/Contact';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <nav class="navbar">
//       <div class="container">
//         {/* <a class="navbar-brand" href="#">ChatBot</a> */}
//         <div class="navbar-nav">
//           <a class="nav-link" href="/">Home</a>
//           <a class="nav-link" href="./components/About">About</a>
//           <a class="nav-link" href="./components/Contact">Contact</a>
//         </div>
//       </div>
//     </nav>
//     <h1>Brick</h1>
//     {/* <h2>Ask me anything...</h2> */}
//     <App />
//     <br></br>
//     <footer>
//     <div className="container">
//       <div className="footer-container">
//         <div className="footer-center">
//           <p>&copy; 2023 <a href="https://brick.autometalabs.io">Autometa Labs</a></p>
//         </div>
//         <div className="footer-right">
//         <div className="crypto-donations-container">
//           <CryptoDonations />
//         </div>
//         </div>
//       </div>
//     </div>
//   </footer>


//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

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
