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
      board[square.collumn + square.row * 3] = 'K';

      ctx.fillStyle = 'rgb(0,0,255)';
      ctx.fillRect(square.collumn * scrHeight / 3 + 50,
                   square.row * scrHeight / 3 + 50,
                   scrHeight / 3 - 100, scrHeight / 3 - 100);
    } else {
      board[square.collumn + square.row * 3] = 'C';
      ctx.fillStyle = 'rgb(255,0,0)';
      ctx.fillRect(square.collumn * scrHeight / 3 + 50,
                   square.row * scrHeight / 3 + 50,
                   scrHeight / 3 - 100, scrHeight / 3 - 100);
    }

    if(!checkGameState(board)) {
      isKnot = !isKnot;
      changePlayer(isKnot);
    }

    if (checkDraw(board)) {
      gameEnd('draw');
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

var checkGameState = function(board) {
  //check rows

  if( (board[0] == 'C' && board[1] == 'C' && board[2] == 'C') ||
      (board[3] == 'C' && board[4] == 'C' && board[5] == 'C') ||
      (board[6] == 'C' && board[7] == 'C' && board[8] == 'C') ||

      (board[0] == 'C' && board[3] == 'C' && board[6] == 'C') ||
      (board[1] == 'C' && board[4] == 'C' && board[7] == 'C') ||
      (board[2] == 'C' && board[5] == 'C' && board[8] == 'C') ||

      (board[0] == 'C' && board[4] == 'C' && board[8] == 'C') ||
      (board[2] == 'C' && board[4] == 'C' && board[6] == 'C')) {
        gameEnd(isKnot);
        return true;
      }

      if( (board[0] == 'K' && board[1] == 'K' && board[2] == 'K') ||
          (board[3] == 'K' && board[4] == 'K' && board[5] == 'K') ||
          (board[6] == 'K' && board[7] == 'K' && board[8] == 'K') ||

          (board[0] == 'K' && board[3] == 'K' && board[6] == 'K') ||
          (board[1] == 'K' && board[4] == 'K' && board[7] == 'K') ||
          (board[2] == 'K' && board[5] == 'K' && board[8] == 'K') ||

          (board[0] == 'K' && board[4] == 'K' && board[8] == 'K') ||
          (board[2] == 'K' && board[4] == 'K' && board[6] == 'K')) {
            gameEnd(isKnot);
            return true;
          }

  return false;
}

var checkDraw = function(board) {
    for(var i = 0; i < board.length; i++) {
      if(board[i] == 0) {
        return false;
      }
    }
    return true;
}

var gameEnd = function(state) {
  canvas.style.visibility = "hidden";
  document.getElementsByClassName('playerNameContainer')[0].style.left = "50%";

  if(state == 'draw') {
    background.style.backgroundColor = 'rgb(200,200,200)'
    playerNameTxt.innerHTML = 'draw... BOOOORING!';
  } else if(state) {
    background.style.backgroundColor = 'rgb(0,0,255)'
    playerNameTxt.innerHTML = 'knots won!';
  } else {
    background.style.backgroundColor = 'rgb(255,0,0)';
    playerNameTxt.innerHTML = 'crosses won!';
  }
}

var board = [0,0,0,0,0,0,0,0,0]; //0 - empty, K - knot, C - cross;

changePlayer(isKnot);
