/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;
let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 - dave*/

 function makeBoard(hgt, wdth) {
  for (let i = 0; i < hgt; i ++){
  board.push(Array.from({length: wdth}));
  }
}

function makeHtmlBoard() {
  const htmlBoard = document.querySelector('#board')
  // loops through header to insert data cells to play row
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  //loop through height for row creation and width for data cell population
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) -dave*/

function findSpotForCol(x) {
  for (let y = HEIGHT -1; y >= 0; y--) {
    if (board[y][x] === undefined){
      return [y , x]
    }
  }
  return null;
}


//function to determine current player for class - Dave
function currentPlayerCheck() {
  if (currPlayer === 1){
    return 1;
  }
  else{
    return 2;
  }
}

//
//  placeInTable: update DOM to place piece into HTML table of board -dave

function placeInTable(arr) {
  const newPiece = document.createElement('div');
  newPiece.classList.add(`piece${currentPlayerCheck()}`)
  let target = document.getElementById(`${arr[0]}-${arr[1]}`);
  target.appendChild(newPiece)
  board[`${arr[0]}`][`${arr[1]}`] = currentPlayerCheck();
}

// endGame: announce game end -dave//

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

// handleClick: handle click of column top to play piece //

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
      // following code checks for tie
      if (board.every(row => row.every(cell => cell))) {
        return endGame('Tie!');
      }
  // switch players
  // TODO: switch currPlayer 1 <-> 2 - Dave
  if (currPlayer === 1) {
    currPlayer = 2;
  }
  else if (currPlayer === 2){
    currPlayer = 1;
}
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      //code runs through all spaces around each x/y coord up to 4 spaces away for wins
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //check wins with "or" running them until win is found
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard(HEIGHT, WIDTH);
makeHtmlBoard();
