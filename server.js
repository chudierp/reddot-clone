const express = require('express')
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
// const models = require('./data/models');

const app = express()

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./controllers/posts')(app);
require('./data/reddit-db');

app.get('/', (req, res) => {
    res.render('home', { msg: 'hey Chudier' });
})

app.get('/posts/new', (req, res) => {
    res.render('posts-new');
});

// app.post('/posts/new', (req, res) => {
//     console.log(req.body);
// });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port 3000!')
})