const getAllMaps = function (pool, limit = 10) {

    const query = `
        SELECT maps.*, users.username AS username, count(liked_maps.*) AS likes
        FROM maps JOIN users
        ON maps.owner_id = users.id
        JOIN liked_maps ON liked_maps.map_id = maps.id
        WHERE maps.deleted = FALSE
        GROUP BY maps.id, username
        ORDER BY created_at DESC
        LIMIT $1
    `;
    return pool.query(query, [limit])
        .then(res => {
            if (res.rows) {
                return res.rows;
            } else {
                return null;
            }
        })
        .catch(err => { console.log(err) });

}
module.exports = getAllMaps;
