const express = require('express');
const path = require('path');

const {resolve} = path;

const app = express();

const PORT = 3000;

app.use(express.static(resolve(__dirname, 'dist')));

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, 'dist/index.html'));
});

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});
