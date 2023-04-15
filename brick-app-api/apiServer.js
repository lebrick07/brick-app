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

  const server = http.createServer(function (req, res) {
    logToConsole("New request:", req.method, req.url);

    cors()(req, res, function () {
      if (req.method === 'OPTIONS') {
        // handle preflight request
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Max-Age', '86400');
        res.statusCode = 200;
        res.end();
      }

      // GET /users
      if (req.method === 'GET' && req.url === '/users') {
        logToConsole("Responding to:", req.method, req.url);

        getAllUsers(req, res, connection, headers)
          .then(resp => {
            res.end(JSON.stringify(resp));
          }).catch(error => {
            logToConsole(`Error getting users. Error: ${error}.`, req.method, req.url);
            res.statusCode = 500;
            res.end('Error fetching data from database');
          });
      }
      // POST /addUser
      else if (req.method === 'POST' && req.url === '/addUser') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          const { name, email, is_email_verified } = JSON.parse(body);
          addUser(name, email, is_email_verified, connection)
            .then(user => {
              logToConsole("Responding to:", req.method, req.url);
              res.end(JSON.stringify(user));
            })
            .catch(error => {
              logToConsole(`Error adding user. Error: ${error}.`, req.method, req.url);
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

function logToConsole(message, method, url) {
  time = new Date().toISOString();
  console.log(`[${time}] ${message} Method - ${method} URL - ${url}`);
}