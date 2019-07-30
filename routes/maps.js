/*
 * All routes for Maps are defined here
 * Since this file is loaded in server.js into /maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const methodOverride = require("method-override");


module.exports = (pool, db, bcrypt) => {

  // GET /maps/
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

    if (req.session.user_id) {

      const params = req.body;
      const queryParams = [
        params.title,
        params.subject,
        params.description,
        params.city,
        req.session.user_id /* owner_id, same as cookie user_id */];

      db.addMap(pool, queryParams)
      .then(map => {
        if (map) {
          res.redirect(`/maps/${map.id}/edit/`)
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
      // user not in cookie so log in
      res.render("login", templateVars);
    }

  });

  // After submitting the form, the server gets a GET request and renders the map editing page:
  router.get("/:mapid/edit", (req, res) => {

    const mapID = req.params.mapid;

    // Check that map has not been deleted and exists
    db.getMapWithId(pool, mapID)
    .then(map => {
      if (map) {
        // TO ADD: Function to get single map from database so that we can hand all map specific variables to the template (title, description, etc.)
        let templateVars = {
          map_id: mapID,
          map_city: map.city
        };

        res.render("maps_edit", templateVars);
      } else {
        res.statusCode = 404;
        res.redirect(`/`);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  // TO MAKE - Map edit route
  router.put("/:mapid/edit", (req, res) => {
    const params = req.body;
    const mapParams = [req.params.mapid, params.title, params.subject, params.description, params.city];

    // NEED TO USE COOKIES TO INSERT owner_id INTO DB
    db.updateMap(pool, mapID, mapParams)
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
  });

  // Map get for view map

  // Map delete for id
  router.delete("/:mapid/delete", (req, res) => {
    // Do we need to check functionality if map already deleted?
    db.deleteMap(pool, req.params.mapid)
    .then(map => {
      if (map) {
        res.redirect(`/`)
      } else {
        res.statusCode = 404;
        res.redirect(`/`);
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

