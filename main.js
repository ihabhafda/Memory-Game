// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {

        // prompt Windows To Ask For Name
    let yourName = prompt("Whats Your Name?");

        // Name Is Empty
    if (yourName == null || yourName == "") {

        // Set Name To Unknown
        document.querySelector(".name span").innerHTML = 'Unknown';

        // Name Is Not Empty
    } else {

        // Set Name To Your Name
        document.querySelector(".name span").innerHTML = yourName;

    }

       // Remove Splash Screen
    document.querySelector(".control-buttons").remove();

};

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    // Add Click Event
    block.addEventListener('click', function () {

        flipBlock(block);

    });

});

// Flip Block Function
function flipBlock (selectedBlock) {

    // Add Class is-flipped
    selectedBlock.classList.add('is-flipped');

    // Collect All Flipped Cards
    let allFlippedBlock = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // If Theres two Selected Blocks
    if (allFlippedBlock.length === 2) {

        // Stop Clicking Function
        stopClicking();

        // CheckMatched Block Function
        checkMatchedBlocks(allFlippedBlock[0], allFlippedBlock[1]);

    }
}

// Stop Clicking Function
function stopClicking() {

    // Add Class No Clicking on Main Container
    blocksContainer.classList.add("no-clicking");

    setTimeout(() => {

        // Remove Class No Clicking After The Duration
        blocksContainer.classList.remove("no-clicking");

    }, duration);

}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector(".tries span");

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

        document.getElementById("success").play();

    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");

        }, duration);

        document.getElementById("fail").play();

    };
}

// Shuffle Function
function shuffle(array) {

    // Settings Vars
    let current = array.length,
        temp,
        random;

    while (current > 0) {

        // Get Random Number
        random = Math.floor(Math.random() * current);

        // Decrease Length By One
        current--;

        // [1] Save Current Element in Stash
        temp = array[current];

        // [2] Current Element = Random Element
        array[current] = array[random];

        // [3] Random Element = Get Element From Stash
        array[random] = temp;
    }

    return array;

    // tari2 atenye mo5tasara
    // let derRange = [4, 9, 6, 3, 7];
    // let test = derRange.sort(() => Math.random() - 0.5);
    // console.log(test);

}