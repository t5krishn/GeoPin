const getMapWithId = function (pool, mapId) {
    
    const query = `
        SELECT *
        FROM maps
        WHERE maps.id = $1
    `;

    return pool.query(query, [mapId])
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