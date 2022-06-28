const quizData = [
    {
        question: 'The Pokémon anime series has focused on the adventures of Ash since it made its debut in 1997. But what is Ash surname?',
        a: 'Ketchum',
        b: 'Kitchum',
        c: 'Ketchup',
        d: 'Kichum',
        correct: 'a',
        source:'pic/p1.png'
    },
    {
        question: 'The first legendary Pokémon, introduced in the Kanto region are Articuno, Zapdos, and …',
        a: 'Entei',
        b: 'Lugia',
        c: 'Moltress',
        d: 'Palkia',
        correct: 'c',
        source:'pic/p2.png'
    },
    {
        question: 'In the episode One Journey Ends, Another Begins..., Littens Pokémon friend passed away. What was its name?',
        a: 'Lillipup',
        b: 'Entei',
        c: 'Stoutland',
        d: 'Herdier',
        correct: 'c',
        source:'pic/p3.png'
    },
    {
        question: "The recent series of YouTube shorts, Pokémon: Twilight Wings, was set in which region?",
        a: "Sinnoh",
        b: "Kanto",
        c: "Unova",
        d: "Galar",
        correct: "d",
        source:'pic/p4.png'
    },
    {
        question: "The starter Pokémon for each of the main games in the series are always a choice between which three types?",
        a: "Grass, Fire and Water",
        b: "Water, Fire and Ice",
        c: "Grass, Dragon and Water",
        d: "Grass, Rock and Flying",
        correct: "a",
        source:'pic/p6.png'
    }
]
const quest = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitbtn = document.getElementById('sub');
const scoreCount = document.getElementById('score');
const page=document.getElementById('quizhost');
const image=document.getElementById('image');
const timer = document.getElementById('timer');

let current = 0;
function countdown() {
    var time = 20;
    timer.innerText = time;
    myinterval = setInterval(function () {
        timer.innerText-=1;
        time--;
        if(time==1)
        {
            var audio = new Audio('audio/times_up.mp3');
            audio.play();
        }
        if (time == 0 && current<quizData.length) {
            clearInterval(myinterval);
            alert('Time Out');
            current++;
            loadquiz();
        }
        else{

        }
    }, 1000);
}

function deselect(){
    const answers = document.querySelectorAll('.ans');
    answers.forEach((answer) => {
        answer.checked=false;
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
    image.src=currentQuiz.source;
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

submitbtn.addEventListener('click', function() {
        let answer = selected();
        if(answer==undefined)
        {
            alert("Please Select One Option :)");
        }
        if(answer){
            if (answer === quizData[current].correct) {
                score++;
                var audio = new Audio('audio/cor.wav');
                audio.play();
                var v=document.getElementById(`${quizData[current].correct}_text`);
                setTimeout(function(){
                    v.style.cssText='background-color: none;';
                },1000);
                v.style.cssText='background-color: rgb(112, 157, 44); border-radius: 0.1rem; padding: 0.5rem';
                clearInterval(myinterval);
            }
            else{
                var audio = new Audio('audio/wro.wav');
                audio.play();
                var v=document.getElementById(`${quizData[current].correct}_text`);
                setTimeout(function(){
                    v.style.cssText='background-color: none;';
                },1000);
                v.style.cssText='background-color: rgb(112, 157, 44); border-radius: 0.1rem; padding: 0.5rem';
                clearInterval(myinterval);           
             }


            current++;
            if(current<quizData.length)
            {
                setTimeout(function(){
                    loadquiz();
                },1000);
                
        }else{
            if(score<=2)
            {
                page.innerHTML=`<h2>You answered ${score}/${quizData.length} correctly. Good Try! :|</h2>
                                <button onclick="location.reload()" id="sub">Play Again</button>
                                <button class="btn"><a href="quiz1.html">Round 2</a></button>
                                <button class="btn"><a href="quiz2.html">Round 3</a></button>`;   
            }
            else{
                page.innerHTML=`<h2>You answered ${score}/${quizData.length} correctly. Excellent :)</h2>
                                <button onclick="location.reload()" id="sub">Play Again</button>
                                <button class="btn"><a href="quiz1.html">Round 2</a></button>
                                <button class="btn"><a href="quiz2.html">Round 3</a></button>`;   
            }
                      
        }
    }
});