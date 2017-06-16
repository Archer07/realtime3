$(document).ready(function() {
  // variables decalaration
  let loginBox = $('.enterChat');
  let loginF = $('#createuser');
  let user = $('#userInput');
  let chatBox = $('.chatroom');
  let usersList = $('#users');

  // initializing connection
  let socket = io.connect('ws://localhost:3000');
  // on connection
  socket.on('connect', () => {
    // alert('connected');
  });

  //emit usercreation event after username login
  loginF.on('submit', function(e) {
    e.preventDefault();
    let username = user.val();
    user.val('');
    socket.emit('createUser', username, function(data) {
      if (data) {
        $(loginBox).hide();
        $(chatBox).show();
      }
    });

    socket.on('users', function(data) {
      let userli = '';
      usersList.html('');
      for (let i = 0; i < data.length; i++) {
        userli = '<li class="list-group-item">'+ data[i] +'</li>';
        usersList.append(userli);

      }

    });

    // on disconnection
    socket.on('disconnected', function(data) {
      let userli = '';
      usersList.html('');
      for (let i = 0; i < data.length; i++) {
        userli = '<li class="list-group-item">'+ data[i] +'</li>';
        usersList.append(userli);
      }
    });
  });

});
