function getConversationsForUser(sessionId, connection) {
    return new Promise((resolve, reject) => {
        if (!sessionId) {
            reject('SessionId cannot be NULL');
            return;
        }

        query = 'SELECT id, topic FROM Conversations WHERE user_id = (SELECT JSON_EXTRACT(data, \'$.user_id\') FROM Sessions WHERE session_id = ?)';
        connection.query(query, [sessionId], function (err, results) {
            if (err) {
                reject(err);
                return;
            }

            if (results) {
                resolve(results);
                return;
            }

            reject();
        });
    });
}

function addConversation(sessionId, topic, connection) {
    return new Promise((resolve, reject) => {
        if (!sessionId || !topic) {
            reject(`SessionId and topic cannot be NULL. sessionId: ${sessionId} topic: ${topic}`);
            return;
        }

        query = 'INSERT INTO Conversations (topic, user_id) VALUES(?, (SELECT JSON_EXTRACT(data, \'$.user_id\') as user_id FROM Sessions s WHERE session_id = ?))';
        connection.query(query, [topic, sessionId], function (err, response) {
            if (err) {
                reject(err);
                return;
            }
            if (!response || response.affectedRows !== 1) {
                reject();
                return;
            }

            query = 'SELECT LAST_INSERT_ID();';
            connection.query(query, [], function (err, response) {
                if (err) {
                    reject(err);
                    return;
                }

                if (response && response.length > 0 && response[0]['LAST_INSERT_ID()']) {
                    resolve(response[0]['LAST_INSERT_ID()']);
                    return;
                }

                reject();
            });
        });
    });
}

function clearConversation(sessionId, conversationId, connection) {
    return new Promise((resolve, reject) => {
        if (!sessionId || !conversationId) {
            reject(`SessionId and conversationId cannot be NULL. sessionId: ${sessionId} conversationId: ${conversationId}`);
            return;
        }

        query = 'DELETE FROM Messages WHERE id IN (SELECT id FROM (SELECT m.id FROM Messages m JOIN Conversations c ON m.conversation_id = c.id JOIN (SELECT JSON_EXTRACT(data, \'$.user_id\') AS user_id FROM Sessions WHERE session_id = ?) s ON s.user_id = c.user_id WHERE c.id = ?) AS subquery);';
        connection.query(query, [sessionId, conversationId], function (err, response) {
            if (err) {
                reject(err);
                return;
            }
            if (!response) {
                reject();
                return;
            }

            query = 'DELETE FROM Conversations WHERE id = (SELECT * FROM (SELECT c.id FROM Conversations c JOIN (SELECT JSON_EXTRACT(data, \'$.user_id\') AS user_id FROM Sessions WHERE session_id = ?) s ON s.user_id = c.user_id WHERE c.id = ?) as temp);';
            connection.query(query, [sessionId, conversationId], function (err, response) {
                if (err) {
                    reject(err);
                    return;
                }
                if (!response) {
                    reject();
                    return;
                }

                resolve(response);
            });
        });
    });
}

module.exports = { getConversationsForUser, addConversation, clearConversation };