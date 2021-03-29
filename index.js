const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 5000
const pass ='arabianhorse79'

const app = express()
app.use(cors())
app.use(bodyParser.json())


const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://arabian:arabianhorse79@cluster0.u3b1e.mongodb.net/burjAlArab?retryWrites=true&w=majority";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_Pass}@cluster0.u3b1e.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const bookings = client.db("burjAlArab").collection("bookings");
  // perform actions on the collection object
  // console.log('success')
  // client.close();

  app.post('/addBooking', (req,res) => {
    const newbooking = req.body;
    bookings.insertOne(newbooking)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
    console.log(newbooking)
  })


app.get('/bookings',(req,res) =>{
  bookings.find({})
  .toArray((err , documents) =>{
    res.send(documents)
  })

  
})
});













app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)