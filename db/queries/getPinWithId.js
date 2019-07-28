const getPinWithId = function (pool, pin_id) {
    const query = `
        SELECT *
        FROM pins
        WHERE pins.id = $1
    `;

    return pool.query(query, [pin_id])
        .then(res => {
            if (res.rows) {
                return res.rows[0];
            } else {
                return null;
            }
        })
        .catch(err => { console.log(err) });
}

module.exports = getPinWithId;