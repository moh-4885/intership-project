const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const router = express.Router();

router.post("/login", async (req, res, next) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      const error = new Error("no user found");
      error.status = 404;
      return next(error);
    }
    if (user.password !== password) {
      const error = new Error("the password is incorecct");
      error.status = 404;
      return next(error);
    }

    const token = jwt.sign({ email: email, userId: user._id }, "secret", {
      expiresIn: "4h",
    });
    req.session.user = user;

    if (user.isAdmin == true) {
      res.redirect("/admin");
    } else {
      res.redirect("/worker");
    }
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const password = req.body.password;
  const fonction = req.body.fonction;
  const secteur = req.body.secteur;

  try {
    let user = await User.findOne({ email: email });
    if (user) {
      const error = new Error("the user is alerdy exists");
      error.status = 409;
      return next(error);
    }
    user = new User({
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      fonction: fonction,
      secteur: secteur,
    });
    await user.save();

    res.status(201).json({
      message: "user created ",
      user: user,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
});

module.exports = router;
