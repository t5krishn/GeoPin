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


  // router.get("/", (req, res) => {
  //   pool.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  // Get profile page for a given user
  router.get("/:userid", (req, res) => {
    // If user is logged in, direct them to profile page
    let templateVars = {user: null};

    if (req.session.user_id) {
      db.getUserWithId(pool, req.session.user_id)
      .then(user => {
        if (user) {
          templateVars.user = user;

          db.profileInfoCount(pool, user.id)
          .then(profile => {
            templateVars.profile = profile;
            res.render("profile", templateVars);
          })
          .catch(err => {
            // profile get info query failed
            res
              .status(500)
              .json({ error: err.message });
          })
        } else {
          // user in cookie, not in db
          res.render("login", templateVars);
        }
      })
      .catch(err => {
        // user in cookie but query to check id in db failed
        res
          .status(500)
          .json({ error: err.message });
      });
    } else {
      // user not in cookie
      res.render("login", templateVars);
    }
  });


  // Get all maps created and contributed to for a given user
  router.get("/:userid/maps", (req, res) => {
    
    if (req.session.user_id) {
      db.getUserWithId(pool, req.session.user_id)
      .then(user => {
        if (user) {
          db.getAllMapsForUser(pool, user.id)
          .then(createdMaps => {
            let data = { createdMaps };

            db.getAllContributions(pool, user.id)
            .then(contributedMaps => {
              data.contributedMaps = contributedMaps;
              res.json(data);
            })
            .catch(err => {
              // getAllContributions query failed
              res
              .status(500)
              .json({ error: err.message });
            });
          })
          .catch(err => {
            // getAllMapsForUser query failed
            res
            .status(500)
            .json({ error: err.message });
          });
        } else {
          // user not logged in
        res.render("login", { user: null });
        }
      })
      .catch(err => {
         // user in cookie but query to check id in db failed
         res
         .status(500)
         .json({ error: err.message });
      });
    } else {
      // user not logged in
      res.render("login", { user:null });
    }
  });

  return router;
};
