const profileInfoCount = function (pool, user_id) {

  const query = `
      Select (SELECT count(*) FROM maps WHERE owner_id = $1)
      , (SELECT count(maps.*) FROM pins JOIN maps ON pins.map_id = maps.id WHERE pins.user_id = $1) AS mapsContributed
      , (SELECT count(*) FROM liked_maps WHERE user_id = $1) AS liked_maps
      , (SELECT count(liked_maps.*) FROM liked_maps JOIN maps ON maps.id = liked_maps.map_id WHERE maps.owner_id = $1) AS liked_by
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
module.exports = profileInfoCount;
