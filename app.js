// Create question object:
// {
//      question: string (question being asked),
//      options: array (all possible options),
//      answer: int (index of correct answer)
// }

// TODO:
// 1. Create elements based on the "col" bootstrap elements for each option
// 2. Add these elements to the options container upon creation
//

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

    // Create header of question
    const questionText = document.createElement("h4");
    questionText.classList.add("text-center", "text-secondary");
    questionText.innerText = questionObj.question;

    // Add question header to BS .col
    questionContentCol.appendChild(questionText);
}

async function loadQuestionNumber(questionIndex) {
    const questionIndexSpan = document.querySelector("#question-index");
    questionIndexSpan.innerText = questionIndex;
}

async function updateTotalQuestions(questions) {
    const totalQuestionsSpan = document.querySelector("#num-questions");
    totalQuestionsSpan.innerText = questions.length;
}

//
async function displayQuestion(questionIndex, questionObj) {
    await loadQuestionNumber(questionIndex + 1);
    await loadQuestionInfo(questionObj);
    await createOptions(questionObj);
}

async function main() {
    const QUESTIONS = await loadQuestions();
    const submitAnswerButton = document.querySelector("#submit-answer-button");
    const optionsContainer = document.querySelector("#options-container");
    const currentQuestionIndex = 0;

    // Show current question & Track selection
    await displayQuestion(currentQuestionIndex, QUESTIONS[currentQuestionIndex]);
    optionsContainer.addEventListener("click", (e) => {
        const clicked = e.target;
        if (clicked.matches(".option-div")) {
        }
    });

    await updateTotalQuestions(QUESTIONS);
}

main();
