const questions = [
    {
        question: "Do you prefer spending time alone?",
        trait: "introverted",
        answers: ["Yes", "No"]
    },
    {
        question: "Do you adapt well to change?",
        trait: "flexible",
        answers: ["Yes", "No"]
    },
    {
        question: "Do you prefer structure and routine?",
        trait: "stubborn",
        answers: ["Yes", "No"]
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let scores = { introverted: 0, extroverted: 0, flexible: 0, stubborn: 0 };

function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";

    const questionObj = questions[currentQuestionIndex];
    const questionText = document.createElement("p");
    questionText.innerText = questionObj.question;
    questionContainer.appendChild(questionText);

    questionObj.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.onclick = () => selectAnswer(answer, questionObj.trait);
        questionContainer.appendChild(button);
    });
}

function selectAnswer(answer, trait) {
    if (answer === "Yes") {
        scores[trait]++;
    } else {
        scores[trait === "introverted" ? "extroverted" : trait === "flexible" ? "stubborn" : trait]++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("next-button").style.display = "none";
        document.getElementById("submit-button").style.display = "block";
    }
}

function submitQuiz() {
    const resultString = JSON.stringify(scores);
    window.location.href = `results.html?scores=${encodeURIComponent(resultString)}`;
}

window.onload = loadQuestion;
