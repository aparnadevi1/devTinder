const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const connectionRequest = require("../models/connectionRequest");
const SAVEDATASTRING = "firstName lastName skills photoUrl age gender about";
const User = require("../models/user");
//get all the pending connection requests
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    //fetch all connections with touserId=loggedInuser and interested status from connections table

    const connectionRequests = await connectionRequest
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", ["firstName", "lastName"]);
    //}).populate("fromUserId",firstName lastName);

    if (!connectionRequests) {
      return res.status(400).json({ message: "No Connection Requests found" });
    }
    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch {
    res.status(400).json({ message: "Something went wrong" });
  }
});
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    //fetch all connections with touserId=loggedInuser and interested status from connections table

    const connections = await connectionRequest
      .find({
        $or: [
          { toUserId: loggedInUser._id, status: "accepted" },
          { fromUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", SAVEDATASTRING)
      .populate("toUserId", SAVEDATASTRING);

    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    //}).populate("fromUserId",firstName lastName);

    if (!connections) {
      return res.status(400).json({ message: "No Connection found" });
    }
    res.json({ message: "Data fetched successfully", data: data });
  } catch {
    res.status(400).json({ message: "Something went wrong" });
  }
});
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    console.log(req.user);
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 100;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    const connectionRequests = await connectionRequest
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      })
      .select("fromUserId toUserId");
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(SAVEDATASTRING)
      .skip(skip)
      .limit(limit);
    res.send(users);
  } catch {
    res.status(400).json({ message: "Something went wrong" });
  }
});
module.exports = userRouter;
