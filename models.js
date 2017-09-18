const mongoose = require('mongoose');

module.exports = function(mongoUrl){
  mongoose.connect(mongoUrl);
  const Number = mongoose.model('Number', {name : String});

  return{
    Number
  };
}
