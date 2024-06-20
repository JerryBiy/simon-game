let buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userChosenPattern = [];
let level = 0;
let click = 0;
let gameMode = true;

const nextSequence = () => {
    //generate a random number between 0 and 3
    let randomNumber = Math.floor(4 * Math.random());
    let randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    $(`#${randomColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    let audio = new Audio(`sounds/${randomColor}.mp3`);
    audio.play();
    level++;
    click = 0;
    userChosenPattern = [];
    $('h1').text(`Level ${level}`);
}

const animatePress = currentColor => {
    $(`#${currentColor}`).addClass('pressed');
    setTimeout(() => {
        $(`#${currentColor}`).removeClass('pressed');
    }, 100)
}


const playSound = name => {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

const gameOver = () => {
    let audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $('body').addClass('game-over');
    setTimeout(() => {
        $('body').removeClass('game-over');
    }, 200);
    $('h1').text('Game Over, Press Any Key to Restart');
    $(document).on('keypress', startOver());
}

$('.button-20').on('click', () => {
    gameMode = !gameMode;
    if (gameMode) {
        $('.button-20').text('Switch Game Over Mode - immediate Game Over');
    } else {
        $('.button-20').text('Switch Game Over Mode - Game Over after finished');
    }
})


$('.btn').on('click', e => {
    click++;
    let userChosenColor = $(e.target).attr('id');
    userChosenPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log('user', userChosenPattern);
    console.log('game', gamePattern);
    if (wasPressed) {
        if (!gameMode) {
            if (click === gamePattern.length) {
                if (arraysEqual(userChosenPattern, gamePattern)) {
                    setTimeout(() => {
                        nextSequence();
                    }, 1000)
                } else {
                    setTimeout(() => {
                        gameOver();
                    }, 100)
                }
            }
        } else {
            if (userChosenPattern[click - 1] === gamePattern[click - 1]) {
                if (click === gamePattern.length) {
                    setTimeout(() => {
                        nextSequence();
                    }, 1000)
                }
            } else {
                setTimeout(() => {
                    gameOver();
                }, 100)
            }
        }
    }

})

const startOver = () => {

    level = 0;
    wasPressed = false;
    gamePattern = [];
    userChosenPattern = [];
    click = 0;

}


const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}



let wasPressed = false;

$(document).keypress(e => {
    if (!wasPressed) {
        nextSequence();
    }
    wasPressed = true;
})
