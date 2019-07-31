// mapParams should be an array
// --> title, subject, description, city, created_at, owner_id


// --> SHOULD BE IN ORDER

const addMap = function (pool, mapParams) {
    const query = `
      INSERT INTO maps (title, subject, description, city, pin_count,deleted, created_at, owner_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    ;`;

    return pool.query(query, mapParams)
        .then(res => {
            if (res.rows) {
                return res.rows[0];
            } else {
                return null;
            }
        })
        .catch(err => { console.log(err) });
}


module.exports = addMap;
