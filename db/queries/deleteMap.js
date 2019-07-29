const deleteMap = function (pool, map_id) {

    const query = `
        UPDATE maps
        SET maps.deleted = TRUE
        WHERE maps.id = $1
        RETURNING *;
    `;
    
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

module.exports = deleteMap;