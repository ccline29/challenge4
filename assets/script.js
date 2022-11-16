// Variables

var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTimer");
var questionsSection = document.querySelector("#questionsSection");
var quizContainer = document.querySelector("#quizContainer");
var allScores = JSON.parse(localStorage.getItem("allScores")) || [];

// Quiz time remaining

var secondsLeft = 93;

// Interval time

var holdInterval = 0;

// Penalty 10 seconds

var penalty = 10;

// Quiz questions array

var questions = [
    {
        title: "What is my favorite Baseball team?",
        options: ["Atlanta Braves()", "San Francisco Giants()", "Houston Astros", "New York Yankees()"],
        answer: "Atlanta Braves()"
    },
    {
        title: "What is my favorite Football Team?",
        options: ["Dallas Cowboys", "Pittsburgh Steelers)", "New York Giants", "San Francisco 49ers"],
        answer: "New York Giants"
    },
    {
        title: "Where is my next vacation?",
        options: ["Paris, France", "Cozumel, Mexico", "Orlando, Florida", "Nashville, Tennessee"],
        answer: "Cozumel, Mexico"
    },
    {
        title: "Where would I like to go on vacation?",
        options: ["Rome, Italy", "Athens, Greece", "Las Vegas, Nevada", "Nashville, Tennessee"],
        answer: "Rome, Italy"
    },
    {
        title: "What is on my bucket list?",
        options: ["Skydive", "Visit all 50 states", "Visit all 32 baseball stadiums", "Visit Great Wall of China"],
        answer: "Visit all 32 baseball stadiums"
    },

];

// Check questions array in console log

console.log(questions);

// Create ul for quiz questions

var ulEl = document.createElement("ul");
console.log(ulEl);
console.log(timer);
if (timer !== null) {
    timer.addEventListener("click", function () {
        if (holdInterval === 0) {
            holdInterval = setInterval(function () {
                secondsLeft--;
                currentTime.textContent = secondsLeft + " seconds";

                if (secondsLeft <= 0) {
                    clearInterval(holdInterval);
                    quizComplete();
                    currentTime.textContent = "GAME OVER! TRY AGAIN?";
                }
            }, 1000);
        }
        render(questionIndex);
    });
}
console.log(questionIndex);

// Renders questions

function render(questionIndex) {



    questionsSection.innerHTML = "";
    ulEl.innerHTML = "";

    // Loop through questions array

    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].options;
        questionsSection.textContent = userQuestion;
    }
    // New for each for question

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsSection.appendChild(ulEl);
        ulEl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare options with answer

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var answerDiv = document.createElement("div");
        answerDiv.setAttribute("id", "answerDiv");

        // Correct condition 

        if (element.textContent == questions[questionIndex].answer) {
            score++;
            answerDiv.textContent = "YES! The answer is:  " + questions[questionIndex].answer;
        }
        else {

            // Will deduct 10 seconds off secondsLeft for wrong answers

            secondsLeft = secondsLeft - penalty;
            answerDiv.textContent = "NO! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on 
    // Append page with user information

    questionIndex++;

    if (questionIndex >= questions.length) {
        quizComplete();
        answerDiv.textContent = "DONE!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    }
    else {
        render(questionIndex);
    }
    questionsSection.appendChild(answerDiv);

}
// Quiz complete clear questionsSection

function quizComplete() {
    questionsSection.innerHTML = "";
    currentTime.innerHTML = "";

    // Create h1, p elements

    var h1El = document.createElement("h1");
    h1El.setAttribute("id", "h1El");
    h1El.textContent = "Quiz Complete!"

    questionsSection.appendChild(h1El);

    var pEl = document.createElement("p");
    pEl.setAttribute("id", "pEl");

    questionsSection.appendChild(pEl);

    // Calculates time remaining and creates score

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var pEl2 = document.createElement("p");
        clearInterval(holdInterval);
        pEl.textContent = "Your final score is: " + timeRemaining;

        questionsSection.appendChild(pEl2);
    }

    // User prompted to enter intials

    var enterInitials = document.createElement("initials");
    enterInitials.setAttribute("id", "enterInitials");
    enterInitials.textContent = "Enter your initials: ";

    questionsSection.appendChild(enterInitials);

    // Enter initials

    var userInput = document.createElement("input");
    userInput.setAttribute("type", "text");
    userInput.setAttribute("id", "initials");
    userInput.textContent = "";

    questionsSection.appendChild(userInput);

    // Submit user information

    var initialsSubmit = document.createElement("button");
    initialsSubmit.setAttribute("class", "btn btn-light");
    initialsSubmit.setAttribute("type", "submit");
    initialsSubmit.setAttribute("id", "submit");
    initialsSubmit.textContent = "Submit";

    questionsSection.appendChild(initialsSubmit);

    // Event listener to capture initials and score in local storage 

    initialsSubmit.addEventListener("click", function (event) {
        event.preventDefault();
        var initials = userInput.value;
        console.log(initials);
        if (!initials) {
            document.querySelector("#submit").textContent = "Enter a valid value!";
            console.log(initialsSubmit);
        }
        else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }

            // Clearing HTML at #questionSection 

            document.querySelector("#questionsSection").innerHTML = "";

            // Create High Scores page heading

            var h2El = document.createElement("h2");
            h2El.setAttribute("id", "h2El");
            h2El.textContent = "High Scores!"

            // Append element to page

            questionsSection.appendChild(h2El);

            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            // Adds score to final page

            for (let i = 0; i < allScores.length; i++) {
                const el = allScores[i].initials + " " + allScores[i].score;
                var li2 = document.createElement("li");
                li2.textContent = el;
                var ul = document.querySelector("#highScoresUl");
                ul.appendChild(li2);

            }

        }

    });
}