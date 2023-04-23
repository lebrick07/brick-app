function addUser(name, email, is_email_verified, connection) {
    return new Promise((resolve, reject) => {
        if (!name || !email) {
            reject(`name and email cannot be NULL. name: ${name} email: ${email}`);
            return;
        }

        connection.query('SELECT id, name, email, is_email_verified FROM Users WHERE email = ?', [email], function (err, results) {
            if (err) {
                reject(err);
                return;
            }

            if (results.length > 0) {
                resolve(results[0]);
                return;
            }

            connection.query('INSERT INTO Users (name, email, is_email_verified) VALUES (?, ?, ?)',
                [name, email, is_email_verified],
                function (err, results) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve({
                        id: results.insertId,
                        name: name,
                        email: email,
                        is_email_verified: is_email_verified,
                    });
                }
            );
        });
    });
}

module.exports = { addUser };
