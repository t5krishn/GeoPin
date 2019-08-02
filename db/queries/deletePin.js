const decrementPinCountWithMapId = require('./decrementPinCountWithMapId');

const deletePin = function (pool, pin_id, map_id) {

    const query = `
        UPDATE pins
        SET deleted = TRUE
        WHERE pins.id = $1
        RETURNING *;x
    `;

    return pool.query(query, [pin_id])
        .then(res => {
            if (res.rows) {
                decrementPinCountWithMapId(pool, map_id)
                .catch(err2 => { console.log(err2) });
            } else {
                return null;
            }
            return res.rows[0];
        })
        .catch(err => { console.log(err) });

}

module.exports = deletePin;
