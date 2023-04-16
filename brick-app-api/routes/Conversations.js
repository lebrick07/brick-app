function getConversation(id, connection) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Conversations WHERE id = ?', [id], function (err, results) {
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

module.exports = { getConversation };