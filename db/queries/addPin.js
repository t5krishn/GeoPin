// pinParams should be an array
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
                return res.rows[0];
            } else {
                return null;
            }
        })
        .catch(err => { console.log(err) });
}

module.exports = addPin;