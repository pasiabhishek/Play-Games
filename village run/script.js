const startPage = document.querySelector(".start-page");
const gamePage = document.querySelector(".game-page");
const gameOverPage = document.querySelector(".game-over-page");
const player = document.querySelector(".character-container");
const block = document.querySelector(".obstacle-container");
const scoreDisplay = document.querySelector(".score");
const finalScoreDisplay = document.querySelector(".final-score");
const playBtn = document.querySelector("#playBtn");
const restartBtn = document.querySelector("#restartBtn");

const myAudio = new Audio('images/bgm.mp3');
let scoreCount = 0;
let scoreInterval = null;
let collisionLoop = null;
let isJumping = false;
let isRunning = false;

// --- jump ---
// Only ever add the class; removal is driven by the animation itself
// finishing (animationend), so timing can never drift out of sync
// with the CSS keyframes again.
function jump() {
    if (isJumping || !isRunning) return;
    isJumping = true;
    player.classList.add("jump-animation");
}

player.addEventListener("animationend", (e) => {
    if (e.animationName === "jump") {
        player.classList.remove("jump-animation");
        isJumping = false;
    }
});

function handleKeydown(e) {
    if (!isRunning) return;
    if (e.code === "ArrowUp" || e.code === "Space") {
        e.preventDefault();
        jump();
    }
}

// tap/click anywhere on the game itself, not window, so the click
// that opens the game page can't immediately trigger a jump too
gamePage.addEventListener("click", jump);
document.addEventListener("keydown", handleKeydown);

// --- game flow ---
function startGame() {
    myAudio.play();


    startPage.style.display = "none";
    gameOverPage.style.display = "none";
    gamePage.style.display = "block";

    scoreCount = 0;
    isRunning = true;
    isJumping = false;
    player.classList.remove("jump-animation");
    scoreDisplay.textContent = "score : 0";

    // restart the CSS obstacle animation from the beginning each run
    block.classList.remove("block-animation");
    void block.offsetWidth; // force reflow so the animation re-triggers
    block.classList.add("block-animation");

    scoreInterval = setInterval(() => {
        scoreCount += 1;
        scoreDisplay.textContent = "score : " + scoreCount;
    }, 50);

    collisionLoop = setInterval(() => {
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

function endGame() {
    isRunning = false;
    clearInterval(scoreInterval);
    clearInterval(collisionLoop);
    block.classList.remove("block-animation");

    gamePage.style.display = "none";
    gameOverPage.style.display = "flex";
    finalScoreDisplay.textContent = "score : " + scoreCount;
}

playBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);