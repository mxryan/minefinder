const express = require("express");
const passport = require("../config/passport");
const router = express.Router();
const db = require("../models");

router.post("/api/signup", (req, res) => {
  db.Users.findOne({
    where: {
      username: req.body.username
    }
  }).then((d) => {
    if(d) {
      res.json({msg: "Username already exists"})
    } else {
      db.Users.create(req.body).then(d => {
        res.json(d)
      }).catch(e => {
        console.log(e);
        res.json(e);
      });
    }
  });
})

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user ? req.user : {msg: "Log In Error"});
});

router.get("/api/logout", (req, res) => {
  req.logOut();
  res.json({
    msg: "User logged out"
  });
})

router.post("/api/results/", (req, res) => {
  const boardSize = req.body.boardSize;
  const wins = boardSize + "_wins";
  const losses = boardSize + "_losses";
  const time = boardSize + "_time";
  const bestTime = boardSize + "_best_time";
  const avgTime = boardSize + "_avg_time";
  const winRate = boardSize + "_win_rate";

  db.Users.findOne({
      where: {
        id: req.user.id
      }
    })
    .then((d) => {
      let newWins = req.body.gameWon ? d[wins] + 1 : d[wins];
      let newLosses = req.body.gameWon ? d[losses] : d[losses] + 1;
      let newTime = req.body.gameWon ? d[time] + req.body.timeElapsed : d[time]
      let newAvgTime = newTime / newWins;
      let newWinRate = newWins / (newWins + newLosses);
      let newBestTime = null;
      
      if (req.body.gameWon) {
        if (d[bestTime]) {
          newBestTime = req.body.timeElapsed < d[bestTime] ? req.body.timeElapsed : d[bestTime]
        } else {
          newBestTime = req.body.timeElapsed;
        }
      } else {
        newBestTime = d[bestTime];
      }
      if (isNaN(newAvgTime)) {
        newAvgTime = null;
      }
      
      db.Users.update({
          [wins]: newWins,
          [losses]: newLosses,
          [time]: newTime,
          [bestTime]: newBestTime,
          [avgTime]: newAvgTime,
          [winRate]: newWinRate
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
});

router.get("/api/stats", (req, res) => {
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

router.get("/api/leaderboard/best_time/:boardSize", (req, res) => {
  db.Users.findAll({
    where: {
      [req.params.boardSize + "_best_time"]: {
        $not: null
      }
    },
    order: [[req.params.boardSize + "_best_time", "ASC"]],
    attributes: ["id", "username", req.params.boardSize + "_best_time"]
  }).then(users => {
    console.log(users);
    res.json(users);
  }).catch(err => {
    console.log(err);
    res.json(err)
  });
});

router.get("/api/leaderboard/avg_time/:boardSize", (req, res) => {
  db.Users.findAll({
    where: {
      [req.params.boardSize + "_best_time"]: {
        $not: null
      }
    },
    order: [[req.params.boardSize + "_avg_time", "ASC"]],
    attributes: ["id", "username", req.params.boardSize + "_avg_time"]
  }).then(users => {
    console.log(users);
    res.json(users);
  }).catch(err => {
    console.log(err);
    res.json(err)
  });
});

router.get("/api/leaderboard/win_rate/:boardSize", (req,res)=>{
  db.Users.findAll({
    where: {
      [req.params.boardSize + "_best_time"]: {
        $not: null
      }
    },
    order: [[req.params.boardSize + "_win_rate", "DESC"]],
    attributes: ["id", "username", req.params.boardSize + "_win_rate"]
  }).then(users => {
    console.log(users);
    res.json(users);
  }).catch(err => {
    console.log(err);
    res.json(err)
  });
});
module.exports = router;