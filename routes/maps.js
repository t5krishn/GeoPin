/*
 * All routes for Maps are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // Localhost:8080/
  // Homepage browses random maps from map database
  router.get("/", (req, res) => {
    let query = `SELECT * FROM maps`;
    db.query(query)
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
  router.post("/create", (req, response) => {
    // Delete owner id form after!!!!
    const query = `
      INSERT INTO maps (title, subject, description, city, owner_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const params = req.body;
    const queryParams = [params.title, params.subject, params.description, params.city, params.owner_id];
    // NEED TO USE COOKIES TO INSERT owner_id INTO DB
    db.query(query, queryParams)
    .then(res => {
      if (res.rows) {
        // FIX THIS so that it renders the edit page for the new map id
        response.render("maps_create")
        return res.rows[0];
      } else {
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
    res.render("maps_edit");
  });

  return router;
};
