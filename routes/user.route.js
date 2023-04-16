const express = require("express");
const { UserModel } = require("../models/user.model");

const userRouter = express.Router();
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const payload = req.body;
  try {
    const user = new UserModel(payload);
    user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      const user2 = await UserModel.find({ password });
      if (user2.length > 0) {
        const token = jwt.sign(
          {
            userID: user[0]._id,
            email: user[0].email,
            password: user[0].password,
          },
          "masai"
        );
        res.send({ token: token, email: email, password: password });
        // console.log(token)
      } else {
        res.send("wrong password");
      }
    } else {
      res.send("Email doesn't exist");
    }
  } catch (err) {
    res.send(err);
  }
});

userRouter.patch("/update_user/:id", async (req, res) => {
  const payload = req.body;
  const ID = req.params.id;
  try {
    await UserModel.findByIdAndUpdate({ _id: ID }, payload);
    res.send("Updated the name!!");
  } catch (err) {
    console.log(err);
  }
});

userRouter.delete("/delete_user/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await UserModel.findByIdAndDelete({ _id: ID });
    res.send("Deleted the User");
  } catch (err) {
    console.log(err);
  }
});

module.exports = { userRouter };
