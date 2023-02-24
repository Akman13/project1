let players = {
    player1: {
        name: 'Akram',
        avatar: '',
        token: 'x',
        tokenLocations: [],
        gameStatus: "",
        winCount: 0,
    },
    player2: {
        name: 'Bob',
        avatar: '',
        token: 'o',
        tokenLocations: [],
        gameStatus: "",
        winCount: 0,
    }
}


let gameConfig = {
    timer: 20,
    currentTimer: 0,
    timeID: null,
}

let turnPlayer = 'player1';
let gridCells = document.querySelectorAll('.empty-cell');
let startGameBtn = document.querySelector('#start-game');
let playBtn = document.querySelector('#play');
let playAgainBtn = document.querySelector('#play-again');

let formPopup = document.querySelector('.form-popup');
let p1NameInput = document.querySelector('.player1-name input');
let p2NameInput = document.querySelector('.player2-name input');
let avatarImgs = document.querySelectorAll('.player1-avatar img, .player2-avatar img');
let tokenImgs = document.querySelectorAll('.player1-token img, .player2-token img');
let turnDurationInput = document.querySelector('.game-config input');
let submitBtn = document.querySelector('#submit');
let cancelBtn = document.querySelector('#cancel');

let p1TurnTimer = document.querySelector('.player1-scoreboard .turn-duration');
let p2TurnTimer = document.querySelector('.player2-scoreboard .turn-duration');
let p1Avatar = document.querySelector('.player1-scoreboard .avatar');
let p2Avatar = document.querySelector('.player2-scoreboard .avatar');
let p1Token = document.querySelector('.player1-scoreboard .token img');
let p2Token = document.querySelector('.player2-scoreboard .token img');
let p1NameDisplay = document.querySelector('.player1-scoreboard h1');
let p2NameDisplay = document.querySelector('.player2-scoreboard h1');


let infoPara = document.querySelector('#info');
let warningPara = document.querySelector('.warning');
let p1Score = document.querySelector('.player1-scoreboard .score');
let p2Score = document.querySelector('.player2-scoreboard .score');


function startSession() { // Called if startGameBtn is clicked. Displays the Game Settings window for player inputs
    startGameBtn.style.display = 'none';
    formPopup.style.display = 'block';

    cancelBtn.addEventListener('click', cancelForm);

    for (avatar of avatarImgs) {
        avatar.addEventListener('click', handleAvatarClick);
    }

    for (token of tokenImgs) {
        token.addEventListener('click', handleTokenClick);
    }

    submitBtn.addEventListener('click', submitForm);

}

function handleAvatarClick(e) { // Called from event listener in startSession. Processes the user's avatar selection & updates their Object
    // Establish who the player is
    let playerClick = e.target.dataset.player;

    // Remove the player's .selected-avatar class from all their imgs
    document.querySelectorAll(`.player${playerClick}-avatar img`).forEach((avatar) => {
        avatar.classList.remove('selected-avatar')
    });

    // Adds .selected-avatar class to the clicked avatar image
    e.target.classList.add('selected-avatar');

    // Updates the player's Object 
    players[`player${playerClick}`].avatar = e.target.dataset.avatar;
}

function handleTokenClick(e) { // Called from event listener in startSession. Processes the user's token selection & updates their Object
    // Establish who the player is
    let playerClick = e.target.dataset.player;
    console.log(playerClick);

    // Remove the player's .selected-token class from all their imgs
    document.querySelectorAll(`.player${playerClick}-token img`).forEach((token) => {
        token.classList.remove('selected-token')
    });

    // Adds .selected-token class to the clicked token image
    e.target.classList.add('selected-token');

    // Updates the player's Object 
    players[`player${playerClick}`].token = e.target.dataset.token;
}

function cancelForm() { // Called from event listener in startSession. Resets the user inputs and closes the form
    warningPara.style.visibility = 'hidden';
    startGameBtn.style.display = 'block';
    formPopup.style.display = 'none';
    
    // Reset value of input fields
    p1NameInput.value = "";
    p2NameInput.value = "";
    
    // Reset selected avatars & tokens
    avatarImgs.forEach((avatar) => {
        avatar.classList.remove('selected-avatar')
    });
    
    tokenImgs.forEach((token) => {
        token.classList.remove('selected-token')
    });
    
    // Reset value of timer
    turnDurationInput.value = "";
}

