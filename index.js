const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


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


const nessarayRoute = require('./route/nessarayRoute')
const secondaryRoute = require('./route/secondaryRoute')
const extraRoute = require('./route/extraRoute')


app.use('/', nessarayRoute)
app.use('/', secondaryRoute)
app.use('/', extraRoute)


app.listen(5000, () => console.log('Server started on port 5000'));