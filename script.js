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
    // Initialize an empty grid filled with random letters
    const wordGrid = [];
    for (let i = 0; i < gridSize; i++) {
        const row = [];
        for (let j = 0; j < gridSize; j++) {
            row.push(getRandomLetter());
        }
        wordGrid.push(row);
    }

    // Place words in the grid
    for (const word of words) {
        let placed = false;
        let attempts = 0;
        while (!placed && attempts < 100) { // Limit attempts to avoid infinite loops
            attempts++;
            // Choose a random starting position
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);
            const directionX = Math.random() < 0.5 ? 1 : -1;
            const directionY = Math.random() < 0.5 ? 1 : -1;

            // Check if word can be placed in the chosen direction
            let newRow = row;
            let newCol = col;
            let fitsInGrid = true;
            for (let i = 0; i < word.length; i++) {
                if (newRow < 0 || newRow >= gridSize || newCol < 0 || newCol >= gridSize || wordGrid[newRow][newCol] !== '') {
                    fitsInGrid = false;
                    break;
                }
                newRow += directionY;
                newCol += directionX;
            }

            // If word can be placed, insert it into the grid
            if (fitsInGrid) {
                newRow = row;
                newCol = col;
                for (let i = 0; i < word.length; i++) {
                    wordGrid[newRow][newCol] = word[i];
                    newRow += directionY;
                    newCol += directionX;
                }
                placed = true;
            }
        }
    }

    return wordGrid;
}

// Function to display the word grid on the webpage
function displayWordGrid(grid) {
    const wordSearchGrid = document.getElementById("wordSearchGrid");

    // Clear any existing content in the grid
    wordSearchGrid.innerHTML = "";

    // Loop through each row in the grid
    grid.forEach(row => {
        // Create a new row element
        const rowElement = document.createElement("div");
        rowElement.classList.add("row");

        // Loop through each cell in the row
        row.forEach(letter => {
            // Create a new cell element
            const cell = document.createElement("div");
            cell.classList.add("cell");
            // Set the text content of the cell to the letter
            cell.textContent = letter;
            // Append the cell to the row
            rowElement.appendChild(cell);
        });

        // Append the row to the grid
        wordSearchGrid.appendChild(rowElement);
    });
}


// Function to handle the "Start Game" button click event
function startGame() {
    // Generate a new word grid
    const wordGrid = generateWordGrid();

    // Display the new word grid on the webpage
    displayWordGrid(wordGrid);

    console.log("start");
}

// Add event listener to the "Start Game" button
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startGame);