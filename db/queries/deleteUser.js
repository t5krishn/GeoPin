const deleteUser = function (pool, user_id) {

    const query = `
        UPDATE users
        SET users.deleted = TRUE
        WHERE users.id = $1
        RETURNING *;
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

module.exports = deleteUser;