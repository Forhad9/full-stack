const express = require('express')
const app = express()
const bodyParser =require('body-parser')
const cors = require('cors')
const port = 7000

app.use(bodyParser.json());
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://emaWatson:CBAog17tnA6en1lq@cluster0.pfwqs.mongodb.net/emaJohnStore?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("emaJohnStore").collection("items");
  const ordersCollection = client.db("emaJohnStore").collection("orders");

  
  app.post('/addProduct', (req, res)=>{
      const items = req.body;
      collection.insertOne(items)
      .then(result =>{
        res.send(result.insertedCount)
      })
  })


  app.get('/items', (req, res)=>{
    collection.find({})
    .toArray((err, documents)=>{
      res.send(documents);
    })
  })



  app.post('/addOrder', (req, res)=>{
    const order = req.body;
    ordersCollection.insertOne(order)
    .then(result =>{
        res.send('result.insertedCount')
    })
})




});






app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})