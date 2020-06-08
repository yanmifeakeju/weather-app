const path = require("path");
const express = require("express");
const hbs = require("express-handlebars");
const geoLocation = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public/");

//Set handlebars engine and views location
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "../templates/layouts"),
    partialsDir: path.join(__dirname, "../templates/partials"),
  })
);
app.set("views", path.join(__dirname, "../templates/views/"));
app.set("view engine", "hbs");

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("home", {
    title: "Weather",
    script: "/js/app.js",
    name: "Akeju",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Akeju",
    script: "",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    help: "Please tell us the issues you have been experiencing",
    script: "",
    name: "Akeju",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "No address provided",
    });
    return;
  }
  const address =
    req.query.address.charAt(0).toLowerCase() + req.query.address.slice(1);
  geoLocation(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      res.send({
        error,
      });
      return;
      console.log(error);
    }
    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        res.send({
          error,
        });
        return;
        console.log(error);
      }
      res.send({
        forecast,
        location,
      });
      return;
      console.log(location);
      console.log(forecast);
    });
  });
  // res.send({
  //   forecast: "Rain go killing una today",
  //   loaction: req.query.address,
  // });
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     res.send({
//       error: "Illegal search",
//     });
//     return;
//   }
//   console.log(req.query);
//   res.send({
//     products: ["COD", "FIFA"],
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Article not found",
    name: "Akeju",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page does not exist",
    name: "Akeju",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
  console.log(publicDirectoryPath);
});
