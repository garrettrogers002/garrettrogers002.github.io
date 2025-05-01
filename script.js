// *****************************************************
// General Section Display Logic

function hideAllSections() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
}

function showSection(sectionId) {
    hideAllSections(); 
    const section = document.getElementById(sectionId); 


    if (section) {
        let displayType; 


        if (sectionId === 'playableArea' || sectionId === 'tictactoe') {
            displayType = 'flex'; 
        } else {
            displayType = 'block'; 
        }


        section.style.display = displayType;
    }
}

function showHome() {
    showSection('homeSection');
}

function showAboutMe() {
    showSection('aboutMeSection');
}

function showBooks() {
    showSection('booksSection');
}

function showFun() {
    showSection('funSection');
}

function showMS() {
    showSection('playableArea');
}

function showTTT() {
    showSection('tictactoe');
}

// *****************************************************
// Minesweeper Stuff

let board = [
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','','']
];

let pressedCount = 0;
let play = false;

function checkWinMS() {
    if (pressedCount === 71) {
        play = false;
        document.getElementById("resultMS").textContent = "You won!!!";
        document.getElementById("resultMS").style.display = "block";
    }
}

function updatePress(id) {
    if (!id.classList.contains("pressed")) {
        id.classList.add("pressed");
        pressedCount++;
        // console.log("pressed count: " + pressedCount); // Original log removed as requested
        checkWinMS();
    }
}

const directions = [
    [-1, 1], [0,1],  [1,1],
    [-1, 0],         [1,0],
    [-1,-1], [0,-1], [1,-1]
];

function squareCoords(input) {
    let index = parseInt(input.id) - 1;
    let row = Math.floor(index / 9);
    let col = index % 9;
    return [col, row];
}

function coordsToId(coords) {
    let col = coords[0];
    let row = coords[1];
    let id = (row * 9) + col + 1;
    return id.toString();
}

function press(input) {
    if (play) {
        if (input.textContent === "F" || input.classList.contains("pressed")) {
            return;
        }

        let coords = squareCoords(input);
        let row = coords[1];
        let col = coords[0];

        if (board[col][row] === "M") {
            input.classList.add("bomb");
            document.getElementById("resultMS").textContent = "You lose :o";
            document.getElementById("resultMS").style.display = "block";
            play = false;
        } else {
            let mineCount = adjacentMineCount(coords);
            if (mineCount === 0) {
                revealEmptySquares([col, row]);
            } else {
                input.textContent = mineCount;
                updatePress(input);
            }
        }
    }
}

function flag(input, event) {
    event.preventDefault();

    if (play) {
        if (input.classList.contains("pressed")) return false;

        const mineCountDisplay = document.getElementById("mineCount");
        let currentMineCount = parseInt(mineCountDisplay.textContent);

        if (input.textContent === "F") {
            input.textContent = "";
            mineCountDisplay.textContent = currentMineCount + 1;
        } else {
            input.textContent = "F";
            mineCountDisplay.textContent = currentMineCount - 1;
        }
    }
    return false;
}

function resetGame() {
    play = false;
    pressedCount = 0;

    document.getElementById("parentDiv").querySelectorAll('.square').forEach(child => {
        child.classList.remove("pressed", "bomb");
        child.textContent = "";
    });

    document.getElementById("mineCount").textContent = "10";
    document.getElementById("resultMS").style.display = "block";
    document.getElementById("resultMS").textContent = 'Press "Minesweeper" to start!';

    board = [['','','','','','','','',''],['','','','','','','','',''],['','','','','','','','',''],['','','','','','','','',''],['','','','','','','','',''],['','','','','','','','',''],['','','','','','','','',''],['','','','','','','','',''],['','','','','','','','','']];}

function startGame() {
    resetGame();
    document.getElementById("resultMS").style.display = "none";
    play = true;

    let minesPlaced = 0;
    while (minesPlaced < 10) {
        let randoRow = Math.floor(Math.random() * 9);
        let randoCol = Math.floor(Math.random() * 9);

        if (board[randoCol][randoRow] !== "M") {
            board[randoCol][randoRow] = "M";
            minesPlaced++;
        }
    }
}

function adjacentMineCount(square) {
    let x = square[0];
    let y = square[1];
    let adjMineCount = 0;

    for (let adjSquare of directions) {
        let newX = x + adjSquare[0];
        let newY = y + adjSquare[1];

        if (newX >= 0 && newX < 9 && newY >= 0 && newY < 9) {
            if (board[newX][newY] === "M") {
                adjMineCount++;
            }
        }
    }
    return adjMineCount;
}

function revealEmptySquares(square) {
    let col = square[0];
    let row = square[1];

    let visitedSquares = new Set();

    function recursivePart(x, y) {
        if (x < 0 || y < 0 || x > 8 || y > 8) return;

        let key = x + "," + y;

        let squareId = coordsToId([x, y]);
        let squareDiv = document.getElementById(squareId);

        if (!squareDiv || visitedSquares.has(key) || squareDiv.textContent === "F" || squareDiv.classList.contains("pressed")) {
             return;
        }

        visitedSquares.add(key);

        updatePress(squareDiv);

        let mineCount = adjacentMineCount([x, y]);

        if (mineCount > 0) {
            squareDiv.textContent = mineCount;
            return;
        }

        for (let direction of directions) {
            recursivePart(x + direction[0], y + direction[1]);
        }
    }

    recursivePart(col, row);
}

// ************************************************
// Tic Tac Toe code

var turns = 0;
var liveGame = true;

