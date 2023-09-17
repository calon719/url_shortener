const express = require('express');
const { engine } = require('express-handlebars');
const fs = require('fs');

const app = express();
const port = 3000;
const URL_LIST_PATH = './public/jsons/urls.json';
const urlList = require(URL_LIST_PATH);

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/success', (req, res) => {
  const { url } = req.body;
  const existedURL = urlList.find((item) => item.url === url);
  let shortenedURL = 'https://localhost/';

  if (existedURL === undefined) {
    const id = Math.random().toString(36).substring(2, 7);
    const data = {
      id,
      url,
    };

    urlList.push(data);
    fs.writeFile(URL_LIST_PATH, JSON.stringify(urlList), (err) => {
      if (err) {
        throw err;
      }
    });

    shortenedURL += id;
  } else {
    shortenedURL += existedURL.id;
  }

  res.render('success', { shortenedURL });
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
});

app.listen(port, () => {
  console.log(`URL Shortener server is running on http://localhost:${port}`);
});
