function getConversationsForUser(sessionId, connection) {
    return new Promise((resolve, reject) => {
        query = 'SELECT id, topic FROM Conversations WHERE user_id = (SELECT JSON_EXTRACT(data, \'$.user_id\') FROM Sessions WHERE session_id = ?)';
        connection.query(query, [sessionId], function (err, results) {
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

function addConversation(sessionId, topic, connection) {
    return new Promise((resolve, reject) => {
        query = 'INSERT INTO Conversations (topic, user_id) VALUES(?, (SELECT JSON_EXTRACT(data, \'$.user_id\') as user_id FROM Sessions s WHERE session_id = ?))';
        connection.query(query, [topic, sessionId], function (err, response) {
            if (err) {
                reject(err);
            } else {
                if (!response || response.affectedRows !== 1) {
                    reject();
                }
                else {
                    query = 'SELECT LAST_INSERT_ID();';
                    connection.query(query, [], function (err, response) {
                        if (err) {
                            reject(err);
                        } else {
                            if (response && response.length > 0 && response[0]['LAST_INSERT_ID()']) {
                                resolve(response[0]['LAST_INSERT_ID()']);
                            } else {
                                reject();
                            }

                        }
                    });
                }
            }
        });
    });
}

module.exports = { getConversationsForUser, addConversation };