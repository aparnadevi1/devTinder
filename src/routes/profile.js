const express = require("express");
const profileRouter = express.Router();
const { validateEditProfileData } = require("../utils/validation");
const { userAuth } = require("../middlewares/auth");
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
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
    console.log("Loggedcsdvsdvedvsdv" + loggedInUser);
    res.send(`${loggedInUser.firstName} , your profile was update`);
  } catch (err) {
    res.status(400).send("something went wrong" + err.message);
  }
});
module.exports = profileRouter;
