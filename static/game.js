const levels = [

{
    level:1,
    strength:"Weak",
    length:8,
    start:"A",
    end:"3",
    contains:"Uppercase, Lowercase, Number",
    options:[
        "Apple123",
        "Admin111",
        "Animal45",
        "Attack22"
    ],
    answer:"Apple123",
    hint:"🍎 Think of a fruit."
},

{
    level:2,
    strength:"Medium",
    length:9,
    start:"S",
    end:"4",
    contains:"Uppercase, Lowercase, Number, Special Character",
    options:[
        "School@4",
        "Summer@4",
        "Secure@24",
        "Student@4"
    ],
    answer:"Secure@24",
    hint:"🔐 It begins with 'Secure'."
},

{
    level:3,
    strength:"Strong",
    length:12,
    start:"Q",
    end:"6",
    contains:"Uppercase, Lowercase, Number, Special Character",
    options:[
        "Quantum#26",
        "Quantum#2026",
        "Quantum2026",
        "Quantum@123"
    ],
    answer:"Quantum#2026",
    hint:"⚛ Related to Quantum Security."
},

{
    level:4,
    strength:"Strong",
    length:11,
    start:"C",
    end:"!",
    contains:"Uppercase, Lowercase, Number, Special Character",
    options:[
        "Cyber@2025",
        "Cyber#2025!",
        "Cyber123!",
        "CyberSafe!"
    ],
    answer:"Cyber#2025!",
    hint:"💻 Think Cyber Security."
},

{
    level:5,
    strength:"Strong",
    length:12,
    start:"H",
    end:"9",
    contains:"Uppercase, Lowercase, Number, Special Character",
    options:[
        "Hacker#789",
        "Hacker@999",
        "Hunter#789",
        "Hero@789"
    ],
    answer:"Hacker#789",
    hint:"👨‍💻 Starts with Hacker."
}

];

let currentLevel = 0;
let score = 0;
let timeLeft = 30;
let timer;

function loadLevel(){

    clearInterval(timer);

    if(currentLevel >= levels.length){

        document.querySelector(".container").innerHTML = `
        <div class="card">
            <h1>🎉 Congratulations!</h1>
            <h2>Your Final Score : ${score}</h2>
            <br>
            <a href="/game" class="game-btn">Play Again</a>
            <a href="/" class="game-btn">Dashboard</a>
        </div>
        `;

        return;
    }

    let level = levels[currentLevel];

    document.getElementById("level").innerText="Level "+level.level;
    document.getElementById("strength").innerText=level.strength;
    document.getElementById("length").innerText=level.length;
    document.getElementById("start").innerText=level.start;
    document.getElementById("end").innerText=level.end;
    document.getElementById("contains").innerText=level.contains;

    document.getElementById("hint").innerText="Need help? Try once first.";

    document.getElementById("result").innerText="";

    createOptions(level);

    timeLeft=30;

    document.getElementById("timer").innerText=timeLeft;

    timer=setInterval(function(){

        timeLeft--;

        document.getElementById("timer").innerText=timeLeft;

        if(timeLeft==0){

            clearInterval(timer);

            document.getElementById("result").innerHTML="⏰ Time's Up!";

            currentLevel++;

            setTimeout(loadLevel,2000);

        }

    },1000);

}

function createOptions(level){

    let box=document.getElementById("options");

    box.innerHTML="";

    level.options.forEach(function(option){

        box.innerHTML += `
        <button class="option-btn" onclick="checkAnswer('${option}')">
            ${option}
        </button>
        `;

    });

}

function checkAnswer(selected){

    clearInterval(timer);

    let level=levels[currentLevel];

    if(selected===level.answer){

        score+=10;

        document.getElementById("score").innerText=score;

        document.getElementById("result").innerHTML="✅ Correct! +10 Points";

    }

    else{

        document.getElementById("result").innerHTML="❌ Wrong!";

        document.getElementById("hint").innerHTML=level.hint;

    }

    currentLevel++;

    setTimeout(loadLevel,2000);

}

loadLevel();