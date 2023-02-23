let players = {
    player1: {
        name: 'Akram',
        token: 'x',
        tokenLocations: [],
        gameStatus: "",
        winCount: 0,
    },
    player2: {
        name: 'Bob',
        token: 'o',
        tokenLocations: [],
        gameStatus: "",
        winCount: 0,
    }
}


let gameConfig = {
    timer: 20,
}

let turnPlayer = 'player1';
let gridCells = document.querySelectorAll('.empty-cell');
let playBtn = document.querySelector('#play');
let playAgainBtn = document.querySelector('#play-again');

let formPopup = document.querySelector('.form-popup');
let p1Name = document.querySelector('.player1-name input');
let p2Name = document.querySelector('.player2-name input');
let gameDuration = document.querySelector('.game-config input');
let cancelBtn = document.querySelector('#cancel');

let infoPara = document.querySelector('.intro p');
let p1Score = document.querySelector('.player1 .score');
let p2Score = document.querySelector('.player2 .score');

function cancelForm() {
    playBtn.style.display = 'block';
    formPopup.style.display = 'none';
    
    // Reset value of input fields
    p1Name.value = "";
    p2Name.value = "";
    
    // Reset selected avatars & tokens
    
    // Reset value of timer
    gameDuration.value = "";
}


function startSession() {
    playBtn.style.display = 'none';
    formPopup.style.display = 'block';

    cancelBtn.addEventListener('click', cancelForm);

    
    // This bit of code will be moved into the "startGame" button click handler
    // for (cell of gridCells) {
        // cell.addEventListener('click', handleCellClick);
    // }
    // infoPara.innerHTML = `${players[turnPlayer].name}'s turn <img src="images/x-img.png" height=17px align-items="center">`;
}


function updateCellHTML(etarget, token) {
    etarget.classList.remove('empty-cell');
    etarget.setAttribute('token',token);
}

function updatePlayerTokens(etarget) {
    players[turnPlayer].tokenLocations.push(Number(etarget.getAttribute('data-cell')));
}

function statusUpdate(turnPlayer /*,gridCells size*/) {
    let winCombinations = [[1,2,3], [1,4,7], [1,5,9], [2,5,8], [3,6,9], [3,5,7], [4,5,6], [7,8,9]];
    let tokenLocations = players[turnPlayer].tokenLocations;
    
    for (comb of winCombinations) { //Checking the player's tokens to establish if they've won and if they have drew
        
        if (tokenLocations.includes(comb[0]) && tokenLocations.includes(comb[1]) && tokenLocations.includes(comb[2])) { //Checking for a win
            players[turnPlayer].gameStatus = 'won';
            infoPara.textContent = `${players[turnPlayer].name} has just won!`;
            gridCells.forEach(finishGame);
            playAgainBtn.style.display = 'flex';
            updatePlayersInfo();
            return 'win';
        }
    }

    if ((document.querySelectorAll('.empty-cell').length === 0) && (players[turnPlayer].gameStatus !== 'won')) { //Checking for a draw 
        players[turnPlayer].gameStatus = 'drew';
        infoPara.textContent = `The game ends in a draw`;
        gridCells.forEach(finishGame);
        playAgainBtn.style.display = 'flex';
        updatePlayersInfo();
        return 'draw';
    }

}

function finishGame(cell) {
    cell.classList.remove('empty-cell');
    cell.style.backgroundColor = 'white';
}

function resetCells(cell) {
    cell.classList.toggle('empty-cell');
    cell.removeAttribute('style');
    if (cell.hasAttribute('token')) {
        cell.removeAttribute('token');
    }

}

function updatePlayersInfo() {
    players.player1.tokenLocations = [];
    players.player2.tokenLocations = [];

    if (players.player1.gameStatus === 'won') {
        players.player1.winCount++;
        players.player1.gameStatus = "";
        p1Score.textContent = players.player1.winCount;


    } else if (players.player2.gameStatus === 'won') {
        players.player2.winCount++;
        players.player2.gameStatus = "";
        p2Score.textContent = players.player2.winCount;
    }
}

function playAgain() {
    playAgainBtn.style.display = 'none';
    gridCells = document.querySelectorAll('.grid div');
    gridCells.forEach(resetCells);

    // Call Fn to get user configs
    
    infoPara.innerHTML = `${players.player1.name}'s turn <img src="images/x-img.png" height=17px align-items="center">`;
}

function handleCellClick(e) {
    if (!e.target.classList.contains("empty-cell")) { // If cell already occupied: return
        return;
    };

    let token = players[turnPlayer].token;
    
    updateCellHTML(e.target, token);
    updatePlayerTokens(e.target);
    let gameStatus = statusUpdate(turnPlayer);
    
    if (gameStatus === 'win' || gameStatus === 'draw') { // If game over: spawns the Play Again button
        playAgainBtn.addEventListener('click', playAgain);
        return;
    }

    if (turnPlayer === 'player1') { // If game not over: Updates the display
        turnPlayer = 'player2';
        infoPara.innerHTML = `${players[turnPlayer].name}'s turn <img src="images/o-img.png" height=17px align-items="center">`;

    } else {
        turnPlayer = 'player1';
        infoPara.innerHTML = `${players[turnPlayer].name}'s turn <img src="images/x-img.png" height=17px align-items="center">`;
    }
}


playBtn.addEventListener('click', startSession);


// gameConfig.grid = Number(prompt('Choose the size of your grid (Enter 3 for 3x3, 4 for 4x4):'));
// If they input 4x4, you'll need to:
// - Create more divs inside the grid, 
// - Modify the # of columns and rows in CSS,
// - Polish its sizing

/* Play function - tie it to the replay button
// function startGame() {
    Get their desired grid size
    Get their turn timer (enforce a max of ~30s)
    Create more divs and update CSS if required
    Initialise all cells - class ="empty-cell", data-cell from 1 to max, no tokens
}
*/

/* Win Function;
// function playerWon(winner) {
    Display a congrats message
    Increase winner's win counter
    Increase winner's streak counter
    Display a play again screen?
} */

/* Draw Function;
// function playerWon() {
    Display a congrats message
    Increase winner's win counter
    Increase winner's streak counter
    Display a play again screen?
} */




/* There will be 9 starting buttons
// Therefore, create a handleClickFn for all 9
// At the start of the Fn:
// - Guard: Return if cell doesn't have "empty-cell" class
// - Check whose turn it is (turnPlayer)
// - Add the token value to cell

// At the end of the Fn:
// - Remove the grid's empty-cell class
// - Check if they won (if so, call win Fn)
// - Check if they drew (if so, call draw Fn)
// - Change the turnPlayer and display it somewhere */



// Receive the empty cells as buttons
// Make two handleCellClick functions, one per player
// They go into their player's object and switch the token to that

// When you click, the grid changes its styling and stores the new token
