const express = require("express");
require("dotenv").config();
const app = express();
const methodOverride = require("method-override");
var path = require("path");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "src")));
const { MovieDb } = require("moviedb-promise");
const moviedb = new MovieDb(process.env.MOVIEDB_API);
const mongoose = require("mongoose");

/*
mongoose
  .connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the DB!");
  })
  .catch((err) => {
    console.log(err);
  });
*/

app.get("/", async (req, res) => {
  const resMovie = await moviedb.discoverMovie({ language: "es" });
  res.render("index", { relevante: resMovie.results });
});

app.listen(process.env.PORT || 5000);
console.log("Tamos ready");
