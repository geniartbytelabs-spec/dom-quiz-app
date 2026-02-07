// ===== Quiz Data (5 questions, lesson-style wording) =====
const quizData = [
{
    question:"Which method selects an HTML element by its ID so JavaScript can work with it?",
    options: ["document.createElement()", "document.getElementById()", "element.appendChild()", "element.innerText"],
    answer: 1
},

{ 
    question:"Which JavaScript method creates a brand new HTML element that did not exist before?",
    options: ["getElementById()", "querySelectorAll()", "createElement()", "addEventListener()"],
    answer: 2
},

{
    question: "After creating an element, which method attaches it to the container so it shows on the page?",
    options: ["appendChild()", "innerHTML()", "Math.random()", "textContent()"],
    answer: 0
},

{
    question:"What does addEventListener('click', ...) do?",
    options: [
      "It styles the button using CSS",
      "It listens for a click and runs a function when the click happens",
      "It creates a new button element",
      "It deletes the container"
    ],
    answer: 1
},

{
    question: "In a for loop, what happens if the condition is false at the start?",
    options: [
      "The loop runs once",
      "The loop does not run at all",
      "The loop runs forever",
      "The browser crashes"
    ],
    answer: 1
}
];

// ===== DOM Elements =====
const startContainer = document.getElementById("start-container");
const startButton = document.getElementById("start-button");

const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");

const submitButton = document.getElementById("submit-button");
const nextButton = document.getElementById("next-button");

const scoreText = document.getElementById("score");
const restartButton = document.getElementById("restart-button");
const progress = document.getElementById("progress");

// ===== State =====
let currentQuestionIndex = 0;
let score = 0;
let selectedIndex = null;
let hasSubmitted = false;

// ===== Helpers =====
function clearOptions() {
    optionsContainer.innerHTML = "";
}

function setProgress() {
    progress.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}` ;
}

function disableAllOptionButtons() {
    const buttons = optionsContainer.querySelectorAll("button");
    buttons.forEach(btn => (btn.disabled = true));
}

function clearSelectedStyle() {
    const buttons = optionsContainer.querySelectorAll("button");
    buttons.forEach(btn => btn.classList.remove("selected"));
}

// ===== Core =====
function loadQuestion() {
    hasSubmitted = false;
    selectedIndex = null;

    submitButton.disabled = true;
    nextButton.disabled = true;

    setProgress();
    clearOptions();

    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question

      currentQuestion.options.forEach((optionText,i) => {
        const optionButton = document.createElement ("button");
        optionButton.textContent = currentQuestion.options;

        optionButton.addEventListener("click", () => {if (hasSubmitted) return;
        
        selectedIndex = i;
        submitButton.disabled = false;
        
        clearSelectedStyle();
        optionButton.classList.add("selected");
    });

    optionsContainer.appendChild(optionButton);
})};


function submitAnswer() {
    if (selectedIndex === null || hasSubmitted) return;
    hasSubmitted = true;


const currentQuestion = quizData[currentQuestionIndex];
const correctIndex = currentQuestion.answer;

disableAllOptionButtons();

const optionButtons = optionsContainer.querySelectorAll("button");
optionButtons[correctIndex].classList.add("correct");

if (selectedIndex === correctIndex) {
    score++;
} else {
    optionButtons [selectedIndex].classList.add("incorrect");
}

submitButton.disabled = true;
nextButton.disabled = false;

}

function nextQuestion() {
    if (!hasSubmitted) return;

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();}
        else{showScore();}
    }

    function showScore() {
        quizContainer.classList.add("hidden");
        scoreContainer.classList.remove("hidden");
        scoreText.textContent = `You scored ${score} out of ${quizData.length}.`;
    }

function startQuiz() {
    startContainer.classList.add("hidden");
    scoreContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");

    currentQuestionIndex = 0;
    score = 0;

    loadQuestion();
}    

function restartQuiz() {
    quizContainer.classList.add("hidden");
    scoreContainer.classList.add("hidden");
    startContainer.classList.remove("hidden");
}

// ===== Events =====
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", submitAnswer);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);
    
// ===== Initial Screen =====
quizContainer.classList.add("hidden");
scoreContainer.classList.add("hidden");
startContainer.classList.remove("hidden");

