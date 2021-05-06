const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountant = new Schema({
  id: {
    type: String
  },
  price: {
    type: Number
  },
  action: {
    type: String
  },
})

const secondaryExpenses = mongoose.model('secondaryExpenses', accountant)

module.exports = secondaryExpenses;