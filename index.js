const express = require("express");
const session = require("express-session");
const path = require("path");
const db = require("./models");
const passport = require("./config/passport");
const app = express();
const apiRoutes = require("./routes/api");
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(session({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(apiRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Listening at " + PORT);
  })
});

