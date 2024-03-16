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
    const gridSize = Math.max(maxLength, 10); // Adjust grid size based on maximum word length

    const wordGrid = [];

    // Fill the grid with random letters
    for (let i = 0; i < gridSize; i++) {
        const row = [];
        for (let j = 0; j < gridSize; j++) {
            row.push(getRandomLetter());
        }
        wordGrid.push(row);
    }

    // Place words in the grid
    for (const word of words) {
        const direction = Math.random() < 0.5 ? 1 : -1; // Randomly choose forward or backward direction
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);

        for (let i = 0; i < word.length; i++) {
            const newRow = row + (i * direction);
            const newCol = col + (i * direction);
            if (newRow < 0 || newRow >= gridSize || newCol < 0 || newCol >= gridSize || wordGrid[newRow][newCol] !== '') {
                // Word placement conflicts, skip this word
                break;
            }
            wordGrid[newRow][newCol] = word[i];
        }
    }

    return wordGrid;
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
        if (word === "") return;
        const found = words.includes(word) === false;
        const wordElement = document.createElement("div");
        wordElement.textContent = word;
        if (found) {
            wordElement.classList.add('found-word');
        }
        wordList.appendChild(wordElement);
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

// Array to store selected cell coordinates
let selectedCells = [];

// Function to handle cell click events
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedLetter = clickedCell.textContent;
    // Check if the clicked cell is already selected
    if (selectedCells.includes(clickedCell)) {
        // Deselect the cell
        clickedCell.classList.remove('selected');
        // Remove cell from selectedCells array
        selectedCells = selectedCells.filter(cell => cell !== clickedCell);
    } else {
        // Select the cell
        clickedCell.classList.add('selected');
        // Add cell to selectedCells array
        selectedCells.push(clickedCell);
    }
    // Check if selected letters form any word
    const selectedWord = selectedCells.map(cell => cell.textContent).join('');
    if (words.includes(selectedWord)) {
        // Word found, highlight the letters
        selectedCells.forEach(cell => {
            cell.classList.add('found');
        });
        // Remove found word from word list
        const wordIndex = words.indexOf(selectedWord);
        words.splice(wordIndex, 1);
        displayWordList();
    }
}

// Add event listener to word search grid cells
const wordSearchGrid = document.getElementById("wordSearchGrid");
wordSearchGrid.addEventListener("click", handleCellClick);