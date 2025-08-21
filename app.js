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

function choiceCorrect(choiceValue, questionObj) {
    console.log(choiceValue);
    console.log(questionObj.options.indexOf(choiceValue));
    console.log(questionObj);
    console.log(questionObj.answer);

    if (questionObj.options.indexOf(choiceValue) === questionObj.answer) {
        return true;
    } else {
        return false;
    }
}

function updateOptionDivCorrect(element) {
    console.log("correct");
    element.classList.remove("bg-warning");
    element.classList.add("bg-success");
}

function updateOptionDivWrong(element) {
    console.log("incorrect");
    element.classList.remove("bg-warning");
    element.classList.add("bg-danger");
}

async function displayQuestionGetAnswer(questionIndex, questionObj) {
    await loadQuestionNumber(questionIndex + 1);
    await loadQuestionInfo(questionObj);
    await createOptions(questionObj);

    const optionsContainer = document.querySelector("#options-container");
    optionsContainer.addEventListener("click", (e) => {
        const clickedElement = e.target;
        if (clickedElement.matches(".option-div")) {
            // check if correct
            // if incorrect, make red & make correct option green & return correct FALSE
            // if correct, make green & return correct TRUE
            choiceCorrect(clickedElement.innerText, questionObj) ? updateOptionDivCorrect(clickedElement) : updateOptionDivWrong(clickedElement);
        }
    });
}

async function main() {
    const QUESTIONS = await loadQuestions();
    const currentQuestionIndex = 0;
    const score = 0;

    const submitAnswerButton = document.querySelector("#next-question-button");

    // Show current question & Track selection
    await displayQuestionGetAnswer(currentQuestionIndex, QUESTIONS[currentQuestionIndex]);
    await updateTotalQuestions(QUESTIONS);
}

main();
