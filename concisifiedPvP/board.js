var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var background = document.getElementById('background');
var playerNameTxt = document.getElementById('playerName');

var scrWidth = window.innerHeight;
var scrHeight = window.innerHeight;

canvas.width = scrHeight;
canvas.height = scrHeight;
canvas.style.position = 'absolute';
var xOffset = Math.round(scrHeight / 2);
canvas.style.left = xOffset + 'px';

ctx.lineWidth = 10;
for(var i = 1/3; i < 1; i+=1/3) {
  ctx.beginPath();
    ctx.moveTo(scrHeight * i, 0);
    ctx.lineTo(scrHeight * i, scrHeight);
    ctx.stroke();
  ctx.closePath();
}

for(var i = 1/3; i < 1; i+=1/3) {
  ctx.beginPath();
    ctx.moveTo(scrHeight, scrHeight * i);
    ctx.lineTo(0, scrHeight * i);
    ctx.stroke();
  ctx.closePath();
}

ctx.beginPath();
  ctx.rect(5,5,scrHeight - 10,scrHeight - 10);
  ctx.stroke();
ctx.closePath();

var isKnot = true;
var gameWon = false;
var playerClick = function(e) {
  var square = new getSquare(e.clientX, e.clientY);
  if(!square.isTaken && !gameWon) {

    if(isKnot) {
      board[square.collumn + square.row * 3] = 'O';

      ctx.fillStyle = 'rgb(0,0,255)';
      ctx.fillRect(square.collumn * scrHeight / 3 + 50,
                   square.row * scrHeight / 3 + 50,
                   scrHeight / 3 - 100, scrHeight / 3 - 100);
    } else {
      board[square.collumn + square.row * 3] = 'X';
      ctx.fillStyle = 'rgb(255,0,0)';
      ctx.fillRect(square.collumn * scrHeight / 3 + 50,
                   square.row * scrHeight / 3 + 50,
                   scrHeight / 3 - 100, scrHeight / 3 - 100);
    }

    if(getState(board) == 0) {
      isKnot = !isKnot;
      changePlayer(isKnot);
    }
  }

}

var changePlayer = function(isKnot) {
  if(isKnot) {
    background.style.backgroundColor = 'rgb(0,0,255)';
    playerNameTxt.innerHTML = 'knots';
  } else {
    background.style.backgroundColor = 'rgb(255,0,0)';
    playerNameTxt.innerHTML = 'crosses';true
  }
}

var getSquare = function(x,y) {
  this.row = getRowOrColumn(y, 1/3 * scrHeight);     //get row
  this.collumn = getRowOrColumn(x - xOffset, 1/3 * scrHeight); //get collumn

  if(board[this.collumn + this.row * 3] != 0 ) {
    this.isTaken = true;
  } else {
    this.isTaken = false;
  }
}

var getRowOrColumn = function(axisValue, itteration) {
  if(axisValue < itteration) {
    return 0;
    //division 1
  } else if(axisValue < 2*itteration) {
    return 1
    //division 2
  } else {
    return 2;
    //division 3
  }
}

var gameEnd = function(state) {
  canvas.style.visibility = "hidden";
  document.getElementsByClassName('playerNameContainer')[0].style.left = "50%";

  if(state == 'D') {
    background.style.backgroundColor = 'rgb(200,200,200)'
    playerNameTxt.innerHTML = 'draw... BOOOORING!';
  } else if(state = 'O') {
    background.style.backgroundColor = 'rgb(0,0,255)'
    playerNameTxt.innerHTML = 'knots won!';
  } else if(state = 'X') {
    background.style.backgroundColor = 'rgb(255,0,0)';
    playerNameTxt.innerHTML = 'crosses won!';
  }
}


var getState = function(board) {
  var winner = 0;

  //check X won
  if( (board[0] == 'X' && board[1] == 'X' && board[2] == 'X') ||
      (board[3] == 'X' && board[4] == 'X' && board[5] == 'X') ||
      (board[6] == 'X' && board[7] == 'X' && board[8] == 'X') ||

      (board[0] == 'X' && board[3] == 'X' && board[6] == 'X') ||
      (board[1] == 'X' && board[4] == 'X' && board[7] == 'X') ||
      (board[2] == 'X' && board[5] == 'X' && board[8] == 'X') ||

      (board[0] == 'X' && board[4] == 'X' && board[8] == 'X') ||
      (board[2] == 'X' && board[4] == 'X' && board[6] == 'X')) {
        winner = 'X';
      }

  //check O won
  if( winner == 0 && ((board[0] == 'O' && board[1] == 'O' && board[2] == 'O') ||
      (board[3] == 'O' && board[4] == 'O' && board[5] == 'O') ||
      (board[6] == 'O' && board[7] == 'O' && board[8] == 'O') ||

      (board[0] == 'O' && board[3] == 'O' && board[6] == 'O') ||
      (board[1] == 'O' && board[4] == 'O' && board[7] == 'O') ||
      (board[2] == 'O' && board[5] == 'O' && board[8] == 'O') ||

      (board[0] == 'O' && board[4] == 'O' && board[8] == 'O') ||
      (board[2] == 'O' && board[4] == 'O' && board[6] == 'O'))) {
        winner = 'O';
      }

  //check draw
  if(winner == 0) {
    var draw = true;
    for(var i = 0; i < board.length; i++) {
      if(board[i] == 0) {
        draw = false;
      }
    }
    if(draw) {
      winner = 'D'
    }
  }

  if(winner != 0) {
    gameEnd(winner);
  }

  return winner;
}

var board = [0,0,0,0,0,0,0,0,0]; //0 - empty, K - knot, C - cross;

changePlayer(isKnot);
