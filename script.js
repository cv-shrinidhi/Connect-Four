//ask player of color and Name

var player1 = prompt("Player 1 : Enter your Name, you will be Blue");
var player1Color = "rgb(86, 151, 255)"

var player2 = prompt("Player 2 : Enter your Name, you will be Red");
var player2Color = "rgb(255, 45, 73)"

var gameOn = true;


//function to change color of button when clicked

function changeColor(rowIndex, colIndex, color) {
  return table.eq(rowIndex).find("td").eq(colIndex).find("button").css("background-color", color);
}


//return the color of button 

function returnColor(rowIndex, colIndex) {
  return table.eq(rowIndex).find("td").eq(colIndex).find("button").css("background-color");
}


//function to find last available button in the column of a particular row

function checkBottom(colIndex) {
  var colorReport = returnColor(5,colIndex);
  for(var row = 4; row>=0; row--) {
    colorReport = returnColor(row, colIndex);
    if (colorReport == "rgb(128, 128, 128)") {
      return row
    }
  }
}


//function to check for 4 consecutive same color buttons 

function colorMatchCheck(one, two, three, four) {
  return (one === four && one === two && three === one && one !== "rgb(128, 128, 128)" && one !== undefined);
}


//function to check horizontal 4 same color buttons

function horizontalWinCheck() {
  for (var row=5; row>=0; row--) {
    for (var col=0; col<7; col++) {
      if (colorMatchCheck(returnColor(row, col),returnColor(row, col+1),returnColor(row, col+2),returnColor(row, col+3))) {
        console.log("horizontal win");
        reportWin(row, col)
        return true;
      }
    }
  }
}


//function to check vertical 4 same color buttons

function verticalWinCheck() {
  for (var row=5; row>=0; row--) {
    for (var col=0; col<7; col++) {
      if (colorMatchCheck(returnColor(row, col),returnColor(row+1, col),returnColor(row+2, col),returnColor(row+3, col))) {
        console.log("vertical win");
        reportWin(row, col)
        return true;
      }
    }
  }
}


//function to check diagonal 4 same color buttons

function diagonalWinCheck() {
  for (var row=5; row>=0; row--) {
    for (var col=0; col<7; col++) {
      if (colorMatchCheck(returnColor(row, col),returnColor(row-1, col+1),returnColor(row-2, col+2),returnColor(row-3, col+3))) {
        console.log("right up going diagonal win");
        reportWin(row, col)
        return true;
      }
      else if (colorMatchCheck(returnColor(row-3, col),returnColor(row-2, col+1),returnColor(row-1, col+2),returnColor(row0, col+3))) {
        console.log("right down going diagonal win");
        reportWin(row, col)
        return true;
      }
    }
  }
}



//GAME LOGIC - start with player 1 

var currentPlayer = 1;
var currentPlayerName = player1;
var currentColor = player1Color;

$("h3").text(player1+", it is your turn, pick a column");

$(".board button").on("click", function() {
  //var columnClicked = this.cellIndex;
  var columnClicked = $(this).closest("td").index();
  //alert("column clicked ="+columnClicked);
  var checkBottom = checkBottom(columnClicked);

  changeColor(checkBottom,columnClicked,currentColor);

  if (horizontalWinCheck || verticalWinCheck || diagonalWinCheck) {
    $("h1").text(currentPlayerName + ", you have won!!");
    $("h2").fadeOut("fast");
    $("h3").fadeOut("fast");
  }

  currentPlayer *= -1;

  if (currentPlayer === 1) {
    currentPlayerName = player1;
    $("h3").text(currentPlayerName+", it is your turn");
    currentColor = player1Color;
  }
  else {
    currentPlayerName = player;
    $("h3").text(currentPlayerName+", it is your turn");
    currentColor = player2Color;
  }
})


