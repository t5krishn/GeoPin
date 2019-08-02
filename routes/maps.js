/*
 * All routes for Maps are defined here
 * Since this file is loaded in server.js into /maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const methodOverride = require("method-override");

module.exports = (pool, db) => {

  router.use(methodOverride("_method"));

  // GET /maps/
  // Localhost:8080/
  // Homepage browses random maps from map database
  router.get("/", (req, res) => {

    let user = null;
    if (req.session.user_id) {
      user = req.session.user_id;
    }

    db.getAllMaps(pool)
    .then(async maps => {
        if (user) {
          for (let map of maps) {
            await db.doesUserLikeMap(pool, [user, map.id])
            .then(like => {
              if (like) {
                map.likedByUSER = true;
              } else {
                map.likedByUSER = false;
              }
            })
            .catch(err => res.json({error: err.message}))
          }
          res.json(maps);
        } else {
          maps.like = false;
          res.json(maps);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // GET /maps/create
  // Localhost:8080/create
  // Fill out a form to create a new map
  router.get("/create", (req, res) => {
    let templateVars = {user: null};

    if (req.session.user_id) {
      db.getUserWithId(pool, req.session.user_id)
      .then(user => {
        if (user) {
          // user is already present in db and cookie so redirect to map create page
          templateVars.user = user;
          res.render("maps_create", templateVars);
        } else {
          // user does not exist in db but does in cookie
          // so render register and ask user to register/login
          req.session.user_id = null;
          res.render("login", templateVars);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    } else {
      // user not in cookie so go log in
      res.render("login", templateVars);
    }
  });

  // POST maps/create
  // After pressing submit, this post request is sent to the server:
  // Map id and owner_id is not submitted by user
  router.post("/create", (req, res) => {
    // Delete owner id form after!!!! --> DONE :)
    let templateVars = {user: null};

    if (req.session.user_id) {
      db.getUserWithId(pool, req.session.user_id)
      .then(user => {
        if (user) {
          templateVars.user = user;
          const params = req.body;
          // title, subject, description, city, owner_id
          const queryParams = [
            params.title,
            params.subject,
            params.description,
            params.city,
            user.id /* owner_id, same as cookie user_id */];

          db.addMap(pool, queryParams)
          .then(map => {
            if (map) {

              res.redirect(`/maps/${map.id}/edit`);
              // res.redirect(`/maps/${map.id}/edit/`)

            } else {
              // **** map did not get added to db, redirect to create map page ****
              res
              .status(404)
              .json({ error: err.message });
            }
          })
          .catch(err => {
            // **** db connection did not work properly, redirect to create map page ****
            res
              .status(500)
              .json({ error: err.message });
          });
        } else {
          // user in cookie, not in the db so log in
          res.render("login", templateVars);

        }
      });
    } else {
      // user not in cookie so log in
      res.render("login", templateVars);
    }

  });


  // GET /maps/map_id/edit
  // After submitting the form, the server gets a GET request and renders the map editing page:
  router.get("/:mapid/edit", (req, res) => {

    let templateVars = {user: null};

    const map_id = req.params.mapid;

    // Check that map has not been deleted and exists
    db.getMapWithId(pool, map_id)
    .then(map => {
      if (map) {
        // TO ADD: Function to get single map from database so that we can hand all map specific variables to the template (title, description, etc.)
        // ^^ DONE in the line below

        templateVars.map = map;

        if (req.session.user_id) {
          db.getUserWithId(pool, req.session.user_id)
          .then(user => {
            if (user) {
              templateVars.user = user;
              res.render("maps_edit", templateVars);
            } else {
              // USER NOT IN DB BUT IN COOKIE
              // CLEAR COOKIE
              req.session.user_id = null;
              // RENDER WITHOUT A USER LOGGED IN: user=>null
              res.render("maps_edit", templateVars);
            }
          })
          .catch(err => {
            // query get user by Id, connection to db might have not worked
            res
              .status(500)
              .json({ error: err.message })
          });
        } else {
          // RENDER WITHOUT A USER LOGGED IN: user=>null
          res.render("maps_edit", templateVars);
        }
      } else {
        // MAP DOES NOT EXIST OR MAP HAS BEEN DELETED
        // *** stretch: show error that distinguishes between not existing and deleted ***
        res.statusCode = 404;
        res.redirect(`/`);
      }
    })
    .catch(err => {
      // get map by id query did not work properly, connection to db might have not worked
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  // TO MAKE - Map edit route
  router.put("/:mapid/edit", (req, res) => {

    let templateVars = {user: null};
    const map_id = req.params.mapid;

    if (req.session.user_id) {
      db.getUserWithId(pool, req.session.user_id)
      .then(user => {
        if (user) {
          const params = req.body;
          const mapParams = [params.title, params.subject, params.description, params.city];

          // NEED TO USE COOKIES TO INSERT owner_id INTO DB
          db.updateMap(pool, map_id, mapParams)
          .then(map => {
            if (map) {
              res.redirect(`/maps/${map.id}/edit/`)
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
        } else {
          // user in cookie but not in db, go log in
          res.render("login", templateVars);
        }
      });
    } else {
      // user not in cookie, go log in
      res.render("login", templateVars);
    }
  });

  // Map get for view map


  // Map delete for id
  router.delete("/:userid/:mapid/delete", (req, res) => {
    // Do we need to check functionality if map already deleted?
    let templateVars = {user: null};
    const map_id = req.params.mapid;

    if (req.session.user_id) {
      db.getUserWithId(pool, req.session.user_id)
      .then(user => {
        if (user) {
          db.getMapWithId(pool, map_id)
          .then(map => {
            if (map) {
              // map exists in db, go forward with the delete
              db.deleteMap(pool, map.id)
              .then(mapOnDelete => {
                if (mapOnDelete) {
                  res.redirect(`/users/${req.params.userid}`)
                } else {
                  // DELETE FAILED, DB ERROR or map deleted not returned properly
                  res.statusCode = 404;
                  res.redirect(`/`);
                }
              })
              .catch(err => {
                // db query did not work properly, connection to db might have not worked
                res
                  .status(500)
                  .json({ error: err.message });
              });
            } else {
              // MAP DOES NOT EXIST OR MAP HAS BEEN DELETED
              // *** stretch: show error that distinguishes between not existing and deleted ***
              res.statusCode = 404;
              res.redirect(`/`);
            }
          })
          .catch(err => {
            // db query did not work properly, connection to db might have not worked
            res
              .status(500)
              .json({ error: err.message });
          });
        } else {
          // user in cookie but not db so go log in
          res.render("login", templateVars);
        }
      });
    } else {
      // user not in cookie, go log in
      res.render("login", templateVars);
    }
  });

  // Map like/ unlike
  router.post("/:mapid/like", (request, response) => {
    // Delete owner id form after!!!! --> DONE :)
    const mapid = request.params.mapid;

    if (request.session.user_id) {
      db.getUserWithId(pool, request.session.user_id)
      .then(user => {
        // check if it returns a valid user
        if (user) {
          db.doesUserLikeMap(pool, [user.id, mapid])
          .then(like => {
            // if the user likes the map, unlike it
            // else if user unlikes it, like the map
            if (like) {
              db.unlikeMap(pool, [user.id, mapid])
            } else {
              db.likeMap(pool, [user.id, mapid])
            }
          })
        } else {
        // ADD error message to let user know they must be registered to like
          response.json({err: "User does not exist, please"});
        }
      })
      .catch(err => {
        // **** db connection did not work properly, redirect to create map page ****
        response
          .status(500)
          .json({error: err.message });
      });
    } else {
      // user not in cookie so log in
      response.json({err: "No cookie session, log in"});
    }
  });

  return router;
};
