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
  const resAction = await moviedb.discoverMovie({ language: "es", with_genres: 28 }); // 28 es el ID de género para las películas de acción
  const resHorror = await moviedb.discoverMovie({ language: "es", with_genres: 27 }); // 27 es el ID de género para las películas de terror
  res.render("index", { relevante: resMovie.results, action: resAction.results, horror: resHorror.results });
});

app.all("/favicon.ico", (req, res) => {
  return;
});

app.post("/modal-info", async (req, res) => {
  const resMovie = await moviedb.movieInfo({ id: req.body.id, language: "es" });
  res.send(resMovie);
});

app.listen(process.env.PORT || 5000);
console.log("Tamos ready");
