const express = require('express');
const http = require('http');
const path = require('path');

const PORT = process.env.PORT || 3000;
let app = express();
let server = http.Server(app);

let io = require('socket.io')(server);


// serving static files
app.use(express.static(path.join(__dirname,'public')));

// templating engine setup
app.set('view engine', 'pug');
app.set('views',path.join(__dirname, 'views'));

// test server route
app.get('/', (req, res, next) => {
  res.render('index');
});

// testing socket connection
io.on('connection', (socket) => {
  console.log('user has been connected!');
});


server.listen(PORT, () => {
  console.log('App is listening on PORT ', PORT);
});
