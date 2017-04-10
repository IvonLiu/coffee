var chatId = 'abcdefg';
var userId = '1234567';

$(document).ready(function(){

  firebase.initializeApp(config);

  $('#form').submit(function(event) {

    event.preventDefault();

    message = $('#msg-input').val();

    if (message) {
      sendMessage(message);
    }

    $('#submit-btn').blur();
    document.getElementById('form').reset();

  });

  firebase.database().ref('chats/' + chatId + '/messages').on('value', function(snapshot) {
    messages = [];
    snapshot.forEach(function(item) {
      var message = item.val();
      messages.push(message);
    });
    updateMessageList(messages);
  }); 

});

function sendMessage(message) {
  firebase.database().ref('chats/' + chatId + '/messages').push().set({
    text: message,
    userId: userId
  }, function(err) {
    if (err) {
      console.log(err);
    }
  });
}

function updateMessageList(messages) {
  var messageList = $('#message-list');
  messageList.html('');
  for (var i=0; i<messages.length; i++) {
    var message = messages[i];
    var text = message.text;
    var divClass = message.userId == userId ? 'self message' : 'other message';
    var messageDiv = $('<div>', {class: divClass});
    var span = $('<span>');
    span.html(text);
    messageDiv.append(span);
    messageList.append(messageDiv);
  }

  var messageContainer = document.getElementById('message-container');
  messageContainer.scrollTop = messageContainer.scrollHeight;
}
