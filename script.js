// script.js
(function() {
    'use strict';

    // Extend the element method
    Element.prototype.wordSearch = function(settings) {
        return new WordSearch(this, settings);
    }

    /**
     * Word search
     *
     * @param {Element} wrapWl the game's wrap element
     * @param {Array} settings
     * constructor
     */
    function WordSearch(wrapEl, settings) {
        this.wrapEl = wrapEl;

        // Add `.ws-area` to wrap element
        this.wrapEl.classList.add('ws-area');

        // Default settings
        var default_settings = {
            'gridSize': 15,
            'words': ["JAVASCRIPT", "HTML", "CSS", "REACT", "WEB", "DEVELOPMENT"],
        }
        this.settings = Object.assign(default_settings, settings);

        this.startButton = this.wrapEl.querySelector("#startButton"); // Changed to wrapEl
        this.startButton.addEventListener("click", this.startGame.bind(this));
    }

    WordSearch.prototype.getRandomLetter = function() {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    WordSearch.prototype.generateWordGrid = function() {
        const maxLength = Math.max(...this.settings.words.map(word => word.length)); // Determine the maximum word length
        const gridSize = Math.max(maxLength, this.settings.gridSize); // Adjust grid size based on maximum word length

        const wordGrid = [];

        // Initialize the grid with empty strings
        for (let i = 0; i < gridSize; i++) {
            const row = Array(gridSize).fill('');
            wordGrid.push(row);
        }

        // Place words in the grid
        for (const word of this.settings.words) {
            let placed = false;
            while (!placed) {
                const direction = Math.random() < 0.5 ? 1 : -1; // Randomly choose forward or backward direction
                const row = Math.floor(Math.random() * gridSize);
                const col = Math.floor(Math.random() * gridSize);
                let conflict = false;

                // Check if word can be placed in the selected position
                for (let i = 0; i < word.length; i++) {
                    const newRow = row + (i * direction);
                    const newCol = col + (i * direction);
                    if (newRow < 0 || newRow >= gridSize || newCol < 0 || newCol >= gridSize || wordGrid[newRow][newCol] !== '') {
                        conflict = true;
                        break;
                    }
                }

                // Place the word if no conflict is found
                if (!conflict) {
                    for (let i = 0; i < word.length; i++) {
                        const newRow = row + (i * direction);
                        const newCol = col + (i * direction);
                        wordGrid[newRow][newCol] = word[i];
                    }
                    console.log(`Placed word '${word}' at (${col + 1}, ${row + 1}) with direction ${direction > 0 ? 'forward' : 'backward'}`);
                    placed = true;
                }
            }
        }

        // Fill remaining empty cells with random letters
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (wordGrid[i][j] === '') {
                    wordGrid[i][j] = this.getRandomLetter();
                }
            }
        }

        return wordGrid;
    }




    WordSearch.prototype.displayWordGrid = function(grid) {
        const wordSearchGrid = this.wrapEl.querySelector("#wordSearchGrid");
        wordSearchGrid.innerHTML = "";
        for (let i = 0; i < grid.length; i++) {
            const row = grid[i];
            const rowElement = document.createElement("div");
            rowElement.classList.add("row");
            for (let j = 0; j < row.length; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.textContent = row[j]; // Display the letter in the cell
                rowElement.appendChild(cell);
            }
            wordSearchGrid.appendChild(rowElement);
        }
    }

    WordSearch.prototype.displayWordList = function() {
        const wordList = this.wrapEl.querySelector("#wordList");
        wordList.innerHTML = "<strong>Words to find:</strong><br>";
        this.settings.words.forEach(word => {
            wordList.innerHTML += word + "<br>";
        });
    }

    WordSearch.prototype.highlightWords = function() {
        const wordSearchGrid = this.wrapEl.querySelector("#wordSearchGrid");
        const cells = wordSearchGrid.querySelectorAll(".cell");
        cells.forEach(cell => {
            const letter = cell.textContent;
            if (letter !== "") {
                this.settings.words.forEach(word => {
                    if (word.includes(letter)) {
                        cell.style.color = "red";
                    }
                });
            }
        });
    }

    WordSearch.prototype.startGame = function() {
        const wordGrid = this.generateWordGrid();
        console.log("Generated Word Grid:", wordGrid); // Log the generated word grid
        this.displayWordGrid(wordGrid);
        this.displayWordList(); // Display the word list
        this.highlightWords(); // Highlight words in the grid
    }


    // Start the game
    const wordSearchContainer = document.getElementById("wordSearchContainer");
    wordSearchContainer.wordSearch(); // Initialize the game
})();