const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost:27017/anton-reg";

module.exports = function(mongoUrl){
  mongoose.connect(mongoUrl);
  const Number = mongoose.model('Number', {name : String});

  return{
    Number
  };
}
