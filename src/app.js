const express = require("express");
const connectDB = require("./config/database");
const app = express();

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

//import and manage all routes


const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const users = await User.find({ emailId: userEmail });
//     if (users.length === 0) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     if (users.length === 0) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;
//   try {
//     const ALLOWED_UPDATES = ["photoUrl", "about", "age", "skills"];
//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );
//     if (!isUpdateAllowed) {
//       throw new Error("Update not allowed");
//     }
//     if (data?.skills.length > 10) {
//       throw new Error("Skills can not be greater than 10  ");
//     }
//     const users = await User.findByIdAndUpdate({ _id: userId }, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });

//     res.send("User Updated successfully");
//   } catch (err) {
//     res.status(400).send("something went wrong" + err.message);
//   }
// });

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
