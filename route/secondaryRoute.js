const express = require('express')
const router = express.Router()
const secondaryExpenses = require('../models/secondaryExpenses')

router.get('/getSecondary', (req, res) => {
  secondaryExpenses.find().then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err)
    })
})


router.post('/addSecondary', (req, res) => {
  console.log(req.body)
  var obj;
  secondaryExpenses.findOne({
    id: req.body.id
  }).then((result) => {
    if (result == null) {
      console.log("null object")
      const secondaryItem = new secondaryExpenses(req.body).save()
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
      secondaryExpenses.updateOne({
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

router.delete('/deleteSecondary', (req, res) => {
  console.log(req.body)
  secondaryExpenses.remove({
    id: req.body.id
  }).then((sucess) => {
    console.log(sucess)
  }), (err) => {
    cosnole.log(err)
  }
})

module.exports = router