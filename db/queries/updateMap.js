// mapParams is an array with 
//      --> title, subject, description, city ONLY
const updateMap = function (pool, map_id, mapParams) {

    const query = `
        UPDATE maps
        SET title= COALESCE($2), subject=$3, description=$4, city=$5
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

module.exports = updateMap;