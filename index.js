const express = require('express');
const path = require('path');

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'af83f1485c914e33830b868cf62af8a7',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    rollbar.info('HTML file served successfully');
});

const port = process.env.PORT || 4545;

app.listen(port, () => console.log(port + ' years ago in ancient Egypt...'));