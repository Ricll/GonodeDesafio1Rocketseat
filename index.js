const express = require("express");

const app = express();

const nunjucks = require("nunjucks");

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.set("view engine", "njk");

const verifyQueryParams = (req, res, next) => {
  console.log(req.url);

  if (req.url == "/check?age=") {
    return res.render("age");
  } else {
    return next();
  }
};

app.get("/", (req, res) => {
  return res.render("age");
});

app.get("/check/", verifyQueryParams, (req, res) => {
  if (req.query.age >= 18) {
    let ageData = req.query.age;

    return res.render("major", { ageData });
  } else {
    let ageData = req.query.age;
    return res.render("minor", { ageData });
  }
});

app.listen(3000);
