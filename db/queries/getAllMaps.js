const getAllMaps = function (pool) {

    const query = `
        SELECT *
        FROM maps
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