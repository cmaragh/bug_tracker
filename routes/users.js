const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/signup", (req, res) => {
  console.log(req.body);
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          msg: "email exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const newUser = new User({
              email: req.body.email,
              password: hash,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
            });
            newUser
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  msg: "User created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    })
    .catch();
});

router.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((users) => {
      if (users.length < 1) {
        return res.status(401).json({
          msg: "Auth failed",
        });
      }

      bcrypt.compare(req.body.password, users[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            msg: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: users[0].email,
              userId: users[0]._id,
              firstName: users[0].firstName,
              lastName: users[0].lastName,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );

          return res.status(200).json({
            msg: "Auth successful",
            token: token,
            firstName: users[0].firstName,
            lastName: users[0].lastName,
          });
        }
        res.status(401).json({ msg: "Auth failed" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/:userid", (req, res) => {
  console.log(req.params);
  User.deleteOne({ _id: req.params.userid })
    .exec()
    .then((result) => {
      res.status(200).json({ msg: "User deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
