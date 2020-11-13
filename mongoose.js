const mongoose = require('mongoose')

const uri=''your_db_uri'

mongoose.connect(uri, {
useNewUrlParser: true,
useCreateIndex: true
})

//||'mongodb://127.0.0.1:27017/smartBuilding'

//'mongodb://127.0.0.1:27017/smartBuilding'
// const MongoClient = require('mongodb').MongoClient;

// const client = new MongoClient(uri, { useNewUrlParser: true,useCreateIndex: true });
// client.connect(err => {
//   const collection = client.db("smartBuilding").collection("energygrid");
//   // perform actions on the collection object
//   client.close();
// });
