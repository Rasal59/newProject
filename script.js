document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('time')) {
    initializeTimer();
    }
    if (document.getElementById('quiz-questions')) {
    loadQuiz();
    }
    if (document.getElementById('score')) {
    displayResults();
    }
   });
   function initializeTimer() {
    const questions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
    let timeLeft = questions.length * 30;
    const timerElement = document.getElementById('time');
    timerElement.textContent = timeLeft;
    const timer = setInterval(() => {
    if (timeLeft > 0) {
    timeLeft -= 1;
    timerElement.textContent = timeLeft;
    } else {
    clearInterval(timer);
    alert('Time is up!');
    submitQuiz();
    }
    }, 1000);
   }
   function addQuestion() {
    const form = document.getElementById('quiz-form');
    const questionCount = form.querySelectorAll('.question').length + 1;
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `
    <label for="question${questionCount}">Question ${questionCount}:</label>
    <input type="text" id="question${questionCount}" name="question${questionCount}">
    <label for="option${questionCount}-1">Option 1:</label>
    <input type="text" id="option${questionCount}-1" name="option${questionCount}-1">
    <label for="option${questionCount}-2">Option 2:</label>
    <input type="text" id="option${questionCount}-2" name="option${questionCount}-2">
    <label for="option${questionCount}-3">Option 3:</label>
    <input type="text" id="option${questionCount}-3" name="option${questionCount}-3">
    <label for="option${questionCount}-4">Option 4:</label>
    <input type="text" id="option${questionCount}-4" name="option${questionCount}-4">
    <label for="answer${questionCount}">Correct Answer:</label>
    <input type="text" id="answer${questionCount}" name="answer${questionCount}">
    `;
    form.insertBefore(questionDiv, form.querySelector('button[type="button"]'));
   }
   function saveQuiz(event) {
    event.preventDefault();
    const form = document.getElementById('quiz-form');
    const questions = [];
    form.querySelectorAll('.question').forEach((questionDiv, index) => {
    const question = questionDiv.querySelector(`input[name="question${index + 1}"]`).value;
    const options = [
    questionDiv.querySelector(`input[name="option${index + 1}-1"]`).value,
    questionDiv.querySelector(`input[name="option${index + 1}-2"]`).value,
    questionDiv.querySelector(`input[name="option${index + 1}-3"]`).value,
    questionDiv.querySelector(`input[name="option${index + 1}-4"]`).value,
    ];
    const answer = questionDiv.querySelector(`input[name="answer${index + 1}"]`).value;
    questions.push({ question, options, answer });
    });
    localStorage.setItem('quizQuestions', JSON.stringify(questions));
    alert('Quiz saved successfully!');
    form.reset();
   }
   function loadQuiz() {
    const questions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
    const quizQuestionsDiv = document.getElementById('quiz-questions');
    questions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `
    <p>${q.question}</p>
    ${q.options.map((option, i) => `
    <label>
    <input type="radio" name="q${index + 1}" value="${option}"> ${option}
    </label>
    `).join('')}
    `;
    quizQuestionsDiv.appendChild(questionDiv);
    });
   }
   function submitQuiz(event) {
    if (event) {
    event.preventDefault();
    }
    const questions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
    let score = 0;
    questions.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="q${index + 1}"]:checked`);
    if (selectedOption && selectedOption.value === q.answer) {
    score += 1;
    }
    });
    localStorage.setItem('quizScore', score);
    localStorage.setItem('totalQuestions', questions.length);
    alert(`Your score is ${score} out of ${questions.length}`);
    window.location.href = 'results.html';
   }
   function displayResults() {
    const score = localStorage.getItem('quizScore');
    const totalQuestions = localStorage.getItem('totalQuestions');
    document.getElementById('score').textContent = score;
    document.getElementById('total-questions').textContent = totalQuestions;
   }   