const express = require("express");
const session = require("express-session");
const path = require("path");
const db = require("./models");
const passport = require("./config/passport");
const app = express();

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
    requestObject: req.user ? "There is a user" : "There is no user",
    // isUser: req.user
  }
  res.json(serverResponse);
  
});

app.post("/api/results", (req, res)=>{
  // if the game time is greater than 1000 seconds, count it as a loss?
  console.log(req.body);
  res.json({msg: "I got your post request, thanks."})
})


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 5000;
db.sequelize.sync({force: true}).then(()=>{
  app.listen(PORT, ()=>{
    console.log("Listening at " + PORT);
  })
});