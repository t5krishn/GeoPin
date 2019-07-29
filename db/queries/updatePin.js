// mapParams is an array with 
//      --> label, description, longitude, latitude, pin_thumbnail_url ONLY
//      --> pinParams will need to make the empty fields null in order for sql query to work
//      --> COALESCE will make sure that if first item is null, use the second
const updatePin = function (pool, pin_id, pinParams) {

    const query = `
        UPDATE pins
        SET label= COALESCE($2, label), 
            description=COALESCE($3, description), 
            longitude=COALESCE($4, longitude), 
            latitude=COALESCE($5, latitude),  
            pin_thumbnail_url=COALESCE($6, pin_thumbnail_url)
        WHERE pins.deleted = FALSE AND pins.id = $1
        RETURNING *;
    `;

    return pool.query(query, [pin_id, ...pinParams  /* label, description, longitude, latitude, pin_thumbnail_url */])
    .then(res => {
        if (res.rows) {
            return res.rows;
        } else {
            return null;
        }
    })
    .catch(err => { console.log(err) });

}

module.exports = updatePin;