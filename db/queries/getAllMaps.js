const getAllMaps = function (pool) {

    const query = `
        SELECT *
        FROM maps
        LIMIT 10
    `;
    return pool.query(query, [])
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
