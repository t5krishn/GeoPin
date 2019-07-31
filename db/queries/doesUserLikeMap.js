// params are [user_id, map_id]

const doesUserLikeMap = function (pool, params) {

  const query = `
      SELECT *
      FROM liked_maps
      WHERE user_id = $1
      AND map_id = $2;
  `;

  return pool.query(query, params)
      .then(res => {
          if (res.rows.length > 0) {
              return res.rows[0];
           } else {
              return null;
          }
      })
      .catch(err => { console.log("query error", err) });

}

module.exports = doesUserLikeMap;
