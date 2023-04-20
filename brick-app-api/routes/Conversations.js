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

module.exports = { getConversationsForUser };