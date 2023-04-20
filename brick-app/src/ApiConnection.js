import React, { useState, useEffect } from 'react';
const apiUrl = process.env.REACT_APP_API_IP_ADDRESS + ':' + process.env.REACT_APP_API_PORT;

function addOrGetUser({ name, email, isEmailVerified }) {
  return new Promise((resolve, reject) => {
    const requestOptions = getRequestOptions({ name, email, isEmailVerified });

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

function getConversations(userSessionId) {
  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}/getConvoForUserSession/${userSessionId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          reject(data.error);
        } else {
          resolve(data.id);
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

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

function addOrGetSession({ id, expires, data }) {
  return new Promise((resolve, reject) => {
    const requestOptions = getRequestOptions({ id, expires, data });

    fetch(apiUrl + '/addSession', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          reject(data.error);
        } else {
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

function getRequestOptions(body) {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
}

export { addOrGetUser, getConversations, getMessages, addOrGetSession };