function submitForm() { // Called from event listener in startSession. Verifies user inputs and calls gameSetup
    if (players.player1.token === players.player2.token && turnDurationInput.value <= 0 && (p1NameInput.value.trim() === "" || p2NameInput.value.trim() === "")) {
        warningPara.style.visibility = 'visible';
        warningPara.textContent = "Please fill all the above fields";
        return;
    } else if ((p1NameInput.value.trim() === "" || p2NameInput.value.trim() === "")) {
        warningPara.style.visibility = 'visible';
        warningPara.textContent = "Please enter a name for each player";
        return;
    } else if (players.player1.token === players.player2.token && turnDurationInput.value <= 0) {
        warningPara.style.visibility = 'visible';
        warningPara.textContent = "Please select different tokens and a positive duration";
        return;
    } else if (players.player1.token === players.player2.token) {
        warningPara.style.visibility = 'visible';
        warningPara.textContent = "Please select different tokens";
        return;
    } else if (turnDurationInput.value <= 0) {
        warningPara.style.visibility = 'visible';
        warningPara.textContent = "Please enter a positive duration";
        return;
    }

    players.player1.name = p1NameInput.value;
    players.player2.name = p2NameInput.value;

    warningPara.style.visibility = 'hidden';
    gameConfig.timer = Number(turnDurationInput.value);
    gameConfig.currentTimer = Number(turnDurationInput.value);
    gameSetup();
}

function gameSetup() { // Called from submitForm. Displays the turn timer, a START GAME button
    p1TurnTimer.textContent = gameConfig.timer;
    p1TurnTimer.style.display = 'inline-block';
    
    // Hides the form 
    formPopup.style.display = 'none';
    
    // Spawns the "PLAY" button
    playBtn.style.display = 'inline-block';

    // Change the names of the players
    p1NameDisplay.textContent = players.player1.name;
    p2NameDisplay.textContent = players.player2.name;

    // Update the player's scoreboard tokens and avatars
    displayAvatars();
    displayTokens();

    playBtn.addEventListener('click', startGame);
    
}

function displayAvatars() { // Called from gameSetup. Displays the avatars at each player's scoreboard
    // Display the appropriate avatars via a series of if statements
    if (players.player1.avatar === 'm1') {
        p1Avatar.src = 'images/male1.png';
    } else if (players.player1.avatar === 'f1') {
        p1Avatar.src = 'images/female1.png';
    } else if (players.player1.avatar = 'm2') {
        p1Avatar.src = 'images/male2.png';
    } else if (players.player1.avatar = 'f2') {
        p1Avatar.src = 'images/female2.png';
    }    
    p1Avatar.style.display = 'flex';

    if (players.player2.avatar === 'm1') {
        p2Avatar.src = 'images/male1.png';
    } else if (players.player2.avatar === 'f1') {
        p2Avatar.src = 'images/female1.png';
    } else if (players.player2.avatar = 'm2') {
        p2Avatar.src = 'images/male2.png';
    } else if (players.player2.avatar = 'f2') {
        p2Avatar.src = 'images/female2.png';
    }    
    p2Avatar.style.display = 'flex';
}

function displayTokens() {
    // Display the appropriate tokens via a series of if statements
    if (players.player1.token === 'x') {
        p1Token.src = 'images/x-img.png';
    } else if (players.player1.token === 'o') {
        p1Token.src = 'images/o-img.png';
    } else if (players.player1.token === 'bean') {
        p1Token.src = 'images/bean2.png';
    } else if (players.player1.token === 'cheese') {
        p1Token.src = 'images/cheese2.png';
    } else if (players.player1.token === 'tomato') {
        p1Token.src = 'images/tomato2.png';
    }
    p1Token.style.display = 'flex';

    if (players.player2.token === 'x') {
        p2Token.src = 'images/x-img.png';
    } else if (players.player2.token === 'o') {
        p2Token.src = 'images/o-img.png';
    } else if (players.player2.token === 'bean') {
        p2Token.src = 'images/bean.png';
    } else if (players.player2.token === 'cheese') {
        p2Token.src = 'images/cheese.png';
    } else if (players.player2.token === 'tomato') {
        p2Token.src = 'images/tomato.png';
    }
    p2Token.style.display = 'flex';
}

