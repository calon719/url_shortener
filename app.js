const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
const port = 3000;
const urlList = require('./public/jsons/urls.json');

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
});

app.listen(port, () => {
  console.log(`URL Shortener server is running on http://localhost:${port}`);
});
