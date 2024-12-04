const express = require("express");
const profileRouter = express.Router();
const { validateEditProfileData } = require("../utils/validation");
const { userAuth } = require("../middlewares/auth");
const bcrypt = require("bcrypt");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("something went wrong" + err.message);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    // console.log("Loggedcsdvsdvedvsdv" + loggedInUser);
    await loggedInUser.save();
    res.send(`${loggedInUser.lastName} , your profile was update`);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    loggedInUser.password = hashedPassword;
    loggedInUser.save();
    res.send("Password Update Successfully");
  } catch (err) {
    res.status(400).send("something went wrong" + err.message);
  }
});
module.exports = profileRouter;
