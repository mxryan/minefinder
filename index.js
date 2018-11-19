const express = require("express");
const session = require("express-session");
const path = require("path");
const db = require("./models");
const passport = require("./config/passport");
const app = express();

// **IF YOU REVEAL THE LAST SQUARE AND ITS A BOMB BUT YOU ARE AT 0 BOMBS LEFT (by mistakenly flagging wrong square) THE GAME POSTS A WIN AND A LOSS BUT SHOULD JUST BE A LOSS

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

app.post("/api/signup", (req,res)=>{
  console.log(req.body);
  db.Users.create(req.body).then(d=>{
    res.json(d)
  }).catch(e=>{
    console.log(e);
    res.json(e);
  });
})

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  console.log(req.user);
  console.log("hi");
  res.json(req.user);
});

app.get("/api/logout", (req,res)=>{
  req.logOut();
  res.json({msg: "User logged out"});
})

app.get("/api/ping", (req, res) => {
  console.log(req);
  const serverResponse = {
    msg: "Hey, I'm listening",
    user: req.user ? true : false,
  }
  res.json(serverResponse);
  
});

app.post("/api/results/", (req, res)=>{
  // if the game time is greater than 1000 seconds, count it as a loss?
  console.log("body----------------------")
  console.log(req.body);
  console.log("user---------------------------")
  console.log(req.user);
  res.json({msg: "I got your post request, thanks."})
})


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 5000;
db.sequelize.sync({force: false}).then(()=>{
  app.listen(PORT, ()=>{
    console.log("Listening at " + PORT);
  })
});