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

  // Get route to retrieve object for single pin
  router.get("/:mapid/pins/:pinid", (req, res) => {

    db.getPinWithId(pool, req.params.pinid)
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

    const pinParams = [params.label, params.description, params.longitude, params.latitude, params.pin_thumbnail_url, mapID];
    db.addPin(pool, pinParams)
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
  router.get("/:mapid/pins/:pinid/edit", (req, res) => {
    const pinID = req.params.pinid;
    const pinParams = [pinid];

    pool.query(query, pinParams)
    db.getPinWithId(pool, pinParams)
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

  // PUT is called when edit form submit button is clicked
  router.put("/:mapid/pins/:pinid/edit", (req, res) => {
    const pinID = req.params.pinid;
    const params = req.body;
    const pinParams = [pinID, params.label, params.description, params.longitude, params.latitude, params.pin_thumbnail_url];

    // NEED TO USE COOKIES TO INSERT owner_id INTO DB
    db.updatePin(pool, pinID, pinParams)
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

  // Delete pin btn is clicked, send a delete request
  router.delete("/:mapid/pins/:pinid/delete", (req, res) => {

    // Do we need to check functionality if pin already deleted?
    db.deletePin(pool, req.params.pinid, req.params.mapid)
    .then(pin => {
      if (pin) {
        res.json({ status: "complete"})
      } else {
        res.statusCode = 404;
        res.redirect(`/`);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  return router;
};
