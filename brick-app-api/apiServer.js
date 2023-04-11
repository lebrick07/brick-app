const mysql = require('mysql');
const http = require('http');
const port = 3001;
const cors = require('cors');
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
});

// Create an HTTP server
const server = http.createServer(function (req, res) {
  // Enable CORS for all requests
  cors()(req, res, function () {
    // Handle GET requests to "/users"
    if (req.method === 'GET' && req.url === '/users') {
      connection.query('SELECT * FROM Users', function (err, results, fields) {
        if (err) {
          res.statusCode = 500;
          res.end('Error fetching data from database');
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(results));
        }
      });
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  });
});

server.listen(port, function () {
  console.log('Server listening on port ' + port);
});
