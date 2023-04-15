function getAllUsers(req, res, connection) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Users', function (err, results) {
            if (err) {
                reject(err);
            } else {
                if (results.length > 0) {
                    resolve(results);
                } else {
                    reject();
                }
            }
        });
    });
}

function addUser(name, email, is_email_verified, clientId, connection) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Users WHERE clientId = ?', [clientId], function (err, results) {
            if (err) {
                reject(err);
            } else {
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    connection.query('INSERT INTO Users (name, email, is_email_verified, clientId) VALUES (?, ?, ?, ?)',
                        [name, email, is_email_verified, clientId],
                        function (err, results) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve({
                                    id: results.insertId,
                                    name: name,
                                    email: email,
                                    is_email_verified: is_email_verified,
                                    clientId: clientId,
                                });
                            }
                        }
                    );
                }
            }
        }
        );
    });
}


module.exports = { getAllUsers, addUser };
