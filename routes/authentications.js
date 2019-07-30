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
  router.get("/login", (req, res) => {

    res.render("login");
  });

  return router;
};

