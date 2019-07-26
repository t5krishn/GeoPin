/*
 * All routes for Pins are defined here
 * Since this file is loaded in server.js into api/pins,
 *   these routes are mounted onto /pins
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const methodOverride = require("method-override");

module.exports = (db) => {

  router.use(methodOverride("_method"));

  // Add new pin btn is clicked map editing page
  router.post("/maps/:mapid/pins", (req, res) => {
    let query = `
      INSERT INTO pins (map_id, label, address, description)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const body = req.body;
    const mapid = req.params.mapid;
    const queryParams = [mapid, body.label, body.address, body.description];
    db.query(query, queryParams)
    .then(res => {
      if (res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  // Edit pin btn is clicked, send a put request
  router.put("/maps/:mapid/pins/:pinid", (res, req) => {
    let query = ``;
  })

  return router;
};
