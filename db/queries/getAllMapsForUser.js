const getAllMapsForUser = function (pool, user_id) {

    const query = `
        SELECT *
        FROM maps
        JOIN users ON maps.owner_id = users.id 
            AND maps.owner_id = $1
        WHERE maps.deleted = FALSE AND
            users.deleted = FALSE
    ;`;
    return pool.query(query, [user_id])
        .then(res => {
            if (res.rows) {
                return res.rows;
            } else {
                return null;
            }
        })
        .catch(err => { console.log(err) });

}
module.exports = getAllMapsForUser;