$(document).ready(function() {
  // variables decalaration
  let loginBox = $('.enterChat');
  let loginF = $('#createuser');
  let user = $('#userInput');
  let chatBox = $('.chatroom');
  let chatF = $('#input');
  let message = $('#msg');
  let usersList = $('#users');
  let msgbox = $('#messages ul');

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
  //emit message event after a message is sent
  chatF.on('submit', function(e) {
    e.preventDefault();
    let text = message.val();
    message.val('');
    socket.emit('msg', text, function(data) {
      if (data) {
        if (chatBox.is(':hidden')) {
          chatBox.show();
        }
      }
    });

  });
  socket.on('addmsg', function(data) {
    console.log(data.text);
    msgbox.append('<li class="list-group-item"><strong>'+ data.user + '</strong>: '+ data.text +'</li>');
  })

});
