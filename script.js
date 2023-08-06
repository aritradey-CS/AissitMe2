// script.js
let nlp;

function loadSpacyNlp() {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/spacy-nlp@1.0.0/builds/en_core_web_sm.js";
  script.onload = initSpacyNlp;
  document.body.appendChild(script);
}

function initSpacyNlp() {
  spacyNlp
    .load("en_core_web_sm")
    .then((model) => {
      nlp = model;
      // Now that the NLP model is ready, enable the chat input
      enableChatInput();
    })
    .catch((error) => {
      console.error("Error loading spaCy model:", error);
    });
}

function enableChatInput() {
  // Enable the chat input by removing the disabled attribute
  document.getElementById("userInput").removeAttribute("disabled");
}

// The rest of your code remains unchanged

// ... Rest of the code ...

// Function to initialize the chatbox with some initial messages
function initializeChatbox() {
  const initialMessages = [
    "What can I help you with today?",
    "You can ask me to recommend movies, music, books, or clothes!",
  ];

  initialMessages.forEach((message) => {
    appendMessage("Chatbot", message);
  });

  // Enable the chat input after displaying initial messages
  enableChatInput();
}

// ... Rest of the code ...

// When the window has loaded, initialize the chatbox
window.onload = function () {
  initializeChatbox();
};

function sendMessage() {
  var userInput = document.getElementById("userInput").value;
  appendMessage("User", userInput);
  getChatbotResponse(userInput);
}

function appendMessage(sender, message) {
  var chatBox = document.getElementById("chatBox");
  var messageDiv = document.createElement("div");
  messageDiv.textContent = sender + ": " + message;
  messageDiv.className = sender.toLowerCase() + "-message"; // Apply the appropriate class for styling
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}

async function getChatbotResponse(userInput) {
  if (!nlp) {
    appendMessage("Chatbot", "Oops! The chatbot is not ready yet.");
    return;
  }

  // Process the user input with spaCy NLP
  const doc = await nlp(userInput);
  // Extract relevant information from the spaCy doc object
  // For example, you can extract intents, entities, or context from the doc object.
  // Then, generate appropriate chatbot responses based on the extracted information.

  // For this example, we'll assume 'userIntent' represents the user's intention, like 'recommend a movie'
  const userIntent = doc.ents[0].label_;

  // Check the user's intent and call the appropriate function
  if (userIntent === "recommend_movie") {
    const movieRecommendation = await getMovieRecommendation(userInput);
    appendMessage("Chatbot", movieRecommendation);
  } else {
    appendMessage("Chatbot", "Sorry, I cannot understand your request.");
  }
}

// Function to get movie recommendations using the API
async function getMovieRecommendation(userInput) {
  // The URL endpoint of the movie suggestion API
  const apiKey = "842d4a2f338037341134f35512f14bea";
  const url = `https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  try {
    // Make the API request
    const response = await fetch(url, options);

    // Check if the API request was successful
    if (!response.ok) {
      throw new Error("Request failed");
    }

    // Parse the API response
    const data = await response.json();
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return "Oops! Something went wrong.";
  }

  // Return the movie title and rating
  return `Movie: ${data.title}, Rating: ${data.vote_average}`;
}
