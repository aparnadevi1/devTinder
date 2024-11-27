const mongoose=require('mongoose');
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://chodapuneediaparnadevi:QIcQwlsTIVL316Aw@namastenodejs.xmpl2.mongodb.net/devTinder");
}

module.exports=connectDB;



// const { MongoClient } = require('mongodb');

// const url="mongodb+srv://chodapuneediaparnadevi:QIcQwlsTIVL316Aw@namastenodejs.xmpl2.mongodb.net/";
// const client = new MongoClient(url);
// const dbName = 'testing';

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('user');

//   // the following code examples can be pasted here...
//   const findResult = await collection.find({}).toArray();
//  console.log('Found documents =>', findResult);

//  const data={
//     firstName:"Mourya",
//     secondName:"Teja"
//  }
//  const insertResult = await collection.insertOne(data);
// console.log('Inserted documents =>', insertResult);

//   return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());
// // QIcQwlsTIVL316Aw