const getUserWithId = function (pool, user_id) {

    const query = `
        SELECT *
        FROM users
        WHERE users.id = $1
    `;

    return pool.query(query, [user_id])
        .then(res => {
            if (res.rows) {
                return res.rows[0];
            } else {
                return null;
            }
        })
        .catch(err => { console.log(err) });

}

module.exports = getUserWithId;