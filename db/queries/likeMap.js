// params should be [user_id, map_id]

const likeMap = function (pool, params) {

  const query = `
    INSERT INTO liked_maps (user_id, map_id)
    VALUES ($1, $2)
    RETURNING*
  ;`;

  return pool.query(query, params)
      .then(res => res.rows)
      .catch(err => { console.log(err) });
}

module.exports = likeMap;
