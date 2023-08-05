function sendMessage() {
    var userInput = document.getElementById('userInput').value;
    appendMessage('User', userInput);
    respondToUser(userInput);
  }
  
  function appendMessage(sender, message) {
    var chatBox = document.getElementById('chatBox');
    var messageDiv = document.createElement('div');
    messageDiv.textContent = sender + ': ' + message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
  }
  
  function respondToUser(userInput) {
    // Add your custom logic here to generate chatbot responses based on user input.
    // For a simple example, let's reply with a predefined response.
    var response = 'Thanks for your message: ' + userInput;
    setTimeout(function() {
      appendMessage('Chatbot', response);
    }, 1000);
  }
  