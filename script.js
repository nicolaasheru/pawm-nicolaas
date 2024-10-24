// Select the elements needed
const themeToggleButton = document.getElementById('theme-toggle');
const bodyElement = document.body;
const quizCard = document.getElementById('quiz-card');
const flipcardInner = quizCard.querySelector('.flipcard-inner');
const submitButton = document.getElementById('submit-answer');
const resultMessage = document.getElementById('result-message');
const nextQuestionButton = document.getElementById('next-question');
const userAnswerInput = document.getElementById('user-answer');

// Variables for managing quiz state
let correctAnswers = 0;
let currentWordIndex = 0;

const words = [
    { word: 'Apple', translation: 'Apel' },
    { word: 'Orange', translation: 'Jeruk' }
];

// Function to toggle dark mode
themeToggleButton.addEventListener('click', () => {
    if (bodyElement.getAttribute('data-theme') === 'dark') {
        bodyElement.removeAttribute('data-theme');
        themeToggleButton.textContent = '🌙 Dark Mode';
    } else {
        bodyElement.setAttribute('data-theme', 'dark');
        themeToggleButton.textContent = '☀️ Light Mode';
    }
});

// Load the current word in the quiz
function loadNextWord() {
    if (currentWordIndex < words.length) {
        document.getElementById('quiz-word').textContent = words[currentWordIndex].word;
        document.getElementById('quiz-answer').textContent = words[currentWordIndex].translation;
        resultMessage.textContent = '';
        userAnswerInput.value = '';
        flipcardInner.classList.remove('is-flipped');
        submitButton.disabled = false;
    } else {
        // Show congratulations message after all words are answered
        displayCongratulations();
    }
}

// Function to flip the card and check the answer
submitButton.addEventListener('click', () => {
    const userAnswer = userAnswerInput.value.trim().toLowerCase();
    const correctAnswer = document.getElementById('quiz-answer').textContent.toLowerCase();

    // Flip the card to show the answer
    flipcardInner.classList.add('is-flipped');

    // Check if the answer is correct
    if (userAnswer === correctAnswer) {
        resultMessage.textContent = 'Correct! 🎉';
        resultMessage.style.color = 'green';
        correctAnswers++;
    } else {
        resultMessage.textContent = 'Incorrect. Try again! 😔';
        resultMessage.style.color = 'red';
    }

    // Disable the submit button after submitting
    submitButton.disabled = true;

    // Check if two words have been answered
    if (correctAnswers >= 2) {
        displayCongratulations();
    }
});

// Function to reset for the next question
nextQuestionButton.addEventListener('click', () => {
    currentWordIndex++;
    loadNextWord();
});

// Function to display congratulations and YouTube video after two correct answers
function displayCongratulations() {
    document.querySelector('.quiz-container').innerHTML = `
        <h2>Congratulations!</h2>
        <p>You've completed the quiz! 🎉</p>
        <p>Continue improving your English with this helpful video:</p>
        <div class="video-container">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/W0CLcHqtQ_s?si=doQ6F7R8zZiA1KFC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
    `;
}

// Initialize the quiz with the first word
loadNextWord();
