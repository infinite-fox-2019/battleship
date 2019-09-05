// Fungsi untuk print board
function printBoard(){
  let huruf = ' abcdefghij'.toLocaleUpperCase()
  let board = [[' ', '1','2','3','4','5','6','7','8','9','10']]
  for(let i = 1; i < 11; i++){
    board.push([]);
    for(let j = 0; j < 11; j++){
      board[i].push(' ');
    }
    board[i][0] = huruf[i];
  }
  return board;
}

// Generate boardnya
let board = printBoard()

// Data kapal
let ship = {
  aircraft : {
    name : 'aircraft',
    size : 5,
    mark : 'A',
    kenaTembak : 0,
    nyawaSisa : 5
  },
  battleship : {
    name : 'battleship',
    size : 4,
    mark : 'B',
    kenaTembak : 0,
    nyawaSisa : 4
  },
  cruiser : {
    name : 'cruiser',
    size : 3,
    mark : 'C',
    kenaTembak : 0,
    nyawaSisa : 3
  },
  destroyer : {
    name : 'destroyer',
    size : 2,
    mark : 'D',
    kenaTembak : 0,
    nyawaSisa : 2
  },
}

function randomShip(arr,ship){
  
  let size = ship.size;
  let mark = ship.mark;

  let start = Math.ceil(Math.random()*9);
  let col = Math.ceil(Math.random()*9)
  let arah =  Math.round(Math.random())

  // Generate Kordinat
  let kordinat = [];
  if(arah){
    for(let i = start; i < start+size; i++){
      if(i > 10){
        return randomShip(arr,ship);
      }
      else{
        kordinat.push([col,i]);
      }
    }
  }
  else {
    for(let i = start; i < start+size; i++){
      if(i > 10){
        return randomShip(arr,ship);
      }
      else{
        kordinat.push([i,col]);
      }
    }
  }

  // Cek apakah ada kapal lain
  for(let i = 0; i < kordinat.length; i++){
    if(board[kordinat[i][0]][kordinat[i][1]] != ' '){
      return randomShip(arr, ship)
    }
  }

  // Cetak ke board
  for(let i = 0; i < kordinat.length; i++){
    board[kordinat[i][0]][kordinat[i][1]] = mark;
  }
  return arr;
}

randomShip(board,ship.aircraft)
randomShip(board,ship.battleship)
randomShip(board,ship.cruiser)
randomShip(board,ship.destroyer)

function converter(str){
  let arr = str.split('')
  let row;
  let col = Number(arr[1])

  switch(arr[0]){
    case 'A' : 
      row = 1;
      break;
    case 'B' : 
      row = 2;
      break;
    case 'C' : 
      row = 3;
      break;
    case 'D' : 
      row = 4;
      break;
    case 'E' : 
      row = 5;
      break;
    case 'F' : 
      row = 6;
      break;
    case 'G' : 
      row = 7;
      break;
    case 'H' : 
      row = 8;
      break;
    case 'I' : 
      row = 9;
      break;
    case 'J' : 
      row = 10;
      break;
  }

  return {x : row, y : col}

}

let tembak = process.argv.slice(2);

// Melakukan perhitungan
for(let i = 0; i < tembak.length; i++){
  let indeksTembak = converter(tembak[i]);
  let row = indeksTembak.x;
  let col = indeksTembak.y;
  if(board[row][col] == 'A'){
    board[row][col] = 'X'
    ship.aircraft.nyawaSisa--
    ship.aircraft.kenaTembak++
  }
  else if(board[row][col] == 'B'){
    board[row][col] = 'X'
    ship.battleship.nyawaSisa--
    ship.battleship.kenaTembak++
  }
  else if(board[row][col] == 'C'){
    board[row][col] = 'X'
    ship.cruiser.nyawaSisa--
    ship.cruiser.kenaTembak++
  }
  else if(board[row][col] == 'D'){
    board[row][col] = 'X'
    ship.destroyer.nyawaSisa--
    ship.destroyer.kenaTembak++
  }
  else{
    board[row][col] = '/'
  }
}

if(tembak.length == 0){
  console.log('Anda belum menembak')
}
else{
  console.table(board);
  console.log('Aircraft   = miss : ' + ship.aircraft.nyawaSisa + ' hit = ' + ship.aircraft.kenaTembak)
  console.log('Battleship = miss : ' + ship.battleship.nyawaSisa + ' hit = ' + ship.battleship.kenaTembak)
  console.log('Cruiser    = miss : ' + ship.cruiser.nyawaSisa + ' hit = ' + ship.cruiser.kenaTembak)
  console.log('Destroyer  = miss : ' + ship.destroyer.nyawaSisa + ' hit = ' + ship.destroyer.kenaTembak)
}