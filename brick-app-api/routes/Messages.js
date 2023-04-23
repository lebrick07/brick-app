function getMessagesForConversation(sid, convId, connection) {
    return new Promise((resolve, reject) => {
        if (!sid || !convId) {
            reject(`SessionId and conversationId cannot be NULL. sid: ${sid} convId: ${convId}`);
            return;
        }

        const query = 'SELECT m.id, m.content, m.role, m.conversation_id FROM Messages m JOIN Conversations c ON m.conversation_id = c.id JOIN (SELECT JSON_EXTRACT(data, \'$.user_id\') AS user_id FROM Sessions WHERE session_id = ?) s ON s.user_id = c.user_id WHERE c.id = ?';
        connection.query(query, [sid, convId], function (err, results) {
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

function addMessageToConversation(sid, conversationId, content, role, connection) {
    return new Promise((resolve, reject) => {
        if (!sid || !conversationId) {
            reject(`SessionId and conversationId cannot be NULL. sid: ${sid} conversationId: ${conversationId}`);
            return;
        }

        const query = 'INSERT INTO Messages (content, role, conversation_id) SELECT ?,?,? FROM Conversations c WHERE c.id = ? AND c.user_id = (SELECT JSON_EXTRACT(data, \'$.user_id\') FROM Sessions WHERE session_id = ?)';
        connection.query(query, [content, role, conversationId, conversationId, sid], function (err, response) {
            if (err) {
                reject(err);
                return;
            }

            if (!response || response.affectedRows !== 1) {
                reject();
                return;
            }
            
            resolve(response);
        });
    });
}

module.exports = { getMessagesForConversation, addMessageToConversation };