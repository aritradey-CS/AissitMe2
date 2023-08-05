// Import the spaCy NLP library
const spacyNlp = require('spacy-nlp');

// Load the English language model from spaCy
let nlp;
spacyNlp.load('en_core_web_sm').then((model) => {
  nlp = model;
}).catch((error) => {
  console.error('Error loading spaCy model:', error);
});

function sendMessage() {
  var userInput = document.getElementById('userInput').value;
  appendMessage('User', userInput);
  getChatbotResponse(userInput);
}

function appendMessage(sender, message) {
  var chatBox = document.getElementById('chatBox');
  var messageDiv = document.createElement('div');
  messageDiv.textContent = sender + ': ' + message;
  messageDiv.className = sender.toLowerCase() + '-message'; // Apply the appropriate class for styling
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}

function getChatbotResponse(userInput) {
  if (!nlp) {
    appendMessage('Chatbot', 'Oops! The chatbot is not ready yet.');
    return;
  }

  // Process the user input with spaCy NLP
  nlp(userInput).then((doc) => {
    // Extract relevant information from the spaCy doc object
    // For example, you can extract intents, entities, or context from the doc object.
    // Then, generate appropriate chatbot responses based on the extracted information.

    // For this simple example, let's reply with a predefined response.
    var chatbotResponse = 'Thanks for your message: ' + userInput;
    appendMessage('Chatbot', chatbotResponse);
  }).catch((error) => {
    console.error('Error processing user input with spaCy:', error);
    appendMessage('Chatbot', 'Oops! Something went wrong.');
  });
}
