// HTML Elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');


// game variables
let gameIsLive = true;
let xIsNext = true;
let moves = 0;
let winner;
let cells = Array.from(cellDivs);
let solutions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


// game constants
const xSymbol = '×';
const oSymbol = '○';

// functions
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter) => {
  gameIsLive = false;
  if (letter === 'x') {
    statusDiv.innerHTML= `${letterToSymbol(letter)} has won!`;
  } else {
    statusDiv.innerHTML= `<span>${letterToSymbol(letter)} has won!</span>`;
  }
}

const checkGameStatus = () => {
  solutions.forEach ( solution => {
    if (cells[solution[0]].classList[1] === cells[solution[1]].classList[1] && cells[solution[1]].classList[1]===cells[solution[2]].classList[1] && cells[solution[0]].classList[1] ) {
      winner = cells[solution[0]].classList[1];
      handleWin(winner);
      cells[solution[0]].classList.add("won");
      cells[solution[1]].classList.add("won");
      cells[solution[2]].classList.add("won");
    }
  });
  if (!winner)  {
    if ( moves === 9) {
        gameIsLive = false;
        statusDiv.innerHTML = 'Game is tied!';
    } else {
      xIsNext = !xIsNext;
      if (xIsNext)  {
        statusDiv.innerHTML= `${xSymbol} is next`;
      } else {
        statusDiv.innerHTML= `<span>${oSymbol} is next </span>`;
      }
    }
  }
}

// event handlers
const handleReset = () => {
  gameIsLive = true;
  xIsNext = true;
  moves = 0;
  winner = undefined;
  statusDiv.innerHTML = `${xSymbol} is next`;
  for ( const cellDiv of cellDivs ) {
    cellDiv.classList.remove('x');
    cellDiv.classList.remove('o');
    cellDiv.classList.remove('won');
  }
  cells = Array.from(cellDivs);
}

const handleCellClick = (e) => {
  const classList = e.target.classList;
  if( !gameIsLive || classList[1] === 'x' || classList[1] === 'o') {
    return;
  } 
  if (xIsNext) {
    ++moves;
    classList.add('x');
    checkGameStatus();
  } else {
    ++moves;
    classList.add('o');
    checkGameStatus();
  }
}

//event listeners
resetDiv.addEventListener('click',handleReset);

for (const cellDiv of cellDivs) {
  cellDiv.addEventListener('click', handleCellClick);
}

