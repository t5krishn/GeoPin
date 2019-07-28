const updatePin = function () {

    const query = `
    UPDATE maps
    SET title= COALESCE($2, title), subject=COALESCE($3, subject), description=COALESCE($4, description), city=COALESCE($5, city)
    WHERE maps.id = $1
    `;

    return pool.query(query, [map_id, ...mapParams  /* title, subject, description, city */])
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