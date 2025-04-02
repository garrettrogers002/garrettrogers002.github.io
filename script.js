// *****************************************************
// minesweeper stuff

let board = [ // 2d array
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

// x = col, y = row

function checkWin() { // this function is not working for some reason
    if (pressedCount === 71) {
        play = false;
        let resultDiv = document.getElementById("resultMS");
        resultDiv.textContent = "You won!!!";
        resultDiv.style.display = "block";
        return true;
    }
    return false;
}


function updatePress(id) {
    id.classList.add("pressed")
    pressedCount+=1; // for some reason when i had it as pressedCount++; the count would get wrong and the player would win prematurely
    console.log("pressed count: " + pressedCount);
    checkWin();
}

const directions = [
    [-1, 1], [0,1],  [1,1],
    [-1, 0],         [1,0],
    [-1,-1], [0,-1], [1,-1]
]
function squareCoords(input) {
    index = input.id - 1;
    row = Math.floor(index / 9);
    col = index % 9;

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
        if (input.textContent !== "F") {
            let coords = squareCoords(input);

            let row = coords[1];
            let col = coords[0];

            coordsToId(coords);
            if (board[col][row] === "M") {
                input.classList.add("bomb");
                document.getElementById("resultMS").textContent = "You lose :o";
                document.getElementById("resultMS").style.display = "block";
                play = false;
            }
            else {
                let mineCount = adjacentMineCount(coords);

                if (mineCount === 0) {
                    revealEmptySquares([col, row]);
                }
                else {
                    if (!input.classList.contains("pressed")) {
                        updatePress(input);
                    }
                    // checkWin(pressedCount);
                    input.textContent = mineCount;
                }
            }
        }
    }
}

function flag(input, event) {;
    if (play) {
        event.preventDefault();

        if (input.classList.contains("pressed")) return false;

        if (input.textContent === "F") {
            input.textContent = "";
            document.getElementById("mineCount").textContent++;
        }
        else {
            input.textContent = "F";

            document.getElementById("mineCount").textContent--;
        }
        return false;
    }
}

function resetGame() {
    play = false;
    pressedCount = 0;
    document.getElementById("parentDiv").querySelectorAll(':scope > *').forEach(child => {
        child.classList.remove("pressed");
        child.classList.remove("bomb");
        child.textContent = "";
    })
    document.getElementById("mineCount").textContent = "10";
    document.getElementById("resultMS").style.display = "block";
    document.getElementById("resultMS").textContent = 'Press "Minesweeper" to start!'

    board = [['','','','','','','','',''],['','','','','','','','',''],['','','','','','','','',''],['','','','','','','','',''],['','','','','','','','',''],['','','','','','','','',''],['','','','','','','','',''],['','','','','','','','',''],['','','','','','','','','']];
}

function startGame() {
    let mines = [];
    resetGame();
    document.getElementById("resultMS").style.display = "none";
    play = true;
    while (mines.length < 10) {
        let randoRow = Math.floor(Math.random() * 9); // y coordinate
        let randoCol = Math.floor(Math.random() * 9); // x coordinate

        if (!(board[randoCol][randoRow] === "M")) {
            mines.push([randoCol, randoRow]);
            board[randoCol][randoRow] = "M";
        }
    }
}
function adjacentMineCount(square) {
    let x = square[0]; // col number
    let y = square[1]; // row number

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

        if (visitedSquares.has(key)) return;
        visitedSquares.add(key);

        let squareId = coordsToId([x,y]);
        let squareDiv = document.getElementById(squareId);

        if (squareDiv.textContent === "F") return;

        if (!squareDiv.classList.contains("pressed")) {
            updatePress(squareDiv);
        }

        let mineCount = adjacentMineCount([x,y]);

        if (mineCount > 0) {
            squareDiv.textContent = mineCount;
            return;
        }

        for ( let direction of directions) {
            let newX = x + direction[0];
            let newY = y + direction[1];

            recursivePart(newX,newY);
        }
    }
    recursivePart(col, row);
}
// end of minesweeper code
// *************************************************



// ************************************************
// tic tac toe code

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
  
  var div1color = document.getElementById("g1");
  
  var resultTTT = document.getElementById("resultTTT");
  
  if (div1.textContent !== "" && div1.textContent === div2.textContent && div2.textContent === div3.textContent) {
  resultTTT.textContent = div1.textContent + " Wins!";
  liveGame = false;
  
  div1.className = "newblank";
  div2.className = "newblank";
  div3.className = "newblank";
  
  return true;
  }
  else if (div4.textContent !== "" && div4.textContent === div5.textContent && div5.textContent === div6.textContent) {
    	resultTTT.textContent = div4.textContent + " Wins!";
      liveGame = false;
      
      div4.className = "newblank";
      div5.className = "newblank";
      div6.className = "newblank"
      
      return true;
  }
  else if (div7.textContent !== "" && div7.textContent === div8.textContent && div8.textContent === div9.textContent) {
    	resultTTT.textContent = div7.textContent + " Wins!";
      liveGame = false;
      
      div7.className = "newblank";
      div8.className = "newblank";
      div9.className = "newblank";
      
      return true;
  }
  else if (div1.textContent !== "" && div1.textContent === div4.textContent && div4.textContent === div7.textContent) {
    	resultTTT.textContent = div1.textContent + " Wins!";
      liveGame = false;
      
      div1.className = "newblank";
      div4.className = "newblank";
      div7.className = "newblank";
      
      return true;
  }
  else if (div2.textContent !== "" && div2.textContent === div5.textContent && div5.textContent === div8.textContent) {
    	resultTTT.textContent = div2.textContent + " Wins!";
      liveGame = false;
      
      div2.className = "newblank";
      div5.className = "newblank";
      div8.className = "newblank";
      
      return true;
  }
  else if (div3.textContent !== "" && div3.textContent === div6.textContent && div6.textContent === div9.textContent) {
    	resultTTT.textContent = div3.textContent + " Wins!";
      liveGame = false;
      
      div3.className = "newblank";
      div6.className = "newblank";
      div9.className = "newblank";
      
      return true;
  }
  else if (div1.textContent !== "" && div1.textContent === div5.textContent && div5.textContent === div9.textContent) {
    	resultTTT.textContent = div1.textContent + " Wins!";
      liveGame = false;
      
      div1.className = "newblank";
      div5.className = "newblank";
      div9.className = "newblank";
      
      return true;
  }
  else if (div3.textContent !== "" && div3.textContent === div5.textContent && div5.textContent === div7.textContent) {
    	resultTTT.textContent = div3.textContent + " Wins!";
      liveGame = false;
      
      div3.className = "newblank";
      div5.className = "newblank";
      div7.className = "newblank";
      
      return true;
  }
  
}

