/*
 * All routes for Maps are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const methodOverride = require("method-override");

module.exports = (pool, db, bcrypt) => {

  // Localhost:8080/
  // Registration page checks if user already has login cookie and redirects
  router.get("/register", (req, res) => {

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
      res.render("register");
    }
  });

  // Look up username, add it to database if it doesn't exist, redirect if it already does
  router.post("/register", (req, res) => {

    // Validate that fields have been filled out
    if (!req.body.username || !req.body.password) {
      res.statusCode = 400;
      return res.send("Missing username or password.");
    }

    db.getUserWithName(pool, req.body.username)
    .then(user => {
      if (user) {
        res.statusCode = 400;
        res.redirect("/login");
      } else {
        const userParams = [
          req.body.username,
          req.body.password
        ];

        db.addUser(pool, userParams)
        .then(user => {
          console.log(user);
          req.session.user_id = user.id;
          res.redirect("/");
        })
        .catch(err => {
          res
          .status(500)
          .json({ error: err.message });
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  // Login page checks if user already has login cookie for redirect
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

