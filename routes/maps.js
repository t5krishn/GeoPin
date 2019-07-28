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
  // Homepage browses random maps from map database
  router.get("/", (req, res) => {
    let query = `SELECT * FROM maps`;
    pool.query(query)
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

    let templateVars = {
      map_id: req.params.mapid
    };
    console.log(templateVars);

    res.render("maps_edit", templateVars);
  });

  return router;
};
