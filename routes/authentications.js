/*
 * All authentication routes are defined here
 * This file is loaded in server.js ,
 *   these routes are mounted onto /
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const methodOverride = require("method-override");

module.exports = (pool, db, bcrypt) => {

  // Localhost:8080/
  // Registration page checks if user already has login cookie and redirects
  router.get("/register", (req, res) => {
    let templateVars = {user: null};

    if (req.session.user_id) {
      db.getUserWithId(pool, req.session.user_id)
      .then(user => {
        if (user) {
          // user is already present in db and cookie so redirect to home page 
          templateVars.user = user;
          res.render("index", templateVars);
        } else {
          // user does not exist in db but does in cookie
          // so render register and ask user to register/login
          req.session.user_id = null;
          res.render("register", templateVars);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    } else {
      res.render("register", templateVars);
    }
  });

  // Look up username, add it to database if it doesn't exist, redirect if it already does
  router.post("/register", (req, res) => {
    let templateVars = {user: null};

    // Validate that fields have been filled out
    if (!req.body.username || !req.body.password) {
      res.statusCode = 400;
      return res.send("Missing username or password.");
    }

    db.getUserWithName(pool, req.body.username)
    .then(user => {
      if (user) {
        // user already exists, redirect to login page instead of register
        res.statusCode = 400;
        res.redirect("/login");
      } else {
        // user not in db, so go forward with registration
        const hashedPassword = bcrypt.hashSync(req.body.password,10); //Salt rounds of 10

        const userParams = [
          req.body.username,
          hashedPassword
        ];

        db.addUser(pool, userParams)
        .then(user => {
          templateVars.user = user;
          req.session.user_id = user.id;
          res.render("index", templateVars);
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
    let templateVars = {user: null};
    if (req.session.user_id) {
      db.getUserWithId(pool, req.session.user_id)
      .then(user => {
        if (user) {
          // User already in cookie and in db as well
          templateVars.user = user;
          res.render("index", templateVars);
        } else {
          // user in cookie but not db, invalid user **FIX
          // redirect to login page and set cookie to null
          req.session.user_id = null;
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    } else {
      // cookie must be set before rendering
      res.render("login", templateVars);
    }
  });

  // Take login userID and store in cookie if user doesn't already have a userID as cookie
  router.post("/login", (req, res) => {
    let templateVars = {user: null};

    db.getUserWithName(pool, req.body.username)
    .then(user => {
      if (!user) {
        // ERROR user not in db, username does not match
        res.statusCode = 403;
        res.redirect("/login");
      } else if (!bcrypt.compareSync(req.body.password, user.password)) {
        // ERROR password not same as in db
        res.statusCode = 403;
        res.redirect("/login");
      } else {
        templateVars.user = user;
        req.session.user_id = user.id;
        res.render("index", templateVars);
      }

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });



  router.post("/logout", (req, res) => {
    let templateVars = {user: null};
    req.session.user_id = null;
    res.render("index", templateVars);
  });

  return router;
};

