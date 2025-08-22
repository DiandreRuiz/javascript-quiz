// Create all questions for this session from config
async function loadQuestions() {
    try {
        const response = await fetch("/questions.json");
        const data = await response.json();
        return data.questions;
    } catch (error) {
        console.error("Issue getting questions from JSON!");
        return [];
    }
}

function createOptions(questionObj) {
    const optionsContainer = document.querySelector("#options-container");
    const questionOptions = questionObj.options;

    // Clear options & create "button" div for each option available for this question'
    optionsContainer.innerHTML = "";
    questionOptions.forEach((option) => {
        const optionRow = document.createElement("div");
        const optionCol = document.createElement("div");
        optionRow.classList.add("row", "mb-2", "justify-content-center");
        optionCol.classList.add("text-center", "ps-5", "pe-5", "col-auto", "bg-warning", "border", "option-div");
        optionCol.innerText = option;
        // Add col (option) to row & add complete option to option-container
        optionRow.appendChild(optionCol);
        optionsContainer.appendChild(optionRow);
    });
}

function loadQuestionInfo(questionObj) {
    // Load BS .col where header (question) element will go
    const questionContentCol = document.querySelector("#q-content-col");

    // Clear previous question content
    questionContentCol.innerHTML = "";

    // Create header of question
    const questionText = document.createElement("h4");
    questionText.classList.add("text-center", "text-secondary");
    questionText.innerText = questionObj.question;

    // Add question header to BS .col
    questionContentCol.appendChild(questionText);
}

function loadQuestionNumber() {
    const questionIndexSpan = document.querySelector("#question-index");
    questionIndexSpan.innerText = quizState.questionIndex + 1;
}

function updateTotalQuestions() {
    const totalQuestionsSpan = document.querySelector("#num-questions");
    totalQuestionsSpan.innerText = quizState.questions.length;
}

function checkAnswer(clickedChoiceElement) {
    const allOptionDivs = document.querySelectorAll(".option-div");
    const questionObj = quizState.questions[quizState.questionIndex];
    const correctAnswerIndex = questionObj.answer;
    const userAnswerValue = clickedChoiceElement.innerText;
    const correctChoiceDiv = allOptionDivs[correctAnswerIndex];
    const correctChoiceValue = correctChoiceDiv.innerText;

    // if answer is correct, make green add point
    // otherwise make all read except correct answer
    if (userAnswerValue === correctChoiceValue) {
        clickedChoiceElement.classList.remove("bg-warning");
        clickedChoiceElement.classList.add("bg-success");
        quizState.score++;
    } else {
        clickedChoiceElement.classList.remove("bg-warning");
        clickedChoiceElement.classList.add("bg-danger");
        correctChoiceDiv.classList.remove("bg-warning");
        correctChoiceDiv.classList.add("bg-success");
    }
}

function optionsClickable(enable) {
    const optionsContainer = document.querySelector("#options-container");
    if (enable) {
        optionsContainer.style.pointerEvents = "auto";
    } else {
        optionsContainer.style.pointerEvents = "none";
    }
}

function initializeButtonListeners() {
    const nextQuestionButton = document.querySelector("#next-question-button");
    const optionsContainer = document.querySelector("#options-container");

    // next question button initially disabled
    nextQuestionButton.addEventListener("click", () => {
        advanceQuiz();
    });

    // tracking of choices
    optionsContainer.addEventListener("click", (e) => {
        console.log(e.target);
        const clickedElement = e.target;
        if (clickedElement.matches(".option-div")) {
            checkAnswer(clickedElement);
            nextQuestionButton.disabled = false;
            optionsClickable(false);
        }
    });
}

function advanceQuiz() {
    console.log(quizState.questionIndex);
    // if next question is within proper bounds, show next question
    // otherwise show score
    if (quizState.questionIndex + 1 < quizState.questions.length) {
        quizState.questionIndex++;
        optionsClickable(true);
        displayQuestion();
    } else {
        console.log("HERE");
        displayScore();
    }
}

function displayScore() {
    window.location.replace("/score.html");

    const scoreDisplay = document.querySelector("#user-score");
    const possiblePoints = document.querySelector("#possible-points");
}

async function displayQuestion() {
    const questionIndex = quizState.questionIndex;
    const questionObj = quizState.questions[questionIndex];
    const nextQuestionButton = document.querySelector("#next-question-button");

    nextQuestionButton.disabled = true;
    if (questionIndex === quizState.questions.length - 1) {
        nextQuestionButton.innerText = "Check Score";
    }

    loadQuestionNumber();
    loadQuestionInfo(questionObj);
    createOptions(questionObj);
}

// State for quiz (Not scalable but good enough for demo)
const quizState = { questionIndex: 0, score: 0, questions: [] };

async function main() {
    quizState.questions = await loadQuestions();
    initializeButtonListeners();
    updateTotalQuestions();
    displayQuestion();
}

main();
