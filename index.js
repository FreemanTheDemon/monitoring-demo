const express = require('express');
const path = require('path');

// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: 'af83f1485c914e33830b868cf62af8a7',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

let students = [];

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
  rollbar.info('HTML file served successfully');
});

app.post('/api/student', (req, res) => {
  let {name} = req.body;
  name = name.trim();

  students.push(name);

  rollbar.log('Student added successfully', {author: 'Freeman', type: 'manual'});

  res.status(200).send(students);
});

app.use(rollbar.errorHandler());
const port = process.env.PORT || 4545;

app.listen(port, () => console.log(port + ' years ago in ancient Egypt...'));