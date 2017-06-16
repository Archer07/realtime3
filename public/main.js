$(document).ready(function() {
  let socket = io();
  socket.connect('http://localhost:3000');
  socket.on('connect', () => {
    alert('connected');
  });
});
