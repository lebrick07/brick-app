const mysql = require('mysql');
const http = require('http');
const cors = require('cors');
const { addUser } = require('./routes/Users');
const { getConversationsForUser, addConversation, clearConversation } = require('./routes/Conversations');
const { getMessagesForConversation, addMessageToConversation } = require('./routes/Messages');
const { addSession } = require('./routes/Sessions');
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
    lowerUrl = req.url.toLowerCase();

    cors()(req, res, function () {
      if (req.method === 'OPTIONS') {
        routeHandler.cors(req, res);
      } else if (req.method === 'POST' && lowerUrl === '/adduser') {
        routeHandler.addUserPath(req, res);
        // TODO: Find a better solution for this. This can be exploited
      } else if (req.method === 'GET' && lowerUrl.startsWith('/getconvoforusersession/') && lowerUrl.split('/').length === 3) {
        routeHandler.getConvoForUserSession(req, res);
      } else if (req.method === 'GET' && lowerUrl.startsWith('/getmessagesforconversation/') && lowerUrl.split('/').length === 4) {
        routeHandler.getMessagesForConversationPath(req, res);
      } else if (req.method === 'POST' && lowerUrl === '/addsession') {
        routeHandler.addSessionPath(req, res);
      } else if (req.method === 'POST' && lowerUrl === '/addmessagetoconversation') {
        routeHandler.addMessageToConversationPath(req, res);
      } else if (req.method === 'POST' && lowerUrl === '/addconversation') {
        routeHandler.addConversationPath(req, res);
      } else if (req.method === 'POST' && lowerUrl === '/clearconversation') {
        routeHandler.clearConversationPath(req, res);
      } else {
        routeHandler.notFound(req, res);
      }
    });
  });

  server.listen(process.env.API_PORT, function () {
    console.log(`Server listening on port ${process.env.API_PORT}`);
  });

  process.on('exit', function () {
    connection.end(function (err) {
      if (err) throw err;
      console.log('MySQL connection closed.');
    });
  });
});

function logToConsole(message, method, url) {
  time = new Date().toISOString();
  console.log(`[${time}] ${message} Method - ${method} URL - ${url}`);
}

const routeHandler = {
  cors: function (req, res) {
    // handle preflight request
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.statusCode = 200;
    res.end();
  },
  addUserPath: function (req, res) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { name, email, isEmailVerified } = JSON.parse(body);
      addUser(name, email, isEmailVerified, connection)
        .then(user => {
          res.end(JSON.stringify(user));
        })
        .catch(error => {
          logToConsole(`Error adding user. Error: ${error}.`, req.method, req.url);
          res.statusCode = 500;
          res.end('Error adding user');
        });
    });
  },
  getConvoForUserSession: function (req, res) {
    const sessionId = lowerUrl.split('/')[2];

    getConversationsForUser(sessionId, connection)
      .then(resp => {
        res.end(JSON.stringify(resp));
      }).catch(error => {
        logToConsole(`Error getting conversation. Error: ${error}.`, req.method, req.url);
        res.statusCode = 500;
        res.end('Error fetching data from database');
      });
  },
  getMessagesForConversationPath: function (req, res) {
    const conversationId = lowerUrl.split('/')[2];
    const sessionId = lowerUrl.split('/')[3];

    getMessagesForConversation(sessionId, conversationId, connection)
      .then(resp => {
        res.statusCode = 200;
        res.end(JSON.stringify(resp));
      }).catch(error => {
        logToConsole(`Error getting messages. Error: ${error}.`, req.method, req.url);
        res.statusCode = 500;
        res.end('Error fetching data from database');
      });
  },
  addSessionPath: function (req, res) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { id, data } = JSON.parse(body);
      addSession(id, data, connection)
        .then(resp => {
          res.statusCode = 200;
          res.end(JSON.stringify(resp));
        }).catch(error => {
          logToConsole(`Error getting session. Error: ${error}.`, req.method, req.url);
          res.statusCode = 500;
          res.end('Error fetching data from database');
        });
    });
  },
  addMessageToConversationPath: function (req, res) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { userSessionId, conversationId, content, role } = JSON.parse(body);
      addMessageToConversation(userSessionId, conversationId, content, role, connection)
        .then(() => {
          res.statusCode = 200;
          res.end();
        }).catch(error => {
          logToConsole(`Error getting session. Error: ${error}.`, req.method, req.url);
          res.statusCode = 500;
          res.end('Error fetching data from database');
        });
    });
  },
  addConversationPath: function (req, res) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { userSessionId, topic } = JSON.parse(body);
      addConversation(userSessionId, topic, connection)
        .then(resp => {
          res.statusCode = 200;
          res.end(JSON.stringify(resp));
        }).catch(error => {
          logToConsole(`Error adding conversation. Error: ${error}.`, req.method, req.url);
          res.statusCode = 500;
          res.end('Error fetching data from database');
        });
    });
  },
  clearConversationPath: function (req, res) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { userSessionId, conversationId } = JSON.parse(body);
      clearConversation(userSessionId, conversationId, connection)
        .then(resp => {
          res.statusCode = 200;
          res.end(JSON.stringify(resp));
        }).catch(error => {
          logToConsole(`Error adding conversation. Error: ${error}.`, req.method, req.url);
          res.statusCode = 500;
          res.end('Error fetching data from database');
        });
    });
  },
  notFound: function (req, res) {
    // Invalid path
    res.statusCode = 404;
    res.end('Not Found');
  }
}
