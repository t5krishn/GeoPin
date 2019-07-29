const getUserWithName = function (pool, user_name) {
    const query = `
        SELECT *
        FROM users
        WHERE users.deleted = FALSE AND users.name LIKE = '%$1%'
    ;`;
    return pool.query(query, [user_name])
        .then(res => {
            if (res.rows) {
                return res.rows;
            } else {
                return null;
            }
        })
        .catch(err => { console.log(err) });
}

module.exports = getUserWithName;