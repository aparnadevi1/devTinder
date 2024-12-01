const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const connectionRequest = require("../models/connectionRequest");
const SAVEDATASTRING = "firstName lastName skills";
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
    res
      .status(400)
      .json({ message: "Data fetched successfully", data: connectionRequests });
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
    res.status(400).json({ message: "Data fetched successfully", data: data });
  } catch {
    res.status(400).json({ message: "Something went wrong" });
  }
});

module.exports = userRouter;
