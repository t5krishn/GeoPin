const getAllLikedMaps = function (pool, user_id) {

  const query = `
    SELECT maps.*
    FROM liked_maps
    JOIN maps ON maps.id = liked_maps.map_id
    WHERE liked_maps.user_id = $1
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

module.exports = getAllLikedMaps;
