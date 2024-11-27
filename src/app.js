const express = require("express");
const connectDB=require("./config/database");
const app = express();
const User=require("./models/user")






app.post("/signup",async(req,res)=>{
  const userObj={
    firstName:"Akshay",
    lastName:"Saini",
    emailId:"akshay@saini.com",
    password:"akshay@123  "
  }
  const user=new User(userObj);
  //saves data to the datadase and returns a promise
  await user.save();
  res.send("User added Successfully")
})
connectDB().then(()=>{
  console.log("Database connection establihed");
  app.listen(3000, () => {
    console.log("server us ;istenong");
  });
  
}).catch(err=>{
  console.log("Database connection error")
})







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