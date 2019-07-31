// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
// const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require("morgan");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const pool = new Pool(dbParams);
pool.connect();


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Cookie Session Configuration
app.use(cookieSession({
  name: 'session',
  keys: ["key1"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// // Separated Routes for each Resource
// // Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const mapsRoutes = require("./routes/maps");
const pinsRoutes = require("./routes/pins");
const authenticationsRoutes = require("./routes/authentications");

const db = require("./db/queries/queryExporter")

// // Mount all resource routes
// // Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(pool, db, bcrypt));
app.use("/maps", mapsRoutes(pool, db));
app.use("/maps", pinsRoutes(pool, db));
app.use("", authenticationsRoutes(pool, db, bcrypt));

// // Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  let templateVars = { user: null };
  templateVars.profile = {
    mapsCreated: 232,
    mapsContributed: 423,
    liked_maps: 51,
    liked_by: 122
  }

  if (req.session.user_id) {
    db.getUserWithId(pool, req.session.user_id)
    .then(user => {
      console.log(user);
      templateVars.user = user;
      res.render("profile", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  } else {
    res.render("profile", templateVars);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
