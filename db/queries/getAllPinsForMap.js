const getAllPinsForMap = function (pool, map_id) {

    const query = `
        SELECT pins.*
        FROM pins
        JOIN maps ON maps.id = pins.map_id
            AND maps.id = $1
        WHERE pins.deleted = FALSE 
            AND maps.deleted = FALSE
        ;`;
    return pool.query(query, [map_id])
        .then(res => {
            if (res.rows) {
                return res.rows;
            } else {
                return null;
            }
        })
        .catch(err => { console.log(err) });

}

module.exports = getAllPinsForMap;