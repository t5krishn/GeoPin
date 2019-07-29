// mapParams is an array with 
//      --> title, subject, description, city ONLY
//      --> mapParams will need to make the empty fields null in order for sql query to work
//      --> COALESCE will make sure that if first item is null, use the second
const updateMap = function (pool, map_id, mapParams) {

    const query = `
        UPDATE maps
        SET title= COALESCE($2, title), 
            subject=COALESCE($3, subject), 
            description=COALESCE($4, description), 
            city=COALESCE($5, city)
        WHERE maps.id = $1
        RETURNING *;
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

module.exports = updateMap;

