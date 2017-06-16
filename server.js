const express = require('express');
const http = require('http');
const path = require('path');

const PORT = process.env.PORT || 3000;
let app = express();
let server = http.Server(app);

// chat users
let users = [];


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
io.sockets.on('connection', (socket) => {
  // on createUser event
  socket.on('createUser', (data, callback) => {
    callback(true);
    socket.user = data;
    users.push(socket.user);
    // console.log(users);
    io.sockets.emit('users', users);
  });

  socket.on('msg', (data) => {
    // console.log('message received');
    // console.log(data);
    io.sockets.emit('addmsg', {user: socket.user, text: data});
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
    if(!socket.user) return;
    users.splice(users.indexOf(socket.user), 1);
    io.sockets.emit('disconnected', users);
  });
});


server.listen(PORT, () => {
  console.log('App is listening on PORT ', PORT);
});
