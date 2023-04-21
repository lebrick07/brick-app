function getMessagesForConversation(convId, connection) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT id, role, content, conversation_id FROM Messages WHERE conversation_id = ?', [convId], function (err, results) {
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