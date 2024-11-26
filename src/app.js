const express = require("express");
const app = express();
// app.get("/user",(req,res)=>{
//     res.send({firstName:"Mouryaa",lastName:"Devi"})
// })
app.get("/user", (req, res) => {
  res.send({ firstName: "Mourya", lastName: "Devi" });
});
app.post("/user", (req, res) => {
  res.send("data added successfully");
});

// app.use("/test",(req,res)=>{
//     res.send("hello from the server");
// })
app.listen(3000, () => {
  console.log("server us ;istenong");
});
