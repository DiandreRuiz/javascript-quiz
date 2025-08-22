Quiz App

This is a lightweight JavaScript quiz application that loads questions from a configuration file (questions.json) and displays them in the browser. Users can select answers, progress through questions, and see their score at the end.

How It Works
	1.	Questions are defined in questions.json
	•	Each question contains the text, multiple-choice options, and the index of the correct answer.
	2.	Quiz flow
	•	Questions are displayed one at a time.
	•	Options are styled as buttons.
	•	Clicking an option locks in the answer, highlights correct/incorrect responses, and enables the “Next” button.
	•	At the end of the quiz, the total score is shown, with the option to retry.
	3.	State Management
	•	A simple quizState object keeps track of:
	•	questionIndex → current question number
	•	score → user’s score so far
	•	questions → list of loaded questions

    Features
	•	Loads quiz questions dynamically from JSON.
	•	Uses event delegation for option clicks.
	•	Highlights correct (green) and incorrect (red) answers.
	•	Prevents multiple selections per question.
	•	Shows running question number and total.
	•	Displays final score at the end with a “Retry” option.