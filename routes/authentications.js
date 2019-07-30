/*
 * All routes for Maps are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (pool, db, bcrypt) => {

  // Localhost:8080/
  // Note - Do we need timestamps for created at on maps?
  // Homepage browses random maps from map database
  router.get("/login", (req, res) => {

    if (req.session.user_id) {
      db.getUserWithId(pool, req.session.user_id)
      .then(user => {
        if (user) {
          res.redirect("/");
        } else {
          req.session.user_id = null;
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    } else {
      res.render("login");
    }
  });

  // Take login userID and store in cookie if user doesn't already have a userID as cookie
  router.post("/login", (req, res) => {
    db.getUserWithName(pool, req.body.username)
    .then(user => {
      console.log(user);
      if (!user) {
        res.statusCode = 403;
        res.redirect("/login");
      } else if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.statusCode = 403;
        res.redirect("/login");
      } else {
        req.session.user_id = user.id;
        res.redirect("/");
      }

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};

