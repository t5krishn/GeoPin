/*
 * All routes for Pins are defined here
 * Since this file is loaded in server.js into api/pins,
 *   these routes are mounted onto /pins
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const methodOverride = require("method-override");

module.exports = (pool, db) => {

  router.use(methodOverride("_method"));

  // Get route used in AJAX to get all pins
  router.get("/:mapid/pins/", (req, res) => {

    const mapID = req.params.mapid;

    db.getAllPinsForMap(pool, mapID)
    .then(pins => {
      if (pins) {
        res.json(pins);
      }
    })
    .catch(err => {
      response
        .status(500)
        .json({ error: err.message });
    });
  });

  // Add new pin btn is clicked map editing page
  // Pin creation happens after user clicks on button #pin-submit
  router.post("/:mapid/pins", (req, res) => {

    const params = req.body;
    const mapID = req.params.mapid;
    // To test, will need to create ajax query that can pass longitude and other map data through req
    const pinParams = [params.label, params.description, params.longitude, params.latitude, params.pin_thumbnail_url, mapID];
    pdb.addPin(pool, pinParams)
    .then(pin => {
      if (pin) {
        res.json(pin);
      } else {
        res
        .status(404)
        .json({ error: err.message });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  // Get request needs to aquire information about that pin_id
  // Returns pin information to ajax
  // Edit pin btn has id of "edit-pin-btn"

  // When edit btn is clicked, get request is sent to aquire pin information based on pin_id
  router.get("/:mapid/pins/:pinid/edit", (res, req) => {
    const pinid = req.params.pinid;
    const query = `
      SELECT * FROM pins
      WHERE id = $1
    `;
    const queryParams = [pinid];
    pool.query(query, queryParams)
    .then(res => {
      const pin = res.rows
      if (pin) {
        return pin;
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

  // PUT is called when edit form submit button is clicked
  router.put("/:mapid/pins/:pinid/edit", (res, req) => {
    const query = `UPDATE pins`;
    const queryParams = [];
    const body = req.body;

  });

  // Delete pin btn is clicked, send a delete request
  router.delete("/:mapid/pins/:pinid/delete", (res, req) => {
    const query = ``;
    const pinid = req.params.pinid;

  })

  return router;
};
