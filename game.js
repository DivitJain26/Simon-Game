var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


////////////////////////////////////////////////////NEXT SEQUENCE///////////////////////////////////////////////////////////
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);

    level++;
    $("#level-title").text("Level " + level);
    
    console.log(randomNumber);
    console.log(randomChosenColour);
    console.log(gamePattern);
    console.log("Level " + level);
}


////////////////////////////////////////////////////CLICK EFFECTS///////////////////////////////////////////////////////////
$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    console.log(userChosenColour);

    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

    console.log(userClickedPattern.length);
    console.log(gamePattern.length);

    console.log(userChosenColour);
    console.log(buttonColours.indexOf(userChosenColour));
});

////////////////////////////////////////////////////SOUND EFFECTS///////////////////////////////////////////////////////////
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

////////////////////////////////////////////////////ANIMATION EFFECTS///////////////////////////////////////////////////////////
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

////////////////////////////////////////////////////Initialization///////////////////////////////////////////////////////////
$(document).on("keypress", function() {
    if(started == false) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }

    console.log(started);
});

////////////////////////////////////////////////////CHECK///////////////////////////////////////////////////////////
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("Sucess");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern =[]; 
        }
    } else {
        console.log("Wrong");

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();

    }
}

/////////////////////////////////////////////////////// Start Over ////////////////////////////////////////////////////
function startOver() {
    userClickedPattern = [];
    gamePattern = []; 
    level = 0;
    started = false;
}