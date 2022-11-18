// Variables

var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTimer");
var questioncontainer = document.querySelector("#questioncontainer");
var quizContainer = document.querySelector("#quizContainer");
var totalScores = JSON.parse(localStorage.getItem("totalScores")) || [];

// Quiz time remaining

var secondsLeft = 95;

// Interval time

var holdInterval = 0;

// Penalty 10 seconds

var loss = 10;

// Quiz questions array

var questions = [
    {
        title: "Who is my favorite Baseball Team?",
        options: ["San Francisco Giants", "Atlanta Braves", "Houston Astros", "New York Yankees"],
        answer: "Atlanta Braves"
    },
    {
        title: "Who is my favorite Football Team?",
        options: ["Dallas Cowboys", "Pittsburgh Steelers", "New York Giants", "San Francisco 49ers"],
        answer: "New York Giants"
    },
    {
        title: "Where is my next vacation?",
        options: ["Orlando, Florida", "Nashville, Tennessee", "Cozumel, Mexico", "Las Vegas, Nevada"],
        answer: "Cozumel, Mexico"
    },
    {
        title: "Where would I like to go on vacation?",
        options: ["Nashville, Tennessee", "Las Vegas, Nevada", "Athens, Greece", "Rome, Italy"],
        answer: "Rome, Italy"
    },
    {
        title: "What is on my Bucket List?",
        options: ["Visit all 32 baseball stadiums", "Skydive", "Visit Great Wall of China", "Visit Australia"],
        answer: "Visit all 32 baseball stadiums"
    },

];

// Create ul for quiz questions

var ulEl = document.createElement("ul");
if (timer !== null) {
    timer.addEventListener("click", function () {
        if (holdInterval === 0) {
            holdInterval = setInterval(function () {
                secondsLeft--;
                currentTime.textContent = secondsLeft + " seconds";

                if (secondsLeft <= 0) {
                    clearInterval(holdInterval);
                    quizComplete();
                    currentTime.textContent = "GAME OVER!";
                }
            }, 1000);
        }
        render(questionIndex);
    });
}

// Renders questions

function render(questionIndex) {

    // Clears existing data 

    questioncontainer.innerHTML = "";
    ulEl.innerHTML = "";

    // Loop through questions array

    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].options;
        questioncontainer.textContent = userQuestion;
    }
    // New for each for question

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questioncontainer.appendChild(ulEl);
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
            answerDiv.textContent = "CORRECT! The answer is:  " + questions[questionIndex].answer;
        }
        else {

            // Will deduct 10 seconds off secondsLeft for wrong answers

            secondsLeft = secondsLeft - loss;
            answerDiv.textContent = "INCORRECT! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on 
    // Append page with user information

    questionIndex++;

    if (questionIndex >= questions.length) {
        quizComplete();
        answerDiv.textContent = "GAME OVER!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    }
    else {
        render(questionIndex);
    }
    questioncontainer.appendChild(answerDiv);

}
// Quiz complete clear questionsSection

function quizComplete() {
    questioncontainer.innerHTML = "";
    currentTime.innerHTML = "";

    // Create h1, p elements

    var h1El = document.createElement("h1");
    h1El.setAttribute("id", "h1El");
    h1El.textContent = "GAME OVER!"

    questioncontainer.appendChild(h1El);

    var pEl = document.createElement("p");
    pEl.setAttribute("id", "pEl");

    questioncontainer.appendChild(pEl);

    // Calculates time remaining and creates score

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var pEl2 = document.createElement("p");
        clearInterval(holdInterval);
        pEl.textContent = "Your total score is: " + timeRemaining;

        questioncontainer.appendChild(pEl2);
    }

    // User prompted to enter name

    var enterName = document.createElement("name");
    enterName.setAttribute("id", "enterName");
    enterName.textContent = "Enter your name: ";

    questioncontainer.appendChild(enterName);

    // Enter name

    var userInput = document.createElement("input");
    userInput.setAttribute("type", "text");
    userInput.setAttribute("id", "name");
    userInput.textContent = "";

    questioncontainer.appendChild(userInput);

    // Submit user information

    var nameSubmit = document.createElement("button");
    nameSubmit.setAttribute("class", "btn btn-light");
    nameSubmit.setAttribute("type", "submit");
    nameSubmit.setAttribute("id", "submit");
    nameSubmit.textContent = "Submit";

    questioncontainer.appendChild(nameSubmit);

    // Event listener to enter name and score in local storage 

    nameSubmit.addEventListener("click", function (event) {
        event.preventDefault();
        var name = userInput.value;
        if (!name) {
            document.querySelector("#submit").textContent = "Enter a valid value!";
        }
        else {
            var finalScore = {
                name: name,
                score: timeRemaining
            }

            // Clearing HTML at #questionSection 

            document.querySelector("#questioncontainer").innerHTML = "";

            // Create High Scores page heading

            var h2El = document.createElement("h2");
            h2El.setAttribute("id", "h2El");
            h2El.textContent = "High Scores!"

            // Append element to page

            questioncontainer.appendChild(h2El);

            totalScores.push(finalScore);
            var newScore = JSON.stringify(totalScores);
            localStorage.setItem("totalScores", newScore);

            // Adds score to final page

            for (let i = 0; i < totalScores.length; i++) {
                const el = totalScores[i].name + " " + totalScores[i].score;
                var li2 = document.createElement("li");
                li2.textContent = el;
                var ul = document.querySelector("#topScoresUl");
                ul.appendChild(li2);

            }

        }

    });
}
