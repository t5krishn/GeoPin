
const addMap = function (pool, mapParams) {
    const query = `
      INSERT INTO maps (title, subject, description, city, owner_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    return pool.query(query, mapParams)
        .then(res => {
            if (res.rows) {
                return res.rows;
            } else {
                return null;
            }
        })
        .catch(err => { console.log(err) });
}


module.exports = addMap;
