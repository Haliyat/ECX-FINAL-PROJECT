// 1. Data Structure: Array of Objects
 const quizData = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text System"],
        correct: 0
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        correct: 2
    },
    {
        question: "Which HTML element is used for the largest heading?",
        options: ["<heading>", "<h6>", "<h1>", "<head>"],
        correct: 2
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<scripting>", "<script>", "<javascript>"],
        correct: 2
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function = myFunction()", "function:myFunction()", "function myFunction()"],
        correct: 2
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: ["msg('Hello World')", "alertBox('Hello World')", "alert('Hello World')"],
        correct: 2
    },
    {
        question: "Which property is used to change the font of an element?",
        options: ["font-family", "font-style", "font-weight"],
        correct: 0
    },
    {
        question: "How do you add a background color in CSS?",
        options: ["color: yellow", "background-color: yellow", "bg-color: yellow"],
        correct: 1
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        options: ["*", "x", "=", "-"],
        correct: 2
    },
    {
        question: "Is JavaScript the same as Java?",
        options: ["Yes", "No", "Sometimes"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('answer-options');
const progressText = document.getElementById('progress');

// Start Quiz
startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
});

// Load Question Dynamically
function loadQuestion() {
    const currentData = quizData[currentQuestionIndex];
    
    // Update progress text
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    
    // Set question text
    questionText.innerText = currentData.question;
    
    // Clear old options
    optionsContainer.innerHTML = '';
    
    // Create answer buttons (DOM Manipulation)
    currentData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        // Use addEventListener (not inline onclick)
        button.addEventListener('click', () => handleSelect(index, button));
        optionsContainer.appendChild(button);
    });
}

// Handle Answer Selection
function handleSelect(selectedIndex, clickedButton) {
    const correctIndex = quizData[currentQuestionIndex].correct;
    const buttons = optionsContainer.querySelectorAll('button');

    // Immediate Feedback logic
    if (selectedIndex === correctIndex) {
        clickedButton.classList.add('correct');
        score++;
    } else {
        clickedButton.classList.add('wrong');
        buttons[correctIndex].classList.add('correct'); // Show the right answer
    }

    // Disable buttons after choice
    buttons.forEach(btn => btn.disabled = true);

    // Transition to next question after 1.5 seconds
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

// Show Final Score
function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    document.getElementById('score-text').innerText = `You scored ${score} out of ${quizData.length}!`;
}

// Restart Logic (No Page Reload)
restartBtn.addEventListener('click', () => {
    score = 0;
    currentQuestionIndex = 0;
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
});