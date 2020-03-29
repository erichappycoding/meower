const MongoClient = require('mongodb').MongoClient;


// const password = 'Uiop%21%40%23%241234';
// const dbURI = 'mongodb+srv://meowerAdmin:' + password 
//                 + '@cluster0-wuca6.mongodb.net/meower?retryWrites=true&w=majority';


const uri = "mongodb+srv://atlasAdmin:<password>@cluster0-wuca6.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  const collection = client.db("meower").collection("mews");

  console.log("Connected to Atlas MongoDB / meower database.")
  
  client.close();
});