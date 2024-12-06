// Select all the cells, score elements, and modal elements
const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const winModal = document.getElementById('winModal');
const modalMessage = document.getElementById('modalMessage');
const modalClose = document.getElementById('modalClose');

let currentPlayer = 'X'; // Set initial player to 'X'
let board = Array(9).fill(null); // Initialize an empty board with 9 null values
let scores = { X: 0, O: 0 }; // Track scores for players X and O

// Function to handle cell click events
function handleClick(e) {
  const cell = e.target;
  const index = Array.from(cells).indexOf(cell);

  if (!board[index]) { // Check if the cell is not already filled
    board[index] = currentPlayer; // Mark the cell with the current player's symbol
    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) { // Check if the current player has won
      message.textContent = `Player ${currentPlayer} Wins!`;
      scores[currentPlayer]++; // Increment the score of the winning player
      updateScores(); // Update the score display
      showWinPopup(currentPlayer); // Display the win popup
    } else if (board.every(cell => cell)) { // Check if it's a draw
      message.textContent = `It's a Draw!`;
      showWinPopup('Draw'); // Display draw message in the popup
    } else { // Switch player turn
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}

// Function to check if the current player has won
function checkWin(player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // Check if any of the win patterns are matched by the current player
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === player)
  );
}

// Function to update the score display for both players
function updateScores() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

// Function to reset the board for a new game
function resetBoard() {
  board.fill(null); // Clear the board
  cells.forEach(cell => (cell.textContent = '')); // Clear the text in each cell
  currentPlayer = 'X'; // Reset the current player to X
  message.textContent = `Player ${currentPlayer}'s Turn`; // Update the message
}

// Function to show the win or draw popup
function showWinPopup(result) {
  if (result === 'Draw') {
    modalMessage.textContent = `It's a Draw!`; // Set message for draw
  } else {
    modalMessage.textContent = `Player ${result} Wins!`; // Set message for winner
  }
  winModal.style.display = 'flex'; // Show the win modal
}

// Event listener to close the popup and reset the game
modalClose.addEventListener('click', () => {
  winModal.style.display = 'none'; // Close the modal
  resetBoard(); // Reset the board after closing the popup
});

// Attach click event listeners to each cell
cells.forEach(cell => cell.addEventListener('click', handleClick));
