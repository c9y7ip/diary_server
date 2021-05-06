const express = require('express')
const router = express.Router()
const nessarayExpenses = require('../models/nessarayExpenses')

// nessarayExpenses
router.get('/getNessarary', (req, res) => {
  nessarayExpenses.find().then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/addNessaray', (req, res) => {
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

router.delete('/deleteNessaray/', (req, res) => {
  console.log(req.body)
  nessarayExpenses.remove({
    id: req.body.id
  }).then((sucess) => {
    console.log(sucess)
  }), (err) => {
    cosnole.log(err)
  }
})

module.exports = router