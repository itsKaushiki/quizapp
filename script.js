
  const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


const quiz = [
    {
        question: "Q. What does 'DFS' stand for in the context of graph traversal?",
        choices: ["Depth-First Search", "Directed File System", "Data Flow System", "Dynamic File Structure"],
        answer: "Depth-First Search"
    },
    {
        question: "Q. Which data structure follows the Last In, First Out (LIFO) principle?",
        choices: ["Queue", "Stack", "Linked List", "Heap"],
        answer: "Stack"
    },
    {
        question: "Q. What is the time complexity of quicksort algorithm in the average case?",
        choices: ["O(n log n)", "O(n^2)", "O(log n)", "O(n)"],
        answer: "O(n log n)"
    },
    {
        question: "Q. In the context of trees, what is the 'height' of a tree?",
        choices: ["The number of nodes", "The length of the longest path from the root to a leaf", "The number of edges", "The depth of the root node"],
        answer: "The length of the longest path from the root to a leaf"
    },
    {
        question: "Q. What is the purpose of Dijkstra's algorithm?",
        choices: ["Sorting elements", "Finding the shortest path in a graph", "Searching in a linked list", "Hashing elements"],
        answer: "Finding the shortest path in a graph"
    },
    {
        question: "Q. Which searching algorithm works on the principle of divide and conquer?",
        choices: ["Linear Search", "Binary Search", "Jump Search", "Interpolation Search"],
        answer: "Binary Search"
    },
    {
        question: "Q. What is the main advantage of using a hash table?",
        choices: ["Constant time complexity for all operations", "Efficient sorting", "Automatic memory management", "Dynamic resizing"],
        answer: "Constant time complexity for all operations"
    },
    {
        question: "Q. What is the purpose of an AVL tree in computer science?",
        choices: ["File compression", "Binary search", "Sorting", "Self-balancing binary search tree"],
        answer: "Self-balancing binary search tree"
    },
    {
        question: "Q. What is the Big-O notation for the worst-case time complexity of bubble sort?",
        choices: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
        answer: "O(n^2)"
    },
    {
        question: "Q. In the context of hash functions, what is a collision?",
        choices: ["When two different keys hash to the same index", "When a key is not found in the hash table", "When the hash function is not injective", "When the hash table is full"],
        answer: "When two different keys hash to the same index"
    }
];




let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;


const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}


const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {

        displayAlert("Correct Answer!");
        score++;
    }
    else {

        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}


const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

const startTimer = () => {
    clearInterval(timerID);
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

const stopTimer = () =>{
    clearInterval(timerID);
}


const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}


const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});
