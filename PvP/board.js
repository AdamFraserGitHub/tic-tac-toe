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
var playerClick = function(e) {
  var square = new getSquare(e.clientX, e.clientY);
  if(!square.isTaken) {

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

    checkGameState(board);
  }

  isKnot = !isKnot;
  changePlayer(isKnot)
}

var changePlayer = function(isKnot) {
  if(isKnot) {
    background.style.backgroundColor = 'rgb(0,0,255)';
    playerNameTxt.innerHTML = 'knots';
  } else {
    background.style.backgroundColor = 'rgb(255,0,0)';
    playerNameTxt.innerHTML = 'crosses';
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
  for(var row = 0; row < 3; row++) {
    if(board[row * 3] != 0 && board[row * 3] == board[1 + row * 3] && board[row * 3] == board[2 + row * 3]) {
      alert('gameWon!!!')
    }
  }

  //check collumns
  for(var collumn = 0; collumn < 3; collumn++) {
    if(board[collumn] != 0 && board[collumn] == board[3 + collumn] && board[collumn] == board[6 + collumn]) {
      alert('gameWon!!!')
    }
  }

  //checkDiagonals
  if(board[4] != 0) {
  var player = board[0];
  for(var i = 0; i < 3; i++) {
    if(board[i] != player) {
      d
    }
  }
  }
}

var board = [0,0,0,0,0,0,0,0,0]; //0 - empty, K - knot, C - cross;

changePlayer(isKnot);
