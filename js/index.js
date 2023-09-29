//Game constants and variable here...
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 17 }
];
let food = { x: 7, y: 6 }

//Game functions here...
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // if snake bump into it self
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    
    // if snake bump into it wall
    if (snake[0].x >= 31 || snake[0].x <= 0 || snake[0].y >= 31 || snake[0].y <= 0) {
        return true;
    }
}


function gameEngine() {
    // part 1 : Update the snake and food
    if (isCollide(snakeArr)) {
        musicSound.pause();
        gameOverSound.play();
        inputDir = { x: 0, y: 0 };
        alert('Game Over. Press Any Key To Play Again!')
        snakeArr = [{ x: 13, y: 17 }];
        score = 0;
    }


    // if snake have eaten the food, increment the score and regenerate the food.
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score++;
        if (score>hiscoreval) {
            hiscoreval = score;
            localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = 'High Score: '+ hiscoreval;

        }
        scoreBox.innerHTML = 'Score: '+ score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 1;
        let b = 29;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }


    // Moving the snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part 2 : Display the snake and food
    // Display the snake
    board.innerHTML = '';
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head')
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}

//Main logic start here...
let hiscore = localStorage.getItem('hiscore');
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem('hiscore',JSON.stringify(hiscoreval))
}else{
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML = 'High Score: '+ hiscore;
}


window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            moveSound.play();
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            moveSound.play();
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            moveSound.play();
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            moveSound.play();
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})


