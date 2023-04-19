function getConversationsForUser(userId, connection) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT id, topic, user_id FROM Conversations WHERE user_id = ?', [userId], function (err, results) {
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