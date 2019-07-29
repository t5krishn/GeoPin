const getAllMaps = function (pool, limit) {

    const query = `
        SELECT *
        FROM maps
        LIMIT $1
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
