const express = require('express');
const http = require('http');
const io = require('socket.io');

const PORT = process.env.PORT || 3000;
let app = express();
let server = http.Server(app);

// test server route
app.get('/', (req, res, next) => {
  res.send('I am working!');
});


server.listen(PORT, () => {
  console.log('App is listening on PORT ', PORT);
});
