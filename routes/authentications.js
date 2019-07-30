/*
 * All routes for Maps are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (pool, db) => {

  // Localhost:8080/
  // Note - Do we need timestamps for created at on maps?
  // Homepage browses random maps from map database
  router.get("/", (req, res) => {

    db.getAllMaps(pool)
    .then(maps => {
      if (maps) {
        res.json(maps);
      } else {
        // NOTE Need to create error message box in html to display that data wasn't found
        res.status(404).json({error: "There's a problem on our end. Maps were not able to load. Please refresh and try again, sorry!"});
      }
    })
    .catch(err => {
      response
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};

