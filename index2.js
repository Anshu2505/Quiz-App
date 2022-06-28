const quizData = [
    {
        question: 'Can You Guess My Type??',
        a: 'Normal, Fairy',
        b: 'Steel, Fairy',
        c: 'Normal, Poison',
        d: 'Flying, Fairy',
        correct: 'a',
        source: 'pic/e1.png'
    },
    {
        question: 'Can You Guess My Type And My Weakness??',
        a: 'Normal, Rock',
        b: 'Normal, Steel',
        c: 'Normal, Fighting',
        d: 'Flying, Fighting',
        correct: 'c',
        source: 'pic/e2.png'
    },
    {
        question: 'Can You Guess My Weakness??',
        a: 'Normal, Electric, Water',
        b: 'Water, Electric',
        c: 'Water, Electric, Rock',
        d: 'Water, Rock',
        correct: 'c',
        source: 'pic/e3.png'
    },
    {
        question: 'Can You Guess My Type??',
        a: 'Poison, Fairy',
        b: 'Ground, Fighting',
        c: 'Psychic, Poison',
        d: 'Poison, Ground',
        correct: 'd',
        source: 'pic/e4.png'
    },
    {
        question: 'Can You Guess My Weakness??',
        a: 'Grass, Electric',
        b: 'Ground, Electric',
        c: 'Psychic, Grass',
        d: 'Grass, Ground',
        correct: 'a',
        source: 'pic/e5.png'
    }
]
const quest = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitbtn = document.getElementById('sub');
const scoreCount = document.getElementById('score');
const page = document.getElementById('quizhost');
const image = document.getElementById('image');
const timer = document.getElementById('timer');
let current = 0;

function countdown() {
    var time = 10;
    timer.innerText = time;
    myinterval = setInterval(function () {
        timer.innerText -= 1;
        time--;
        if(time==1)
        {
            var audio = new Audio('audio/times_up.mp3');
            audio.play();
        }
        if (time == -1) {
            clearInterval(myinterval);
            alert('Time Out');
            current++;
            loadquiz();
        }
    }, 1000);
}

function deselect() {
    const answers = document.querySelectorAll('.ans');
    answers.forEach((answer) => {
        answer.checked = false;
    });
}

function loadquiz() {
    countdown();
    deselect();
    const currentQuiz = quizData[current];
    quest.innerText = currentQuiz.question;
    a_text.innerText = currentQuiz.a;
    b_text.innerText = currentQuiz.b;
    c_text.innerText = currentQuiz.c;
    d_text.innerText = currentQuiz.d;
    image.src = currentQuiz.source;
}
loadquiz();
function selected() {
    const answers = document.querySelectorAll('.ans');
    let answerCheck = undefined;
    answers.forEach((answer) => {
        if (answer.checked) {
            answerCheck = answer.id;
        }
    });
    return answerCheck;
}

let score = 0;

submitbtn.addEventListener('click', function () {
    let answer = selected();
    if (answer == undefined) {
        alert("Please Select One Option :)");
    }
    if (answer) {
        if (answer === quizData[current].correct) {
            score++;
            let audio = new Audio('audio/cor.wav');
            audio.play();
            var v = document.getElementById(`${quizData[current].correct}_text`);
            setTimeout(function () {
                v.style.cssText = 'background-color: none;';
            }, 1000);
            v.style.cssText = 'background-color: rgb(112, 157, 44); border-radius: 0.1rem; padding: 0.5rem';
            clearInterval(myinterval);
        }
        else {
            let audio = new Audio('audio/wro.wav');
            audio.play();
            var v = document.getElementById(`${quizData[current].correct}_text`);
            setTimeout(function () {
                v.style.cssText = 'background-color: none;';
            }, 1000);
            v.style.cssText = 'background-color: rgb(112, 157, 44); border-radius: 0.1rem; padding: 0.5rem';
            clearInterval(myinterval);
        }

        current++;
        if (current < quizData.length) {
            setTimeout(function () {
                loadquiz();
            }, 1000);

        } else {
            if (score <= 2) {
                page.innerHTML = `<h2>You answered ${score}/${quizData.length} correctly. Good Try! :|</h2>
                                <button onclick="location.reload()" id="sub">Play Again</button>
                                <button class="btn"><a href="index.html">Round 1</a></button>
                                <button class="btn"><a href="quiz1.html">Round 2</a></button>`;
            }
            else {
                page.innerHTML = `<h2>You answered ${score}/${quizData.length} correctly. Excellent :)</h2>
                                <button onclick="location.reload()" id="sub">Play Again</button>
                                <button class="btn"><a href="index.html">Round 1</a></button>
                                <button class="btn"><a href="quiz1.html">Round 2</a></button>`;
            }
        }
    }
});