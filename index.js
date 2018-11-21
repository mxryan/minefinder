const express = require("express");
const session = require("express-session");
const path = require("path");
const db = require("./models");
const passport = require("./config/passport");
const app = express();

// **IF YOU REVEAL THE LAST SQUARE AND ITS A BOMB BUT YOU ARE AT 0 BOMBS LEFT (by mistakenly flagging wrong square) THE GAME POSTS A WIN AND A LOSS BUT SHOULD JUST BE A LOSS

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, "client/build")));

app.use(session({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.post("/api/signup", (req, res) => {
  console.log(req.body);
  db.Users.create(req.body).then(d => {
    res.json(d)
  }).catch(e => {
    console.log(e);
    res.json(e);
  });
})

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  console.log(req.user);
  console.log("hi");
  res.json(req.user);
});

app.get("/api/logout", (req, res) => {
  req.logOut();
  res.json({
    msg: "User logged out"
  });
})

app.get("/api/ping", (req, res) => {
  console.log(req);
  const serverResponse = {
    msg: "Hey, I'm listening",
    user: req.user ? true : false,
  }
  res.json(serverResponse);

});

app.post("/api/results/", (req, res) => {
  // if the game time is greater than 1000 seconds, count it as a loss?
  console.log("body----------------------")
  console.log(req.body);
  // gameStarted: bool, timeElapsed: int, gameWon: bool, boardSize: "small" || "medium" || "large"
  console.log("user---------------------------")
  console.log(req.user);
  const boardSize = req.body.boardSize;
  const wins = boardSize + "_wins";
  const losses = boardSize + "_losses";
  const time = boardSize + "_time";
  const bestTime = boardSize + "_best_time"



  db.Users.findOne({
      where: {
        id: req.user.id
      }
    })
    .then((d) => {
      console.log(typeof d[wins]);
      let newWins = req.body.gameWon ? d[wins] + 1 : d[wins];
      console.log("newWins: ", newWins);
      let newLosses = req.body.gameWon ? d[losses] : d[losses] + 1;
      console.log("newLosses: ", newLosses);
      let newTime = req.body.gameWon ? d[time] + req.body.timeElapsed : d[time]
      console.log("newTime: ", newTime);
      // if you lose your best time is being overwritten as null
      let newBestTime = null;
      if (req.body.gameWon) {
        if (d[bestTime]) {
          newBestTime = req.body.timeElapsed < d[bestTime] ? req.body.timeElapsed : d[bestTime]
        } else {
          newBestTime = req.body.timeElapsed;
        }
      } else {
        newBestTime=d[bestTime];
      }
      console.log("newBestTime: ", newBestTime);
      db.Users.update({
          [wins]: newWins,
          [losses]: newLosses,
          [time]: newTime,
          [bestTime]: newBestTime
        }, {
          where: {
            id: req.user.id
          }
        })
        .then((d2) => {
          console.log(d2);
          res.json(d2);
        })
        .catch((e) => {
          console.log(e);
          res.json({
            msg: "something went wrong",
            ...e
          })
        })
    })
  // res.json({msg: "I got your post request, thanks."})
});

app.get("/api/stats", (req, res) => {
  db.Users.findOne({
    where: {
      id: req.user.id
    }
  }).then(d => {
    console.log(d);
    res.json(d);
  }).catch(e => {
    console.log(e);
    res.json(e);
  })
});

app.get("/api/leaderboard/best_time/:boardSize", (req, res) => {
  // what leaderboards to i want?
  db.Users.findAll().then(users => {
    console.log(users);
    res.json(users);
  }).catch(err => {
    console.log(err);
    res.json(err)
  });
});

app.get("/api/leaderboard/avg_time/:boardSize", (req, res) => {

})


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 5000;
db.sequelize.sync({
  force: true
}).then(() => {
  app.listen(PORT, () => {
    console.log("Listening at " + PORT);
  })
});