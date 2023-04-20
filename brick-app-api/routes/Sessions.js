function addSession(sessionId, expires, data, connection) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT session_id, expires, data FROM Sessions WHERE session_id = ?', [sessionId], function (err, results) {
            if (err) {
                reject(err);
                return;
            }

            // Session found
            if (results.length > 0) {
                // Session not expired
                if (results[0].expires >= Date.now()) {
                    resolve(results[0]);
                    return; ß
                }

                // Is it expired? Update its "expire" field
                connection.query('UPDATE Sessions SET expires = ? WHERE session_id = ?', [expires, sessionId],
                    function (err, results) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({
                                sessionId: results.session_id,
                                expires: expires,
                                data: data
                            });
                        }
                    }
                );
                // Session not found. Create one
            } else {
                connection.query('INSERT INTO Sessions (session_id, expires, data) VALUES (?, ?, ?)',
                    [sessionId, expires, data],
                    function (err, results) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({
                                sessionId: results.session_id,
                                expires: expires,
                                data: data
                            });
                        }
                    }
                );
            }
        });
    })
}

module.exports = { addSession };
