const getAllMaps = function (pool, limit = 10) {

    const query = `
        SELECT *
        FROM maps
        WHERE maps.deleted = FALSE
        ORDER BY maps.id DESC
        LIMIT $1;
    `;
    return pool.query(query, [limit])
        .then(res => {
            if (res.rows) {
                return res.rows;
            } else {
                return null;
            }
        })
        .catch(err => { console.log(err) });

}
module.exports = getAllMaps;