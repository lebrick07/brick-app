import React, { useState, useEffect } from 'react';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_IP_ADDRESS + ':' + process.env.REACT_APP_API_PORT + '/users')
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

export default Users;