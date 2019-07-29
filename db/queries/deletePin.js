const decrementPinCountWithMapId = require('./decrementPinCountWithMapId');

const deletePin = function (pool, pin_id, map_id) {

    const query = `
        UPDATE pins
        SET pins.deleted = TRUE
        WHERE pins.id = $1
        RETURNING *;
    `;
    
    return pool.query(query, [pin_id])
        .then(res => {
            if (res.rows) {
                decrementPinCountWithMapId(pool, map_id)
                .then(res2 => {
                    // res2 is the map that has its pin_count updated

                    // RETURNS THE UPDATED (DELETED) PIN
                    return res.rows[0];
                })
                .catch(err2 => { console.log(err2) });
            } else {
                return null;
            }
        })
        .catch(err => { console.log(err) });

}

module.exports = deletePin;