import React, { useState, useEffect } from 'react';
const apiUrl = process.env.REACT_APP_API_IP_ADDRESS + ':' + process.env.REACT_APP_API_PORT;

function getAllUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(apiUrl + '/users')
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
  

export { getAllUsers, addOrGetUser };
