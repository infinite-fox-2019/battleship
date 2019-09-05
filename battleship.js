// Your code here
console.log(playGame(process.argv.slice(2))) 

function initBoard() {
  const indexAtas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const indexKiri = "ABCDEFGHIJ";
  let board = [];
  for (let i = 0; i < 11; i++) {
    let temp = [];
    for (let j = 0; j < 11; j++) {
      if (i === 0 && j > 0) {
        temp.push(indexAtas[j - 1]);
      } else if (i > 0 && j === 0) {
        temp.push(indexKiri[i - 1]);
      } else {
        temp.push(" ");
      }
    }
    board.push(temp);
  }
  return board;
}

function shipGenerator(num){
  let koordinatLength = []
  let indexRandomStart = [Math.round(Math.random() * 10) + 1,Math.round(Math.random() * 10) + 1];
  if (Math.floor(Math.random() * 2) % 2 == 0) {
    koordinatLength.push(indexRandomStart)
    for (let i = indexRandomStart[1]+1 ; i < indexRandomStart[1]+num+1; i++){
      koordinatLength.push([indexRandomStart[0],i])
    }

  } else {
    koordinatLength.push(indexRandomStart)
    for (let i = indexRandomStart[0]+1 ; i < indexRandomStart[0]+num+1; i++){
      koordinatLength.push([i,indexRandomStart[1]])
    }
  }
  let check = false
  for (i=0;i<koordinatLength.length;i++){
    if (koordinatLength[i][0] > 10 || koordinatLength[i][1] > 10){
      check = false
    } else {
      check = true
    }
  }
  if (!check){
    return shipGenerator(num)
  } else {
    switch (num) {
      case 4:
        return {koordinat : koordinatLength};
        break;
      case 3:
        return {koordinat : koordinatLength};
        break;
      case 2:
        return {koordinat : koordinatLength};
        break;
      case 1:
        return {koordinat : koordinatLength};
        break;
    }
  }
}


function checkingShip(){
  let ship = {
    "aircarry" : shipGenerator(4),
    "battleship" : shipGenerator(3),
    "cruiser" : shipGenerator(2),
    "destroyer" : shipGenerator(1)
  }
  let totalKoor = []
  let totalKoorJoin = []

  for (length in ship){
    for (let i = 0; i < ship[length].koordinat.length;i++){
      totalKoor.push(ship[length].koordinat[i])
    }
  }
  for (let i = 0; i < totalKoor.length; i++){
    totalKoorJoin.push(totalKoor[i].join())
  }
  let check = true
  for (let i = 0; i< totalKoorJoin.length;i++){
    let base = totalKoorJoin[i]
    for (let j = i+1; j< totalKoorJoin.length;j++){
      if (base === totalKoorJoin[j]){
        check = false
      }
    }
  }
  if (!check){
    return checkingShip()
  } else {
    return ship;
  }
}


function boardReady(){
  let totalKoor = []
  let board = initBoard()
  let ship = checkingShip()
  for (length in ship){
    for (let i = 0; i < ship[length].koordinat.length;i++){
      totalKoor.push(ship[length].koordinat[i])
    }
  }
  for (let k=0;k<totalKoor.length;k++){
    for (let i = 0; i< board.length;i++){
      for (let j = 0; j< board[i].length; j++){
        if (totalKoor[k][0] === i && totalKoor[k][1] === j){
          board[i][j] = "O"
        }
      }
    }
  }
  return board;
}



function playGame(arr){
  let game = boardReady()
  let indexGame = "ABCDEFGHIJ"
  let tembak = []
  let miss = 0
  let hit = 0
  for (let i=0;i<arr.length;i++){
    for (let j = 0; j< indexGame.length; j++ ){
      if (arr[i][0] === indexGame[j]){
        tembak.push([j+1,Number(arr[i].slice(1))])
      }
    }
  }
  for (let i = 0; i< tembak.length;i++){
    for (let j = 0; j< game.length;j++){
      for (let k = 0; k< game[j].length;k++){
        if (j==tembak[i][0] && k==tembak[i][1]){
          if (game[j][k] === " "){
            game[j][k] = "/"
            miss++
          } else {
            game[j][k] = "X"
            hit++
          }
        }
      }
    }
  }
  
  console.log(game)
  return `Jumlah hit anda adalah ${hit} dan miss anda adalah ${miss}`
}
