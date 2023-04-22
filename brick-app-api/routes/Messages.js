function getMessagesForConversation(sid, convId, connection) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT m.id, m.content, m.role, m.conversation_id FROM Messages m JOIN Conversations c ON m.conversation_id = c.id JOIN (SELECT JSON_EXTRACT(data, \'$.user_id\') AS user_id FROM Sessions WHERE session_id = ?) s ON s.user_id = c.user_id WHERE c.id = ?';
        connection.query(query, [sid, convId], function (err, results) {
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

function addMessageToConversation(sid, conversationId, content, role, connection) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Messages (content, role, conversation_id) SELECT ?,?,? FROM Conversations c WHERE c.id = ? AND c.user_id = (SELECT JSON_EXTRACT(data, \'$.user_id\') FROM Sessions WHERE session_id = ?)';
        connection.query(query, [content, role, conversationId, conversationId, sid], function (err, response) {
            if (err) {
                reject(err);
            } else {
                if (!response || response.affectedRows !== 1) {
                    reject();
                }
                else {
                    resolve(response);
                }
            }
        });
    });
}

module.exports = { getMessagesForConversation, addMessageToConversation };