// Get HTML elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Get saved answers from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Display the questions
function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    // Create question container
    const questionElement = document.createElement("div");

    // Create question text
    const questionText = document.createTextNode(
      `${i + 1}. ${question.question}`
    );

    questionElement.appendChild(questionText);
    questionElement.appendChild(document.createElement("br"));

    // Create answer options
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const choiceElement = document.createElement("input");

      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;

      // Restore previously selected answer
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // Save selected answer to sessionStorage
      choiceElement.addEventListener("change", function () {
        userAnswers[i] = this.value;

        sessionStorage.setItem(
          "progress",
          JSON.stringify(userAnswers)
        );
      });

      // Create answer text
      const choiceText = document.createTextNode(choice);

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

// Submit quiz
submitButton.addEventListener("click", function () {
  let score = 0;

  // Check each answer
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Display score
  scoreElement.textContent = `Your score is ${score} out of 5.`;

  // Save score in localStorage
  localStorage.setItem("score", score);
});

// Restore previous score from localStorage
const savedScore = localStorage.getItem("score");

if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of 5.`;
}

// Render questions when page loads
renderQuestions();