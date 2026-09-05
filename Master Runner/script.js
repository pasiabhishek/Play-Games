const startPage = document.querySelector(".start-page");
const changePage = document.querySelector(".change-page");
const gamePage = document.querySelector(".game-page");
const gameOverPage = document.querySelector(".game-over-page");
const floor = document.querySelector(".floor-for-run");

const page = document.querySelectorAll(".page");
const player = document.querySelector(".character-container");
const block = document.querySelector(".obstacle-container");

const scoreDisplay = document.querySelector(".score");
const finalScoreDisplay = document.querySelector(".final-score");

const playBtn = document.querySelector("#playBtn");
const changeBtn = document.querySelector("#changeBtn");
const cityBtn = document.querySelector("#cityBtn");
const forestBtn = document.querySelector("#forestBtn");
const restartBtn = document.querySelector("#restartBtn");

const myAudio = new Audio("images/bgm.mp3");

let scoreCount = 0;
let scoreInterval = null;
let collisionLoop = null;
let isJumping = false;
let isRunning = false;


// Jump function
function jump() {
    if (isJumping || !isRunning) return;

    isJumping = true;
    player.classList.add("jump-animation");
}

// When the jump animation finishes, allow the player to jump again
player.addEventListener("animationend", (e) => {
    if (e.animationName === "jump") {
        player.classList.remove("jump-animation");
        isJumping = false;
    }
});


// Keyboard controls
function handleKeydown(e) {
    if (!isRunning) return;

    if (e.code === "ArrowUp" || e.code === "Space") {
        e.preventDefault();
        jump();
    }
}

document.addEventListener("keydown", handleKeydown);


// Click the game area to jump
gamePage.addEventListener("click", jump);


// Start the game
function startGame() {

    // Clear old timers when restarting
    clearInterval(scoreInterval);
    clearInterval(collisionLoop);

    myAudio.loop = true;
    myAudio.play().catch(() => { });


    // Show the game and hide the other pages
    startPage.style.display = "none";
    changePage.style.display = "none";
    gameOverPage.style.display = "none";
    gamePage.style.display = "block";


    // Reset everything
    scoreCount = 0;
    isRunning = true;
    isJumping = false;

    player.classList.remove("jump-animation");

    scoreDisplay.textContent = "score : 0";


    // Restart the obstacle animation
    block.classList.remove("block-animation");
    void block.offsetWidth;
    block.classList.add("block-animation");


    // Increase the score
    scoreInterval = setInterval(() => {
        if (!isRunning) return;

        scoreCount++;
        scoreDisplay.textContent = "score : " + scoreCount;
    }, 50);


    // Check if the player hits the obstacle
    collisionLoop = setInterval(() => {
        if (!isRunning) return;

        const playerRect = player.getBoundingClientRect();
        const blockRect = block.getBoundingClientRect();

        const collision =
            playerRect.left < blockRect.right &&
            playerRect.right > blockRect.left &&
            playerRect.top < blockRect.bottom &&
            playerRect.bottom > blockRect.top;

        if (collision) {
            endGame();
        }
    }, 50);
}


// Game over
function endGame() {
    isRunning = false;

    clearInterval(scoreInterval);
    clearInterval(collisionLoop);

    scoreInterval = null;
    collisionLoop = null;

    // Stop the obstacle
    block.classList.remove("block-animation");

    // Reset jump
    player.classList.remove("jump-animation");
    isJumping = false;

    // Stop the music
    myAudio.pause();
    myAudio.currentTime = 0;


    // Show game over screen
    gamePage.style.display = "none";
    gameOverPage.style.display = "flex";
    changePage.style.display = "none";

    finalScoreDisplay.textContent = "score : " + scoreCount;
}


// Open the character selection page
function change() {
    startPage.style.display = "none";
    changePage.style.display = "flex";
    gameOverPage.style.display = "none";
    gamePage.style.display = "none";
}


// Change to the city character and background
function changeToCity() {
    document.getElementById("character").src =
        "images/city/ruuning man.webp";

    // .page selects more than one element, so change each one
    page.forEach((p) => {
        p.style.backgroundImage =
            "url('images/city/background.gif')";
    });
    floor.style.display = "block";
    block.style.backgroundColor = "black";
    startGame();
}


// Change to the village character and background
function changeTovillage() {
    document.getElementById("character").src = "images/village/boy.gif";

    page.forEach((p) => {
        p.style.backgroundImage =
            "url('images/village/village-bg.gif')";
    });
    floor.style.display = "none";
    block.style.backgroundColor = "rgb(69, 58, 4)";

    startGame();
}


// Button events
playBtn.addEventListener("click", startGame);
changeBtn.addEventListener("click", change);
restartBtn.addEventListener("click", startGame);
cityBtn.addEventListener("click", changeToCity);
forestBtn.addEventListener("click", changeTovillage);
