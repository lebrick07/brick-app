function addSession(sessionId, expires, data, connection) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT session_id, expires, data FROM Sessions WHERE session_id = ?', [sessionId], function (err, results) {
            if (err) {
                reject(err);
            } else {
                if (results.length > 0) {
                    resolve(results[0]);
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
            }
        }
        );
    });
}

module.exports = { addSession };
