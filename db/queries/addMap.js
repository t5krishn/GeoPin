const addMap = function (db, mapParams) {
    const query = `
      INSERT INTO maps (title, subject, description, city, pin_count, owner_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    return db.query(query, mapParams)
        .then(res => {
            if (res.rows) {
                return res.rows[0];
            } else {
                return null;
            }
        })
        .catch(err => { console.log(e) });
}


module.exports = addMap;