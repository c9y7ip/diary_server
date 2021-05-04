const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const nessarayExpenses = require('./models/nessarayExpenses')

const app = express();

const accountantURL = "mongodb+srv://test123:test123@diarydb.cwgjq.mongodb.net/accountant?retryWrites=true&w=majority"
mongoose.connect(accountantURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  next();
})

app.post('/addNessaray', (req, res) => {
  console.log(req.body)
  var obj;
  nessarayExpenses.findOne({
    id: req.body.id
  }).then((result) => {
    if (result == null) {
      console.log("null object")
      const nessarayItem = new nessarayExpenses(req.body).save()
        .then((result) => {
          res.send("i am post ok")
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      console.log("update value")
      console.log(req.body.id)
      console.log(req.body.price)
      nessarayExpenses.updateOne({
        id: req.body.id
      }, {
        price: req.body.price
      }).then((sucess) => {
        console.log(sucess)
      }), (err) => {
        cosnole.log(err)
      }

    }
  })
})

app.get('/getNessarary', (req, res) => {
  nessarayExpenses.find().then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err)
    })
})

app.delete('/deleteNessaray/', (req, res) => {
  console.log(req.body)
  nessarayExpenses.remove({
    id: req.body.id
  }).then((sucess) => {
    console.log(sucess)
  }), (err) => {
    cosnole.log(err)
  }
})

app.listen(5000, () => console.log('Server started on port 5000'));