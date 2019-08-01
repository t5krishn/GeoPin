const incrementPinCountWithMapId = function (pool, map_id) {

    const query = `
        UPDATE maps
        SET pin_count = (pin_count + 1)
        WHERE maps.deleted = FALSE AND maps.id = $1
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

module.exports = incrementPinCountWithMapId;
