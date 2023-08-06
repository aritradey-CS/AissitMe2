// script.js
let nlp;

function loadSpacyNlp() {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/spacy-nlp@1.0.0/builds/en_core_web_sm.js";
  script.onload = initSpacyNlp; // Fix the event handler assignment
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
  const userIntent = "recommend a movie";

  // Check the user's intent and call the appropriate function
  if (userIntent === "recommend a movie") {
    const movieRecommendation = await getMovieRecommendation(userInput);
    appendMessage("Chatbot", movieRecommendation);
  } else {
    appendMessage("Chatbot", "Sorry, I cannot understand your request.");
  }
}

// Function to get movie recommendations using the API
async function getMovieRecommendation(userInput) {
  // The URL endpoint of the movie suggestion API
  const url = `https://moviesdatabase.p.rapidapi.com/titles/series/${encodeURIComponent(
    userInput
  )}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8b0c0c9052msh8fc8a444731d587p115813jsnae8bd4eea2d3",
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
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

    // Extract relevant movie information from the API response
    // For example, if the API returns a list of movie recommendations, you can extract the movie titles.
    // Note: The exact data structure will depend on the API you are using. Please refer to the API documentation for details.

    // For now, we'll assume the API response contains a list of movie titles in the 'results' array.
    const results = data.results;
    if (results.length > 0) {
      const movieTitles = results.map((movie) => movie.title);
      return `I recommend these movies: ${movieTitles.join(", ")}`;
    } else {
      return "Sorry, I couldn't find any recommendations.";
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return "Oops! Something went wrong.";
  }
}

loadSpacyNlp();
