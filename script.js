// Define words for the word search game
const words = ["JAVASCRIPT", "HTML", "CSS", "REACT", "WEB", "DEVELOPMENT"];

// Constants for grid size and letters
const gridSize = 12;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Function to generate a random letter
function getRandomLetter() {
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

// Function to generate a random word grid asynchronously
// Function to generate a random word grid asynchronously
async function generateWordGrid() {
    return new Promise((resolve, reject) => {
        try {
            const maxLength = Math.max(...words.map(word => word.length));
            const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

            for (const word of words) {
                let placed = false;
                let attempts = 0;
                while (!placed && attempts < 100) {
                    attempts++;
                    const direction = Math.random() < 0.5 ? 1 : -1;
                    const row = Math.floor(Math.random() * gridSize);
                    const col = Math.floor(Math.random() * gridSize);
                    let conflict = false;
                    for (let i = 0; i < word.length; i++) {
                        const newRow = row + (i * direction);
                        const newCol = col + (i * direction);
                        if (newRow < 0 || newRow >= gridSize || newCol < 0 || newCol >= gridSize || grid[newRow][newCol] !== '') {
                            conflict = true;
                            break;
                        }
                    }
                    if (!conflict) {
                        for (let i = 0; i < word.length; i++) {
                            const newRow = row + (i * direction);
                            const newCol = col + (i * direction);
                            grid[newRow][newCol] = word[i];
                        }
                        console.log(`Placed word '${word}' at (${col + 1}, ${row + 1}) with direction ${direction > 0 ? 'forward' : 'backward'}`);
                        placed = true;
                    }
                }
            }

            // Fill remaining empty cells with random letters
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    if (grid[i][j] === '') {
                        grid[i][j] = getRandomLetter();
                    }
                }
            }

            resolve(grid);
        } catch (error) {
            reject(error);
        }
    });
}


// Function to display the word grid on the webpage
function displayWordGrid(grid) {
    const wordSearchGrid = document.getElementById("wordSearchGrid");
    wordSearchGrid.innerHTML = "";
    grid.forEach(row => {
        const rowElement = document.createElement("div");
        rowElement.classList.add("row");
        row.forEach(letter => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = letter;
            rowElement.appendChild(cell);
        });
        wordSearchGrid.appendChild(rowElement);
    });
}

// Function to display the word list on the webpage
function displayWordList(words) {
    const wordList = document.getElementById("wordList");
    wordList.innerHTML = "<strong>Words to find:</strong><br>";
    words.forEach(word => {
        wordList.innerHTML += word + "<br>";
    });
}

// Function to highlight words in the grid
function highlightWords() {
    const wordSearchGrid = document.getElementById("wordSearchGrid");
    const cells = wordSearchGrid.querySelectorAll(".cell");
    cells.forEach(cell => {
        const letter = cell.textContent;
        if (letter !== "") {
            words.forEach(word => {
                if (word.includes(letter)) {
                    cell.style.color = "red";
                }
            });
        }
    });
}

// Function to handle the "Start Game" button click event
async function startGame() {
    try {
        // Generate a new word grid asynchronously
        const wordGrid = await generateWordGrid();

        // Display the new word grid on the webpage
        displayWordGrid(wordGrid);

        // Display the word list on the webpage
        displayWordList(words);

        // // Highlight words in the grid
        // highlightWords();
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Add event listener to the "Start Game" button
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startGame);
