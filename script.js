// Define words for the word search game
const words = ["JAVASCRIPT", "HTML", "CSS", "REACT", "WEB", "DEVELOPMENT"];

// Constants for grid size and letters
const gridSize = 10;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Generate a random letter
function getRandomLetter() {
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

// Generate a random word grid
function generateWordGrid() {
    const grid = [];
    for (let i = 0; i < gridSize; i++) {
        const row = [];
        for (let j = 0; j < gridSize; j++) {
            row.push(getRandomLetter());
        }
        grid.push(row);
    }
    return grid;
}

// Display the word grid on the page
function displayWordGrid(grid) {
    const wordSearchGrid = document.getElementById("wordSearchGrid");
    wordSearchGrid.innerHTML = "";
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        const rowElement = document.createElement("div");
        rowElement.classList.add("row");
        for (let j = 0; j < row.length; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = row[j];
            rowElement.appendChild(cell);
        }
        wordSearchGrid.appendChild(rowElement);
    }
}

// Display the list of words to find
function displayWordList() {
    const wordList = document.getElementById("wordList");
    wordList.innerHTML = "<strong>Words to find:</strong><br>";
    words.forEach(word => {
        wordList.innerHTML += word + "<br>";
    });
}

// Start the game
function startGame() {
    const wordGrid = generateWordGrid();
    displayWordGrid(wordGrid);
    displayWordList();
}

// Add event listener to start button
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startGame);