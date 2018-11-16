const express = require("express");
const path = require("path");
const db = require("./models");
const passport = require("./config/passport");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "client/build")));

app.use(passport.initialize());



app.get("/api/example", (req, res)=>{
  res.json({greeting: "hello world"});
});

app.post("/api/signup", (req,res)=>{
  console.log(req.body);
  db.Users.create(req.body).then(d=>{
    res.json(d)
  }).catch(e=>{
    console.log(e);
    res.json(e);
  });
})

app.post("/api/login", passport.authenticate("local"), function (req, res) {
  console.log(req.user);
  console.log("hi");
  res.json(req.user);
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 5000;
db.sequelize.sync({force: false}).then(()=>{
  app.listen(PORT, ()=>{
    console.log("Listening at " + PORT);
  })
});