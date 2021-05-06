const express = require('express')
const router = express.Router()
const extraExpenses = require('../models/extraExpenses')

router.get('/getExtra', (req, res) => {
  extraExpenses.find().then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/addExtra', (req, res) => {
  console.log(req.body)
  var obj;
  extraExpenses.findOne({
    id: req.body.id
  }).then((result) => {
    if (result == null) {
      console.log("null object")
      const extraItem = new extraExpenses(req.body).save()
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
      extraExpenses.updateOne({
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

router.delete('/deleteExtra', (req, res) => {
  console.log(req.body)
  extraExpenses.remove({
    id: req.body.id
  }).then((sucess) => {
    console.log(sucess)
  }), (err) => {
    cosnole.log(err)
  }
})

module.exports = router