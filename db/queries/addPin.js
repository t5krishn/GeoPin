// pinParams should be an array
//  --> label, description, longitude, latitude, pin_thumbnail_url, map_id ONLY
//  --> pinParams will need to make the empty fields null in order for sql query to work
const incrementPinCountWithMapId = require('./incrementPinCountWithMapId');


const addPin = function (pool, pinParams) {
    // update pin_count in map table as well
    const query = `
        INSERT INTO pins (label, description, longitude, latitude, pin_thumbnail_url, map_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;

    return pool.query(query, pinParams)
        .then(res => {
            if (res.rows) {
                incrementPinCountWithMapId(pool, pinParams[pinParams.length -1])
                .catch(err2 => { console.log(err2) });
            } else {
                return null;
            }
            return res.rows[0];
        })
        .catch(err => { console.log(err) });
}

module.exports = addPin;
