module.exports = function(models) {

  const numbersList = [];
  var message = '';

  const index = function(req, res) {

    models.Number.find({}, function(err, numbers) {
      if (err) {
        return next(err);
      }
      res.render('numbers/index', {
        numbers
      });
    });
  }

  const townPage = function(req, res) {
    var town = req.body.town;

    models.Number.find({}, function(err, results) {
      let foundList = [];

      if (results) {
        for (let i = 0; i < results.length; i++) {
          var regNum = results[i];
          if (regNum.name.startsWith(town)) {
            foundList.push(regNum.name);
          }
        }
      }

      res.render('numbers/index', {foundList});
    });
  }


  const add = function(req, res, next) {
    var number = {
      name: req.body.number
    };


    if (number == '' || !number.name) {
      req.flash('error', "Registration numbers can't be blank!")      
      res.render('numbers/index');
    } else {
      models.Number.findOne({name: req.body.number}, function(err, results) {
        if (results) {
          req.flash('error', 'Number Duplicated!')
          res.render('numbers/index');
        } else {
          models.Number.create(number, function(err, results) {
            if (err) {
              return next(err);

            }
            req.flash('success', 'Number Added!')
            res.redirect('/index');
          });
        }
      });

    }

  }


  return {
    index,
    add,
    townPage
  }
}
