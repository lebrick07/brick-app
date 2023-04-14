const mysql = require('mysql');
const http = require('http');
const cors = require('cors');
const { getAllUsers, addUser } = require('./routes/Users');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_URL,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected to the database!');

  // Create an HTTP server
  const server = http.createServer(function (req, res) {
    // Enable CORS for all requests
    cors()(req, res, function () {
      if (req.method === 'GET' && req.url === '/users') {
        getAllUsers(req, res, connection);
      } else if (req.method === 'POST' && req.url === '/addUser') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          const { name, email, is_email_verified, clientId } = JSON.parse(body);
          addUser(name, email, is_email_verified, clientId, connection)
            .then(user => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(user));
            })
            .catch(error => {
              console.error('Error adding user:', error);
              res.statusCode = 500;
              res.end('Error adding user');
            });
        });
      } else {
        res.statusCode = 404;
        res.end('Not Found');
      }
    });
  });

  server.listen(process.env.API_PORT, function () {
    console.log(`Server listening on port ${process.env.API_PORT}`);
  });
});