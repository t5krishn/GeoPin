// mapParams is an array with 
//      --> username, password ONLY
//      --> mapParams will need to make the empty fields null in order for sql query to work
//      --> COALESCE will make sure that if first item is null, use the second
const updateUser = function (pool, user_id, userParams) {

    const query = `
        UPDATE users
        SET username= COALESCE($2, username), 
            password=COALESCE($3, password), 
        WHERE maps.id = $1
        RETURNING *;
    `;

    return pool.query(query, [user_id, ...userParams  /* username, password*/])
        .then(res => {
            if (res.rows) {
                return res.rows;
            } else {
                return null;
            }
        })
        .catch(err => { console.log(err) });

}

module.exports = updateUser;