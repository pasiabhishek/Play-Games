let character = document.getElementById("robo-image");
let block = document.getElementById("rock-image");


addEventListener("keydown", function(event) {
    if (event.code === "ArrowUp") {
        jump();
    }
    if (event.code === "Space") {
        jump();
    }   
});  


function jump() {
    character.style.transform = "translateY(-150px)";

    setTimeout(() => {
        character.style.transform = "translateY(0)";
    },400);
}


setInterval(() => {
    let charcterBottom= parseInt(getComputedStyle(character).getPropertyValue("bottom"));
    let charcterLeft= parseInt(getComputedStyle(character).getPropertyValue("left"));

    let blockBottom= parseInt(getComputedStyle(block).getPropertyValue("bottom"));
    let blockLeft= parseInt(getComputedStyle(block).getPropertyValue("left"));



   if (character.x == block.x && character.y == block.y) {
        block.style.animation = "none";
        alert("Game Over");
        alert("Refresh the page to play again");
    }


    console.log("Character Bottom: " + charcter.y   + ", Character Left: " + charcter.x);
    console.log("Block Bottom: " + block.y + ", Block Left: " + block.x);
}, 100);