function startGame() { // Called from gameSetup() and from playAgain(). Creates the event listeners for the grid cells and begins the first round
    playBtn.style.display = 'none';
    for (cell of gridCells) {
        cell.addEventListener('click', handleCellClick);
    }
    
    infoPara.style.display = 'block';
    infoPara.textContent = `${players[turnPlayer].name}'s turn`;

    
    while (!gameConfig.timeID) {
        p1TurnTimer.textContent = `${gameConfig.currentTimer}`;
        
        gameConfig.timeID = setInterval(timer, 1000);
    }
}

function timer() {
    if (turnPlayer === 'player1') {
        
        gameConfig.currentTimer--;
        p1TurnTimer.textContent = `${gameConfig.currentTimer}`;
        
        if (gameConfig.currentTimer === 0 ) {
            console.log('Timer reached 0');
            clearInterval(gameConfig.timeID);
            gameConfig.timeID = null;
            gameConfig.currentTimer = gameConfig.timer;
            switchTurn();
        }

    } else {
        gameConfig.currentTimer--;
        p2TurnTimer.textContent = `${gameConfig.currentTimer}`;
        
        if (gameConfig.currentTimer === 0 ) {
            console.log('Timer reached 0');
            clearInterval(gameConfig.timeID);
            gameConfig.timeID = null;
            gameConfig.currentTimer = gameConfig.timer;
            switchTurn();
        }
    }
}

function updateCellHTML(etarget, token) {
    etarget.classList.remove('empty-cell');
    etarget.setAttribute('token',token);
}

function updatePlayerTokens(etarget) {
    players[turnPlayer].tokenLocations.push(Number(etarget.getAttribute('data-cell')));
}

function statusUpdate(turnPlayer) { // Called from handleCellClick. Checks if the players have won/drawn, calls other functions and returns back to handleCellClick
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
    startGame();
}

function handleCellClick(e) {
    if (!e.target.classList.contains("empty-cell")) { // If cell already occupied: return
        return;
    };

    clearInterval(gameConfig.timeID);
    gameConfig.timeID = null;
    gameConfig.currentTimer = gameConfig.timer;

    let turnToken = players[turnPlayer].token;
    
    updateCellHTML(e.target, turnToken);
    updatePlayerTokens(e.target);
    let gameStatus = statusUpdate(turnPlayer);
    
    if (gameStatus === 'win' || gameStatus === 'draw') { // If game over: spawns the Play Again button
        playAgainBtn.addEventListener('click', playAgain);
        return;
    }

    // Create function to display player's turn + the countdown timer
    switchTurn();
}

function switchTurn() { // Called from startGame (1st round) and from handleCellClick

    // Hide the existing timer & Change turnPlayer to the next player
    if (turnPlayer === 'player1') { 
        p1TurnTimer.style.display = 'none';
        turnPlayer = 'player2';
        infoPara.textContent = `${players[turnPlayer].name}'s turn`;
        p2TurnTimer.style.display = 'inline-block'
        p2TurnTimer.textContent = gameConfig.timer;
    } else {
        p2TurnTimer.style.display = 'none';
        turnPlayer = 'player1';
        infoPara.textContent = `${players[turnPlayer].name}'s turn`;
        p1TurnTimer.style.display = 'inline-block';
        p1TurnTimer.textContent = gameConfig.timer;
    }

    

    // Create a time for the new player. Record its timeID in the config file
    while (!gameConfig.timeID) {
        p1TurnTimer.textContent = `${gameConfig.currentTimer}`;
        gameConfig.timeID = setInterval(timer, 1000);
    }
}

startGameBtn.addEventListener('click', startSession);
