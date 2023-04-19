import React, { useState, useEffect } from 'react';
const apiUrl = process.env.REACT_APP_API_IP_ADDRESS + ':' + process.env.REACT_APP_API_PORT;

function getAllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/getAllUsers`)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

function addOrGetUser({ name, email, isEmailVerified }) {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        is_email_verified: isEmailVerified,
      }),
    };

    fetch(apiUrl + '/addUser', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          reject(data.error);
        } else {
          console.log(`User with id ${data.id} added/retrieved successfully!`);
          resolve(data.id);
        }
      })
      .catch((error) => {
        console.error(error);
        console.log('Error adding/retrieving user');
        reject(error);
      });
  });
}

function getConversations({ userId }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/getConversationsForUser/${userId}`)
      .then(response => response.json())
      .then(data => setConversations(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Conversations</h1>
      <ul>
        {conversations.map(conversation => (
          <li key={conversation.id}>{conversation.topic}</li>
        ))}
      </ul>
    </div>
  );
}

function getMessages({ conversationId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/getMessagesForConversation/${conversationId}`)
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map(msg => (
          <li key={msg.id}>{msg.message}</li>
        ))}
      </ul>
    </div>
  );
}

function addOrGetSession({ sessionId, expires, data }) {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        expires,
        data,
      }),
    };

    fetch(apiUrl + '/addSession', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          reject(data.error);
        } else {
          console.log(`Session with id ${data.sessionId} added/retrieved successfully!`);
          resolve();
        }
      })
      .catch((error) => {
        console.error(error);
        console.log('Error adding/retrieving user');
        reject(error);
      });
  });
}

export { getAllUsers, addOrGetUser, getConversations, getMessages, addOrGetSession };
