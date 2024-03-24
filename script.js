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
    const maxLength = Math.max(...words.map(word => word.length)); // Determine the maximum word length
    const newGridSize = Math.max(maxLength, gridSize); // Update grid size to accommodate longer words

    const wordGrid = [];
    for (let i = 0; i < newGridSize; i++) {
        const row = [];
        for (let j = 0; j < newGridSize; j++) {
            row.push(getRandomLetter());
        }
        wordGrid.push(row);
    }

    for (const word of words) {
        // Ensure word fits in the grid
        if (word.length > newGridSize) {
            continue; // Skip words that are too long for the grid
        }

        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 100) {
            const row = Math.floor(Math.random() * newGridSize);
            const col = Math.floor(Math.random() * newGridSize);
            const directionX = Math.random() < 0.5 ? 1 : -1;
            const directionY = Math.random() < 0.5 ? 1 : -1;

            let newRow = row;
            let newCol = col;
            let fitsInGrid = true;

            for (let i = 0; i < word.length; i++) {
                if (newRow < 0 || newRow >= newGridSize || newCol < 0 || newCol >= newGridSize ||
                    (wordGrid[newRow][newCol] !== '' && wordGrid[newRow][newCol] !== word[i])) {
                    fitsInGrid = false;
                    break;
                }
                newRow += directionY;
                newCol += directionX;
            }

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

            attempts++;
        }
    }

    return wordGrid;
}

// Generate a random word grid
function generateWordGrid() {
    const maxLength = Math.max(...words.map(word => word.length)); // Determine the maximum word length
    const newGridSize = Math.max(maxLength, gridSize); // Update grid size to accommodate longer words

    // Initialize an empty grid filled with random letters
    const wordGrid = [];
    for (let i = 0; i < newGridSize; i++) {
        const row = [];
        for (let j = 0; j < newGridSize; j++) {
            row.push(getRandomLetter());
        }
        wordGrid.push(row);
    }

    // Track coordinates of placed words
    const placedWordsCoords = [];

    // Place words in the grid
    for (const word of words) {
        // Word placement logic
        let placed = false;
        while (!placed) {
            // Choose a random starting position
            const row = Math.floor(Math.random() * newGridSize);
            const col = Math.floor(Math.random() * newGridSize);
            const directionX = Math.random() < 0.5 ? 1 : -1;
            const directionY = Math.random() < 0.5 ? 1 : -1;

            // Try placing the word horizontally
            let newRow = row;
            let newCol = col;
            let fitsInGrid = true;
            for (let i = 0; i < word.length; i++) {
                if (newRow < 0 || newRow >= newGridSize || newCol < 0 || newCol >= newGridSize || (wordGrid[newRow][newCol] !== '' && wordGrid[newRow][newCol] !== word[i])) {
                    fitsInGrid = false;
                    break;
                }
                newRow += directionY;
                newCol += directionX;
            }

            if (fitsInGrid) {
                // Store coordinates of placed word
                placedWordsCoords.push({ row, col, directionX, directionY, length: word.length });

                // Place the word in the grid
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

    return { wordGrid, placedWordsCoords };
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