function getMessagesForConversation(sessionId, convId, connection) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT m.id, m.content, m.role, m.conversation_id FROM brickdb.Messages m JOIN brickdb.Conversations c ON m.conversation_id = c.id JOIN (SELECT JSON_EXTRACT(data, \'$.user_id\') AS user_id FROM brickdb.Sessions WHERE session_id = ?) s ON s.user_id = c.user_id WHERE c.id = ?';
        connection.query(query, [sessionId, convId], function (err, results) {
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

module.exports = { getMessagesForConversation };