const addPin = function (db, pinParams) {
    const query = `
    INSERT INTO pins (label, description, longitude, latitude, pin_thumbnail_url, map_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  return db.query(query, pinParams)
      .then(res => {
          if (res.rows) {
              return res.rows[0];
          } else {
              return null;
          }
      })
      .catch(err => { console.log(e) });
}

module.exports = addPin;