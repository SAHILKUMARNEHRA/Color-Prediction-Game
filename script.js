let colors = ["Red", "Blue", "Green"];
let correctColor = "";
let playerGuess = "";
let score = 0;
let username = prompt("Enter your name:");
let bestScore = localStorage.getItem(username + "_best") || 0;

document.getElementById("best").innerText = bestScore;

function newRound() {
    correctColor = colors[Math.floor(Math.random() * 3)];
    document.getElementById("color-box").style.backgroundColor = "gray";
    document.getElementById("result").innerText = "Pick a color!";
    document.getElementById("spin-btn").disabled = true;
    playerGuess = "";
    let buttons = document.getElementsByClassName("color-btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
    }
}

function selectColor(color) {
    playerGuess = color;
    let buttons = document.getElementsByClassName("color-btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
    }
    document.querySelector(`button[onclick="selectColor('${color}')"]`).classList.add("selected");
    document.getElementById("spin-btn").disabled = false;
}

function spin() {
    let box = document.getElementById("color-box");
    let result = document.getElementById("result");
    let scoreDisplay = document.getElementById("score");

    if (correctColor == "Red") {
        box.style.backgroundColor = "red";
    } else if (correctColor == "Blue") {
        box.style.backgroundColor = "blue";
    } else {
        box.style.backgroundColor = "green";
    }

    setTimeout(function() {
        if (playerGuess == correctColor) {
            result.innerText = "Correct!";
            score = score + 10;
            scoreDisplay.innerText = score;
            if (score > bestScore) {
                bestScore = score;
                localStorage.setItem(username + "_best", bestScore);
                document.getElementById("best").innerText = bestScore;
            }
        } else {
            result.innerText = "Wrong! It was " + correctColor;
            score = score - 5;
            scoreDisplay.innerText = score;
            if (score < 0) {
                document.getElementById("game-over").classList.remove("hide");
                return;
            }
        }
        setTimeout(newRound, 1000);
    }, 500);
}

function restart() {
    score = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("game-over").classList.add("hide");
    newRound();
}

newRound();