function checkTie() {
	var div1 = document.getElementById("g1");
  var div2 = document.getElementById("g2");
  var div3 = document.getElementById("g3");
  var div4 = document.getElementById("g4");
  var div5 = document.getElementById("g5");
  var div6 = document.getElementById("g6");
  var div7 = document.getElementById("g7");
  var div8 = document.getElementById("g8");
  var div9 = document.getElementById("g9");
  
  var content1 = div1.textContent;
  var content2 = div2.textContent;
  var content3 = div3.textContent;
  var content4 = div4.textContent;
  var content5 = div5.textContent;
  var content6 = div6.textContent;
  var content7 = div7.textContent;
  var content8 = div8.textContent;
  var content9 = div9.textContent;
  
  var resultTTT = document.getElementById("resultTTT");
  
  if (content1 !== "" && content2 !== "" && content3 !== "" && content4 !== "" && content5 !== "" && content6 !== "" && content7 !== "" && content8 !== "" && content9 !== "") {
  	liveGame = false;
    resultTTT.textContent = "Cat got the game";
    resultTTT.className = "tie";
    
    div1.className = "tieblank";
    div2.className = "tieblank";
    div3.className = "tieblank";
    div4.className = "tieblank";
    div5.className = "tieblank";
    div6.className = "tieblank";
    div7.className = "tieblank";
    div8.className = "tieblank";
    div9.className = "tieblank";
  }
}

function isEmpty(boxID) {
	var box = document.getElementById(boxID).textContent;
  if (box === "") {
  	return true;
  }
  else {
  return false;
  }
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
    	if (checkWin()) {
      	return true;
      }
      else {
      	checkTie();
      }
    	turns++;
  	}
  }
}

function reset() {
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
  
  div1.textContent = "";
  div2.textContent = "";
  div3.textContent = "";
  div4.textContent = "";
  div5.textContent = "";
  div6.textContent = "";
  div7.textContent = "";
  div8.textContent = "";
  div9.textContent = "";
  
  div1.className = "blank";
  div2.className = "blank";
  div3.className = "blank";
  div4.className = "blank";
  div5.className = "blank";
  div6.className = "blank";
  div7.className = "blank";
  div8.className = "blank";
  div9.className = "blank";
  
  resultTTT.textContent = "";
  
  
  liveGame = true;
  
  turns = 0;
}


// function sleep(miliseconds) {
//    var currentTime = new Date().getTime();

//    while (currentTime + miliseconds >= new Date().getTime()) {
//    }
// }

// end of tic tac toe code
// **********************************************************************


// ***********************************************************************
// SHOW AND HIDE STUFF GOING ON HERE
function showTTT() {
    let tictactoe = document.getElementById("tictactoe");
    let minesweeper = document.getElementById("playableArea");
    let fun = document.getElementById("FUNNContent");

    tictactoe.style.display = "flex";
    minesweeper.style.display = "none";
    fun.style.display = "none";
    document.getElementById("homestuff").style.display = "none";

    document.getElementById("TTTButton").classList.add("active");
    document.getElementById("MSButton").classList.remove("active");
    document.getElementById("FUNN").classList.remove("active");
}

function showMS() {
    let playableArea = document.getElementById("playableArea");
    let tictactoe = document.getElementById("tictactoe");
    let fun = document.getElementById("FUNNContent");

    document.getElementById("TTTButton").classList.remove("active");
    document.getElementById("MSButton").classList.add("active");
    document.getElementById("FUNN").classList.remove("active");

    playableArea.style.display = "flex";
    tictactoe.style.display = "none";
    fun.style.display = "none";
    document.getElementById("homestuff").style.display = "none";

}
// function activeTab(input) {
//     if (!(input.classList.contains = "active")) {
//         input.classList.add(active)
//     }
// }

function showFUNN() {
    let fun = document.getElementById("FUNNContent");
    let ms = document.getElementById("playableArea");
    let ttt = document.getElementById("tictactoe")

    fun.style.display = "flex";
    ms.style.display = "none";
    ttt.style.display = "none";
    document.getElementById("homestuff").style.display = "none";

    document.getElementById("FUNN").classList.add("active");
    document.getElementById("TTTButton").classList.remove("active");
    document.getElementById("MSButton").classList.remove("active");

}
function showHome() {
    let fun = document.getElementById("FUNNContent");
    let ms = document.getElementById("playableArea");
    let ttt = document.getElementById("tictactoe");
    let home = document.getElementById("homestuff");

    fun.style.display = "none";
    ms.style.display = "none";
    ttt.style.display = "none"
    home.style.display = "flex"

    document.getElementById("TTTButton").classList.remove("active");
    document.getElementById("MSButton").classList.remove("active");
    document.getElementById("FUNN").classList.remove("active");
}