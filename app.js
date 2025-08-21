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
        optionCol.classList.add("col-6", "text-center", "bg-warning", "border");
        optionCol.innerText = option;
        // Add col (option) to row
        optionRow.appendChild(optionCol);
        // Add complete option to option-container
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

async function loadQuestionIndex(questionIndex) {
    const questionIndexSpan = document.querySelector("#question-index");
    questionIndexSpan.innerText = questionIndex;
}

async function updateTotalQuestions(questions) {
    const totalQuestionsSpan = document.querySelector("#num-questions");
    totalQuestionsSpan.innerText = questions.length;
}

async function main() {
    const QUESTIONS = await loadQuestions();
    await createOptions(QUESTIONS[0]);
}

main();
