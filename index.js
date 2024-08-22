let cells = document.querySelectorAll(".cell")
let currentPlayer = "X";
let nextPlayer = "O";
let resetButton = document.querySelector("#reset")
let winners = [];

let grid = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

//console.log(grid.length);

function messageUpdate(){
 
  let status = solver(grid);
  console.log(status);
  console.log(winners);
  if (status == -1){
    document.querySelector(".message").innerHTML = `It is now ${currentPlayer}'s turn`
  } else if (status.length == 2){
      document.querySelector(".message").innerHTML = `Draw!`
  } else if (status.length == 1){
    document.querySelector(".message").innerHTML = `${status[0]} has won!`
  } else{
    document.querySelector(".message").innerHTML = `No winner`
  }
 
}


function playerMove(){
    //console.log("Hello")
    this.innerHTML = `<span>${currentPlayer}</span>`;
    this.removeEventListener("click", playerMove);
    updateGrid(this);
    togglePlayer();
    messageUpdate();
    
    
}

function togglePlayer(){
    var temp = currentPlayer;
    currentPlayer = nextPlayer;
    nextPlayer = temp;
}

function updateGrid(element){
  row = null;
  if (element.getAttribute("class").includes("row-1")){
    row = grid[0]
  } else if (element.getAttribute("class").includes("row-2")){
    row = grid[1]
  } else {
    row = grid[2]
  }

  if (element.getAttribute("class").includes("col-1")){
    row[0] = currentPlayer;
  } else if (element.getAttribute("class").includes("col-2")){
    row[1] = currentPlayer;
  } else {
    row[2] = currentPlayer;
  }
  //console.log(grid[0]);
  //console.log(grid[1]);
  //console.log(grid[2]);
}

function solver(g){
  for (let i = 0; i < g.length; i++){
    if (g[i].includes(0)){
      return -1;
    }
    
    let first_col = g[i][0];
    let completed = true;
    for (let j = 1; j < g[i].length; j++){
      if(g[i][j] != first_col){
        completed = false;
        break;
      }
    }

    if (completed){
      if (!winners.includes(first_col)){
        winners.push(first_col);
      }
    }
  }


  for (let i = 0; i < g[0].length; i++){
    let first_row = g[0][i];
    let completed = true;
    for(let j = 1; j < g.length; j++){
      if (g[j][i] != first_row){
        completed = false;
        break;
      }
    }
    if (completed){
      if (!winners.includes(first_row)){
        winners.push(first_row);
      }
    }
  }

  //top left to bottom right diagonal
  let first_diag = g[0][0];
  let current_col = 1;
  let completed = true;
  for (let i = 1; i < g.length; i++){
    if (g[i][current_col] != first_diag){
      completed = false;
      break;
    }
    current_col++;
  }

  if (completed){
    if (!winners.includes(first_diag)){
      winners.push(first_diag);
    }
  }

  //bottom left to top right diagonal
  first_diag = g[g.length - 1][0];
  current_col = 1;
  completed = true;
  for (let i = g.length - 2; i >= 0; i--){
    if (g[i][current_col] != first_diag){
      completed = false;
      console.log("**")
      break;
    }
    current_col++;
  }
  
  if (completed){
    if (!winners.includes(first_diag)){
      winners.push(first_diag);
      console.log("*")
    }
  }
  return winners;
}

function reset(){
  winners = [];

  grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  currentPlayer = "X";
  nextPlayer = "O";

  for (var i = 0; i < cells.length; i++){
    cells[i].innerHTML = "";
    cells[i].addEventListener("click", playerMove);
  }

  messageUpdate()
}

messageUpdate()

for (var i = 0; i < cells.length; i++){
    cells[i].addEventListener("click", playerMove);
}

resetButton.addEventListener("click", reset)


