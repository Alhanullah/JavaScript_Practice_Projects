//dom elements
const startScren = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answeresContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMassage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];


// quiz state variables

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz(){
    // reset variables
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;
    startScren.classList.remove('active');
    quizScreen.classList.add("active");

    showQuestion();
}


function showQuestion(){
    // reset state
    answersDisabled=false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    const progressPercent = (currentQuestionIndex/quizQuestions.length)*100;
    progressBar.style.width = progressPercent + '%';

    questionText.textContent = currentQuestion.question;

    answeresContainer.innerHTML="";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);

        answeresContainer.appendChild(button);
    });
}

function selectAnswer(event){
    if(answersDisabled) return;
    
    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === 'true';
    Array.from(answeresContainer.children).forEach(button => {
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        } else if(button === selectedButton){
            button.classList.add("incorrect");
        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++

        if(currentQuestionIndex < quizQuestions.length){
            showQuestion()
        } else {
            showResults();
        }
    }, 1000)
}

function showResults() {
    quizScreen.classList.remove('active')
    resultScreen.classList.add('active')

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length)*100;

    if(percentage === 100) {
        resultMassage.textContent = "Perfect! You are a Genius";
    } else if (percentage >= 80){
        resultMassage.textContent = "Great Job! You know your staff";
    } else if (percentage >= 60){
        resultMassage.textContent = "Good effort! keep learning";
    } else if (percentage >= 40){
        resultMassage.textContent = "Not bad! Try again to improve";
    } else{
        resultMassage.textContent = "You are a failure";
    }
}


function restartQuiz(){
    resultScreen.classList.remove('active');

    startQuiz();
}