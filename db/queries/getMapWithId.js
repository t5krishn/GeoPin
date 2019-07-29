const getMapWithId = function (pool, map_id) {
    
    const query = `
        SELECT *
        FROM maps
        WHERE maps.deleted = FALSE AND maps.id = $1
    ;`;

    return pool.query(query, [map_id])
        .then(res => {
            if (res.rows) {
                return res.rows[0];
            } else {
                return null;
            }
        })
        .catch(err => { console.log(err) });

}

module.exports = getMapWithId;