const express = require('express');
const path = require('path');

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'af83f1485c914e33830b868cf62af8a7',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

let students = [];

const app = express();

app.use(rollbar.errorHandler());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
  rollbar.info('HTML file served successfully');
});

app.get('/api/student', (req, res) => {
  let {name} = req.body;
  name = name.trim();

  students.push(name);

  rollbar.log('Student added successfully', {author: 'Freeman', type: 'manual'});

  res.status(200).send(students)
});

const port = process.env.PORT || 4545;

app.listen(port, () => console.log(port + ' years ago in ancient Egypt...'));