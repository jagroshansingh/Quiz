const express = require("express");
const { authModel } = require("../Models/auth.model");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 5, async (err, hash) => {
      if (hash) {
        let push = await authModel.insertMany({
          email: req.body.email,
          password: hash,
        });
        const token = jwt.sign({ course: "fswd" }, "masai");
        let obj = {
          msg: "Signup and Login Successful",
          token,
          player: push[0].email,
          playerId: push[0]._id,
        };
        res.send(obj);
      } else res.send({msg:'Email already registered'});
    });
  } catch (error) {
    console.log(error);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    let pull = await authModel.find({ email: req.body.email });
    if (pull.length == 1) {
      bcrypt.compare(req.body.password, pull[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ course: "fswd" }, "masai");
          let obj = {
            msg: "Login Successful",
            token,
            player: pull[0].email,
            playerId: pull[0]._id,
          };
          res.send(obj);
        } else res.send({ msg: "Invalid Credentials!!!" });
      });
    } else res.send({ msg: "Invalid Credentials" });
  } catch (error) {
    console.log(error);
  }
});

authRouter.get("/verify", async (req, res) => {
  try {
    jwt.verify(req.headers.token, "masai", (err, decoded) => {
      if (decoded) res.send("verified");
      else res.send("not verified");
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = { authRouter };
