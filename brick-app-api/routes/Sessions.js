function addSession(sessionId, expires, data, connection) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT session_id, expires, data FROM Sessions WHERE session_id = ?', [sessionId], function (err, results) {
            if (err) {
                reject(err);
            } else {
                if (results.length === 0 ||
                    (results.length > 0 && results[0].expires < Date.now())) {
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
                } else {
                    resolve(results[0]);
                }
            }
        }
        );
    });
}

module.exports = { addSession };
