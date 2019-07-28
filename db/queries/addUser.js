const addUser = function (db, userParams) {
    const query = `
        INSERT INTO users (name, password)
        VALUES ($1, $2)
        RETURNING *;
    `;

    return db.query(query, userParams)
        .then(res => {
            if (res.rows) {
                return res.rows[0];
            } else {
                return null;
            }
        })
        .catch(err => { console.log(e) });
}

module.exports = addUser;