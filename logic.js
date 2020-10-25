var currentQuestionIndex = 0;
var startButton = document.getElementById("start");
var choicesEl = document.getElementById("choices");
var questionsEl = document.getElementById("questions");
var feedbackEl = document.getElementById("feedback");
var timerEl = document.getElementById("time");
var submitButton = document.getElementById("submit");
var initialsEl = document.getElementById("initials")
var finalScore = document.getElementById("final-score")
var time = 60;
var timerId;

function clockTick(){
    time--;
    timerEl.textContent = time;

    if(time <= 0){
        endGame();
    }
}



function startQuiz(){
    //Hide Start Div
    var startScreen = document.getElementById("start-screen")
    startScreen.setAttribute("class", "hide");
    //Timer Code
    timerId = setInterval(clockTick, 1000)
    getQuestion();
}

function getQuestion(){
var questionScreen = document.getElementById("questions")
questionScreen.removeAttribute("class");
var currentQuestion = questions[currentQuestionIndex]
var titleEl = document.getElementById("question-title");
titleEl.textContent = currentQuestion.title;

choicesEl.innerHTML = '';

currentQuestion.choices.forEach(function(choice, i){
    var optionButton = document.createElement("button");
    optionButton.setAttribute("class","choices");
    optionButton.setAttribute("value", choice);
    optionButton.textContent = choice;
    optionButton.onclick = answerClick;
    choicesEl.appendChild(optionButton);
})

function answerClick(){
if(this.value !== questions[currentQuestionIndex].answer){
    feedbackEl.textContent = "Wrong!"
}
else {
    feedbackEl.textContent = "Correct!"
}




feedbackEl.setAttribute("class", "feedback");
    setTimeout(function(){
        console.log("hello")
        feedbackEl.setAttribute("class", "feedback hide");

    }, 1000);

    currentQuestionIndex++

    if(currentQuestionIndex === questions.length){
        endGame();
    } else{
        getQuestion();
    }

}
}

function endGame(){
    feedbackEl.textContent = "Game Over!"
    clearInterval(timerId)
    var endScreen = document.getElementById("end-screen")
    endScreen.removeAttribute("class")
    var questionScreen = document.getElementById("questions")
    questionScreen.setAttribute("class", "hide")
    // choicesEl.textContent = "Your final score is "
    // var submitBtn = document.createElement("button")
    // submitBtn.setAttribute("class", "submit");
}

function submitInitials(){
    var initials = initialsEl.value.trim();
    var userScore = {
        score: time,
        intitials: initials,
    };
    var highscores = [] || JSON.parse(window.localStorage.getItem("highscores"))
    highscores.push(userScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores))

    var endScreen = document.getElementById("end-screen")
    endScreen.setAttribute("class", "hide")

    var leaderboardScreen = document.getElementById("leaderboard")
    leaderboardScreen.removeAttribute("class")

    highscores.forEach(function(score){
        var liTag = document.createElement("li");
        liTag.textContent = score.initials;
        var listItem = document.getElementById("highscores");
        listItem.appendChild(liTag)
    })
    finalScore.textContent = initials;
}
submitButton.onclick = submitInitials;

startButton.onclick = startQuiz