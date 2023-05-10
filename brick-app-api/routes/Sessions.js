function addSession(sessionId, data, connection) {
    return new Promise((resolve, reject) => {
        if (!sessionId) {
            reject(`SessionId cannot be NULL`);
            return;
        }

        connection.query('SELECT session_id, data FROM Sessions WHERE session_id = ?', [sessionId], function (err, results) {
            if (err) {
                reject(err);
                return;
            }

            // Session found
            if (results.length > 0) {
                resolve(results[0]);
                return;

                // Session not found. Create one
            } else {
                connection.query('INSERT INTO Sessions (session_id, data) VALUES (?, ?)',
                    [sessionId, data],
                    function (err, results) {
                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve({
                            sessionId: results.session_id,
                            data: data
                        });
                    }
                );
            }
        });
    })
}

module.exports = { addSession };
