const getAllContributions = function (pool, user_id) {

  const query = `
      SELECT map_id
      FROM pins
      JOIN users ON pins.user_id = users.id
      JOIN maps on pins.map_id = maps.id
      WHERE pins.deleted = FALSE
          AND maps.deleted = FALSE
          AND users.deleted = FALSE
          AND users.id = $1
      ;`;
  return pool.query(query, [user_id])
      .then(res => {
          if (res.rows) {
              return res.rows;
          } else {
              return null;
          }
      })
      .catch(err => { console.log(err) });

}

module.exports = getAllContributions;