function checkWin() {
    var div1 = document.getElementById("g1");
    var div2 = document.getElementById("g2");
    var div3 = document.getElementById("g3");
    var div4 = document.getElementById("g4");
    var div5 = document.getElementById("g5");
    var div6 = document.getElementById("g6");
    var div7 = document.getElementById("g7");
    var div8 = document.getElementById("g8");
    var div9 = document.getElementById("g9");

    var resultTTT = document.getElementById("resultTTT");

    if (div1.textContent !== "" && div1.textContent === div2.textContent && div2.textContent === div3.textContent) {
        resultTTT.textContent = div1.textContent + " Wins!"; liveGame = false; div1.className = "newblank"; div2.className = "newblank"; div3.className = "newblank"; return true;
    }
    if (div4.textContent !== "" && div4.textContent === div5.textContent && div5.textContent === div6.textContent) {
        resultTTT.textContent = div4.textContent + " Wins!"; liveGame = false; div4.className = "newblank"; div5.className = "newblank"; div6.className = "newblank"; return true;
    }
    if (div7.textContent !== "" && div7.textContent === div8.textContent && div8.textContent === div9.textContent) {
        resultTTT.textContent = div7.textContent + " Wins!"; liveGame = false; div7.className = "newblank"; div8.className = "newblank"; div9.className = "newblank"; return true;
    }
    if (div1.textContent !== "" && div1.textContent === div4.textContent && div4.textContent === div7.textContent) {
        resultTTT.textContent = div1.textContent + " Wins!"; liveGame = false; div1.className = "newblank"; div4.className = "newblank"; div7.className = "newblank"; return true;
    }
    if (div2.textContent !== "" && div2.textContent === div5.textContent && div5.textContent === div8.textContent) {
        resultTTT.textContent = div2.textContent + " Wins!"; liveGame = false; div2.className = "newblank"; div5.className = "newblank"; div8.className = "newblank"; return true;
    }
    if (div3.textContent !== "" && div3.textContent === div6.textContent && div6.textContent === div9.textContent) {
        resultTTT.textContent = div3.textContent + " Wins!"; liveGame = false; div3.className = "newblank"; div6.className = "newblank"; div9.className = "newblank"; return true;
    }
    if (div1.textContent !== "" && div1.textContent === div5.textContent && div5.textContent === div9.textContent) {
        resultTTT.textContent = div1.textContent + " Wins!"; liveGame = false; div1.className = "newblank"; div5.className = "newblank"; div9.className = "newblank"; return true;
    }
    if (div3.textContent !== "" && div3.textContent === div5.textContent && div5.textContent === div7.textContent) {
        resultTTT.textContent = div3.textContent + " Wins!"; liveGame = false; div3.className = "newblank"; div5.className = "newblank"; div7.className = "newblank"; return true;
    }

    return false;
}

function checkTie() {
    if (liveGame) {
        var div1 = document.getElementById("g1");
        var div2 = document.getElementById("g2");
        var div3 = document.getElementById("g3");
        var div4 = document.getElementById("g4");
        var div5 = document.getElementById("g5");
        var div6 = document.getElementById("g6");
        var div7 = document.getElementById("g7");
        var div8 = document.getElementById("g8");
        var div9 = document.getElementById("g9");

        var resultTTT = document.getElementById("resultTTT");

        if (div1.textContent !== "" && div2.textContent !== "" && div3.textContent !== "" &&
            div4.textContent !== "" && div5.textContent !== "" && div6.textContent !== "" &&
            div7.textContent !== "" && div8.textContent !== "" && div9.textContent !== "") {

            liveGame = false;
            resultTTT.textContent = "Cat got the game";
            resultTTT.className = "resultTTT tie";

            div1.className = "tieblank"; div2.className = "tieblank"; div3.className = "tieblank";
            div4.className = "tieblank"; div5.className = "tieblank"; div6.className = "tieblank";
            div7.className = "tieblank"; div8.className = "tieblank"; div9.className = "tieblank";
            return true;
        }
    }
     return false;
}

function isEmpty(boxID) {
	var box = document.getElementById(boxID).textContent;
    return box === "";
}

function fillBox(boxID) {
	if (liveGame) {
		var box = document.getElementById(boxID);
		if (isEmpty(boxID)) {
            if (turns % 2 === 0) {
                box.textContent = "X";
            }
            else {
                box.textContent = "O";
            }
            turns++;

            if (!checkWin()) {
                checkTie();
            }
    	}
  	}
}

function resetTTT() {
	var div1 = document.getElementById("g1");
    var div2 = document.getElementById("g2");
    var div3 = document.getElementById("g3");
    var div4 = document.getElementById("g4");
    var div5 = document.getElementById("g5");
    var div6 = document.getElementById("g6");
    var div7 = document.getElementById("g7");
    var div8 = document.getElementById("g8");
    var div9 = document.getElementById("g9");

    var resultTTT = document.getElementById("resultTTT");

    div1.textContent = ""; div2.textContent = ""; div3.textContent = "";
    div4.textContent = ""; div5.textContent = ""; div6.textContent = "";
    div7.textContent = ""; div8.textContent = ""; div9.textContent = "";

    div1.className = "blank"; div2.className = "blank"; div3.className = "blank";
    div4.className = "blank"; div5.className = "blank"; div6.className = "blank";
    div7.className = "blank"; div8.className = "blank"; div9.className = "blank";

    resultTTT.textContent = "";
    resultTTT.className = "resultTTT";

    liveGame = true;
    turns = 0;
}