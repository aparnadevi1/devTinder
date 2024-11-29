const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { validateSignUpData } = require("./utils/validation");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Email id not present in DB");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //create a JWT Token
      const token = await user.getJWT();
     // console.log(token);

      //Add the token  to cookie and send the response back to the user
      res.cookie("token", token,{expires:new Date(Date.now()+8*3600000)});
      res.send("Login Successful");
    } else {
      throw new Error("Password is not valid");
    }
  } catch (err) {
    res.status(400).send("something went wrong" + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("something went wrong" + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " is sending connection request");
});

app.post("/signup", async (req, res) => {
  // console.log(req.body);
  // const userObj = {
  //   firstName: "Akshay",
  //   lastName: "Saini",
  //   emailId: "akshay@saini.com",
  //   password: "akshay@123  ",
  // };

  // //saves data to the datadase and returns a promise
  try {
    //validates the data
    validateSignUpData(req);

    //Encrypting the password
    //npm package bcrypt
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added Successfully");
  } catch (err) {
    res.status(400).send("Error Saving the user" + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills can not be greater than 10  ");
    }
    const users = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });

    res.send("User Updated successfully");
  } catch (err) {
    res.status(400).send("something went wrong" + err.message);
  }
});

connectDB()
  .then(() => {
 //   console.log("Database connection establihed");
    app.listen(3000, () => {
      console.log("server is Listening");
    });
  })
  .catch((err) => {
    console.log("Database connection error");
  });

// app.get("/user",(req,res)=>{
//     res.send({firstName:"Mouryaa",lastName:"Devi"})
// })
// app.get("/user", (req, res) => {
//   res.send({ firstName: "Mourya", lastName: "Devi" });
// });
// app.post("/user", (req, res) => {
//   res.send("data added successfully");
// });

// app.use("/test",(req,res)=>{
//     res.send("hello from the server");
// })
// mongodb://atlas-sql-6746d4693f4f8d43463c4f96-mzpcm.a.query.mongodb.net/myVirtualDatabase?ssl=true&authSource=admin

// mongodb+srv://chodapuneediaparnadevi:<db_password>@namastenode.mzpcm.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNode
