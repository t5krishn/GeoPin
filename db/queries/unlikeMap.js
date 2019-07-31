// params should be [user_id, map_id]

const unlikeMap = function (pool, params) {

  const query = `
    DELETE FROM liked_maps
    WHERE user_id = $1
    AND map_id = $2
  ;`;

  return pool.query(query, params)
      .then(res => res.rows)
      .catch(err => { console.log(err) });
}


module.exports = unlikeMap;
