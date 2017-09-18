const express = require('express');
const exphbs = require('express-handlebars');
const Numbers = require('./numbers');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Models = require('./models');
const models = Models('mongodb://localhost/anton-reg');
const app = express();

const numbers = Numbers(models);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }}));
app.use(flash());

app.get('/',function(req, res){
  res.redirect('/index');
})
app.get('/index', numbers.index);
app.post('/index/add', numbers.add);
app.post('/index/townPage', numbers.townPage);


const port = 3000;

app.listen(port, function(){
    console.log('Web app started on port : ' + port);
});
