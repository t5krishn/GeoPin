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

  // Localhost:8080/create
  // Fill out a form to create a new map
  router.get("/create", (req, res) => {
    res.render("maps_create");
  });

  // After pressing submit, this post request is sent to the server:
  // Map id and owner_id is not submitted by user
  router.post("/create", (req, res) => {
    // Delete owner id form after!!!!

    const params = req.body;
    const queryParams = [params.title, params.subject, params.description, params.city, params.owner_id];

    // NEED TO USE COOKIES TO INSERT owner_id INTO DB
    db.addMap(pool, queryParams)
    .then(map => {
      console.log(map[0].id);
      if (map) {
        // FIX THIS so that it renders the edit page for the new map id
        res.redirect(`/maps/${map[0].id}/edit/`)
      } else {
        console.log("error");
        return null;
      }
    })
    .catch(err => {
      response
        .status(500)
        .json({ error: err.message });
    });
  });

  // After submitting the form, the server gets a GET request and renders the map editing page:
  router.get("/:mapid/edit", (req, res) => {
    // TO ADD: Function to get single map from database so that we can hand all map specific variables to the template (title, description, etc.)
    let templateVars = {
      map_id: req.params.mapid
    };

    res.render("maps_edit", templateVars);
  });

  return router;
};

// TO MAKE - Map edit route

// Map get for view map

// Map delete for id
router.delete("/:mapid/delete", (req, res) => {
  // db.deleteMap(pool, req.params.mapid)
  res.redirect(`/urls`);
});
