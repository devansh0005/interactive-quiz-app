const quizData = [
    {
        question: "Which programming language is primarily used for adding interactivity to web pages?",
        options: [
            "Python",
            "HTML",
            "CSS",
            "JavaScript"
        ],
        answer: "JavaScript"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which HTML element is used to link an external JavaScript file?",
        options: [
            "<script>",
            "<js>",
            "<javascript>",
            "<link>"
        ],
        answer: "<script>"
    },
    {
        question: "Which of the following is NOT a valid CSS display property value?",
        options: [
            "flex",
            "grid",
            "block",
            "float"
        ],
        answer: "float"
    },
    {
        question: "What is the correct syntax for checking if two variables are equal in value and type in JavaScript?",
        options: [
            "x = y",
            "x == y",
            "x === y",
            "x equals y"
        ],
        answer: "x === y"
    }
];

let currentQuestionIndex = 0;
let runningScore = 0;

document.addEventListener("DOMContentLoaded", () => {
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");

    function renderFirstQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        
        if (!currentQuestion) {
            const quizCard = document.getElementById("quiz-card");
            const scorePercentage = Math.round((runningScore / quizData.length) * 100);
            const isPassing = scorePercentage >= 80;
            const feedbackMessage = isPassing ? "Great job! 🌟" : "Try again! 📚";
            
            quizCard.innerHTML = `
                <div class="results-view" id="results-view">
                    <h2 class="results-title">Quiz Completed!</h2>
                    <div class="score-container">
                        <span class="score-percentage">${scorePercentage}%</span>
                        <p class="score-fraction">You scored ${runningScore} out of ${quizData.length}</p>
                    </div>
                    <p class="results-feedback">${feedbackMessage}</p>
                </div>
            `;
            return;
        }
        
        // Render question text
        questionText.textContent = currentQuestion.question;
        
        // Clear options container
        optionsContainer.innerHTML = "";
        
        // Render option buttons
        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.classList.add("option-btn");
            button.textContent = option;
            optionsContainer.appendChild(button);
        });
    }

    function nextQuestion() {
        currentQuestionIndex += 1;
        renderFirstQuestion();
    }

    function checkAnswer(selectedText) {
        const currentQuestion = quizData[currentQuestionIndex];
        if (currentQuestion && selectedText === currentQuestion.answer) {
            runningScore += 1;
        }
    }

    renderFirstQuestion();

    optionsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("option-btn")) {
            const selectedText = event.target.textContent;
            console.log(selectedText);
            checkAnswer(selectedText);
            
            // Instantly apply visual feedback classes
            const currentQuestion = quizData[currentQuestionIndex];
            const buttons = optionsContainer.querySelectorAll(".option-btn");
            buttons.forEach(button => {
                if (button.textContent === currentQuestion.answer) {
                    button.classList.add("correct");
                } else if (button === event.target && selectedText !== currentQuestion.answer) {
                    button.classList.add("incorrect");
                }
                // Temporarily disable options
                button.disabled = true;
            });

            // Delay next question by 1.5 seconds
            setTimeout(() => {
                nextQuestion();
            }, 1500);
        }
    });
});

