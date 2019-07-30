/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const methodOverride = require("method-override");

module.exports = (pool, db, bcrypt) => {
  router.get("/", (req, res) => {
    pool.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // All maps for a given user
  router.get("/:userid", (req, res) => {
    // If user is logged in, direct them to profile page
    let templateVars = {user: null};

    if (req.session.user_id) {
      db.getUserWithId(pool, req.session.user_id)
      .then(user => {
        if (user) {
          templateVars.user = user;
          // ***JESSIE CHANGE TO PROFILE VIEW BELOW***
          res.render("index")
        } else {
          // user in cookie, not in db
          res.render("login", templateVars);
        }
      });
    } else {
      // user not in cookie
      res.render("login", templateVars);
    }
  });
  return router;
};
