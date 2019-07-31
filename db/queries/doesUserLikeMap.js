const doesUserLikeMap = function (pool, user_id) {

  const query = `
      SELECT *
      FROM liked_maps
      WHERE user_id = $1;
  `;

  return pool.query(query, [user_id])
      .then(res => {
          if (res.rows) {
              return res.rows[0];
           } else {
              return null;
          }
      })
      .catch(err => { console.log(err) });

}

module.exports = doesUserLikeMap;
