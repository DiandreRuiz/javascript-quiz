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

async function createOptions(questionObj) {
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

async function loadQuestionInfo(questionObj) {
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

async function loadQuestionNumber() {
    const questionIndexSpan = document.querySelector("#question-index");
    questionIndexSpan.innerText = quizState.questionIndex + 1;
}

async function updateTotalQuestions() {
    const totalQuestionsSpan = document.querySelector("#num-questions");
    totalQuestionsSpan.innerText = quizState.questions.length;
}

function checkAnswerUpdateOptions(clickedChoiceElement, questionObj) {

    // TODO: Figure out why starting @ question 2, you can re-select
    // TODO: correct answer and it will be red
    
    const allOptionDivs = document.querySelectorAll(".option-div");
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

function advanceQuiz() {
    if (quizState.questionIndex < quizState.questions.length) {
        quizState.questionIndex++;
        displayQuestionGetAnswer();
    } else {
        displayScore();
    }
}

function displayScore() {}

function initializeButtonListeners() {
    // Check if final question so we can update text on "Next" button
    const nextQuestionButton = document.querySelector("#next-question-button");
    nextQuestionButton.addEventListener("click", () => {
        advanceQuiz();
    });
}

async function displayQuestionGetAnswer() {
    const questionIndex = quizState.questionIndex;
    const questionObj = quizState.questions[questionIndex];
    const optionsContainer = document.querySelector("#options-container");
    const nextQuestionButton = document.querySelector("#next-question-button");

    if (questionIndex === quizState.questions.length - 1) {
        nextQuestionButton.innerText = "Check Score";
    }

    await loadQuestionNumber();
    await loadQuestionInfo(questionObj);
    await createOptions(questionObj);

    // wait for an answer before you can move on
    nextQuestionButton.disabled = true;
    optionsContainer.addEventListener("click", (e) => {
        const clickedElement = e.target;
        if (clickedElement.matches(".option-div")) {
            checkAnswerUpdateOptions(clickedElement, questionObj);
            nextQuestionButton.disabled = false;
        }
    });
}

// State for quiz (Not scalable but good enough for demo)
const quizState = { questionIndex: 0, score: 0, questions: [] };

async function main() {
    quizState.questions = await loadQuestions();
    initializeButtonListeners();
    await updateTotalQuestions();
    await displayQuestionGetAnswer();
}

main();
