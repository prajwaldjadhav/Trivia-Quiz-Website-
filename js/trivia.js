const apiUrl = 'https://opentdb.com/api.php?type=multiple';
let currentQuestionIndex = 0;
let questions = [];
let userScore = 0;
const totalQuestions = 10;
let selectedCategory = 18; // Default category (Computer Science)
document.getElementById('next-btn').style.display = 'none';

function changeCategory() {
    selectedCategory = document.getElementById('category').value;
    currentQuestionIndex = 0;
    userScore = 0;
    fetchQuestions();
}

async function fetchQuestions() {
    try {
        const response = await fetch(`${apiUrl}&amount=10&category=${selectedCategory}`);
        const data = await response.json();

        if (response.ok) {
            questions = data.results;
            displayQuestion();
        } else {
            throw new Error(`Failed to fetch questions. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

let currentQuestion;

function displayQuestion() {
    currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const nextButton = document.getElementById('next-btn');

    questionElement.innerHTML = `<h2>${decodeEntities(currentQuestion.question)}</h2>`;

    choicesElement.innerHTML = '';

    const allChoices = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    allChoices.sort(() => Math.random() - 0.5);

    allChoices.forEach(choice => {
        const choiceButton = document.createElement('button');
        choiceButton.textContent = decodeEntities(choice);
        choiceButton.addEventListener('click', () => checkAnswer(choice === currentQuestion.correct_answer, choiceButton));
        choicesElement.appendChild(choiceButton);
    });

    nextButton.style.display = 'none';

    updateScore();
}

function checkAnswer(isCorrect, button) {
    const nextButton = document.getElementById('next-btn');
    const choicesElement = document.getElementById('choices');

    if (isCorrect) {
        button.style.backgroundColor = 'green';
        userScore++;
    } else {
        button.style.backgroundColor = 'red';

        // Find and highlight the correct answer
        const correctAnswerButton = Array.from(choicesElement.children).find(btn => btn.textContent === currentQuestion.correct_answer);
        correctAnswerButton.classList.add('correct-answer');
    }

    // Disable all buttons after an answer is selected
    const allButtons = document.querySelectorAll('#choices button');
    allButtons.forEach(btn => {
        btn.disabled = true;
    });

    nextButton.style.display = 'block';
    updateScore();
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        const allButtons = document.querySelectorAll('#choices button');
        allButtons.forEach(btn => {
            btn.style.backgroundColor = '';
            btn.disabled = false;
        });
        displayQuestion();
    } else {
        const popup = document.getElementById('popup');
        const popupScore = document.getElementById('popup-score');

        popupScore.textContent = `Quiz Completed! Your final score is ${userScore}/${totalQuestions}`;
        popup.style.display = 'block';
        document.getElementById('next-btn').style.display = 'none';
    }
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${userScore}/${totalQuestions}`;
}

function playAgain() {
    currentQuestionIndex = 0;
    userScore = 0;
    document.getElementById('popup').style.display = 'none';
    fetchQuestions(); // Fetch questions again
}

function decodeEntities(encodedString) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = encodedString;
    return textarea.value;
}
