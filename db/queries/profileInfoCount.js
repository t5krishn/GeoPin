const profileInfoCount = function (pool, user_id) {

  const query = `
      Select (SELECT count(*) FROM maps WHERE owner_id = $1) AS maps_created
      , (SELECT count( DISTINCT maps.id) FROM pins JOIN maps ON pins.map_id = maps.id WHERE pins.user_id = $1) AS maps_contributed
      , (SELECT count(*) FROM liked_maps WHERE user_id = $1) AS liked_maps
      , (SELECT count(liked_maps.*) FROM liked_maps JOIN maps ON maps.id = liked_maps.map_id WHERE maps.owner_id = $1) AS liked_by
  ;`;

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
module.exports = profileInfoCount;
