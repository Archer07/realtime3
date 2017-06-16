const express = require('express');
const http = require('http');
const path = require('path');
const io = require('socket.io');

const PORT = process.env.PORT || 3000;
let app = express();
let server = http.Server(app);

// serving static files

app.use(express.static(path.join(__dirname,'public')));

// templating engine setup
app.set('view engine', 'pug');
app.set('views',path.join(__dirname, 'views'));

// test server route
app.get('/', (req, res, next) => {
  res.render('index');
});


server.listen(PORT, () => {
  console.log('App is listening on PORT ', PORT);
});
