const playBoard = document.querySelector(".play-board");
let foodX = 13, foodY = 10;
let snakeX = 13, snakeY = 10;
let velX = 0, velY = 0;
let snakeBody = [];
let gamePaused = false;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1; /*30 é o número de linhas e colunas*/
    foodY = Math.floor(Math.random() * 30) + 1;
}

const changeDirection = (e) => { //altera a velocidade
    if (e.key === "ArrowUp") {
        velX = 0;
        velY = -1;
    } else if (e.key === "ArrowDown") {
        velX = 0;
        velY = 1;
    } else if (e.key === "ArrowLeft") {
        velX = -1;
        velY = 0;
    } else if (e.key === "ArrowRight") {
        velX = 1;
        velY = 0;
    }
    initGame();
}

const togglePause = () =>{
    gamePaused = !gamePaused;
    if (gamePaused) {
        console.log("Game Paused");
    } else {
        console.log("Game Resumed");
        // Resume the game loop
        initGame();
    }
}
const initGame = () => {
    console.log("X:" + snakeX + " Y: " + snakeY);
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]); // create more snake body
        //event.preventDefault(); //evita o reload
        falaPalavra();
    }

    if (snakeX>30){
        snakeX=1;
    }
    if (snakeX<1){
        snakeX=30;
    }

    if (snakeY>30){
        snakeY=1;
    }
    if (snakeY<1){
        snakeY=30;
    }
    

    for (let index = snakeBody.length - 1; index > 0; index--) {
        snakeBody[index] = snakeBody[index - 1];
    }

    //the first element should be aways the head
    snakeBody[0] = [snakeX, snakeY];

    //a velocidade deve alterar a cabeça da cobra
    snakeX += velX;
    snakeY += velY;

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="food" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }

    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
setInterval(initGame, 125); //velocidade da cobra;
document.addEventListener("keydown", changeDirection);
