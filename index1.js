const quizData = [
    {
        question: 'I have complete control over electricity. Guess Who I Am??',
        a: 'Entei',
        b: 'Zapdos',
        c: 'Moltress',
        d: 'Dialga',
        correct: 'b',
        source: 'pic/d1.png'
    },
    {
        question: 'I eat over 880 pounds of food every day and when I am done with eating, I promptly go to sleep. Guess Who I Am??',
        a: 'Charizard',
        b: 'Piplup',
        c: 'Snorlax',
        d: 'Pikachu',
        correct: 'c',
        source: 'pic/d3.png'
    },
    {
        question: 'I have a plant seed on my back right from the day I am born. Guess Who I Am??',
        a: 'Haunter',
        b: 'Mankey',
        c: 'Charizard',
        d: 'Bulbasaur',
        correct: 'd',
        source: 'pic/p4.png'
    },
    {
        question: 'I am a kindhearted Pokemon, If I spot a drowning person or Pokemon, I simply must help them. Guess Who I Am??',
        a: 'Dragonite',
        b: 'Lapras',
        c: 'Nocktowl',
        d: 'Pikachu',
        correct: 'a',
        source: 'pic/d4.png'
    },
    {
        question: 'The fin on my head acts as highly sensitive radar. Using this fin I sense movements of water and air. Guess Who I Am??',
        a: 'Bulbasaur',
        b: 'Mudkip',
        c: 'Hitmonlee',
        d: 'Kakuna',
        correct: 'b',
        source: 'pic/d5.png'
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
    var time = 15;
    timer.innerText = time;
    myinterval = setInterval(function () {
        timer.innerText-=1;
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
            var audio = new Audio('audio/cor.wav');
            audio.play();
            var v = document.getElementById(`${quizData[current].correct}_text`);
            setTimeout(function () {
                v.style.cssText = 'background-color: none;';
            }, 1000);
            v.style.cssText = 'background-color: rgb(112, 157, 44); border-radius: 0.1rem; padding: 0.5rem';
            clearInterval(myinterval);
        }
        else {
            var audio = new Audio('audio/wro.wav');
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
            setTimeout(function(){
                loadquiz();
            },1000);

        } else {
            if (score <= 2) {
                page.innerHTML = `<h2>You answered ${score}/${quizData.length} correctly. Good Try! :|</h2>
                                <button onclick="location.reload()" id="sub">Play Again</button>
                                <button class="btn"><a href="index.html">Round 1</a></button>
                                <button class="btn"><a href="quiz2.html">Round 3</a></button>`;
            }
            else {
                page.innerHTML = `<h2>You answered ${score}/${quizData.length} correctly. Excellent :)</h2>
                                <button onclick="location.reload()" id="sub">Play Again</button>
                                <button class="btn"><a href="index.html">Round 1</a></button>
                                <button class="btn"><a href="quiz2.html">Round 3</a></button>`;
            }
        }
    }
});