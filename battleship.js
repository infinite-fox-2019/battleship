// Your code here
/* 
  Rizkyich BattleShip  
  Input : node battleship.js <coordinateBomb1> <coordinateBomb2> .... <coordinateBomb(n)>
  example : node battleship.js A3 B7 C6 J8 H4
*/
const bomb = process.argv.slice(2)

let infoShip = [
  {
    name: 'Aircraft Carrier',
    code: 'A',
    size: 5,
    placement: []
  },
  {
    name: 'Battleship',
    code: 'B',
    size: 4,
    placement: []
  },
  {
    name: 'Cruiser',
    code: 'C',
    size: 3,
    placement: []
  },
  {
    name: 'Destroyer',
    code: 'D',
    size: 2,
    placement: []
  }
]


const startGame = () => {
  let shipPos = shipPlacement()
  let board = emptyBoard()
  for (let i = 0; i < shipPos.length; i++) {
    for (let j in shipPos[i].placement) {
      let x = shipPos[i].placement[j][0]
      let y = shipPos[i].placement[j][1]
      board[x][y] = shipPos[i].code
    }
  }
  console.log(`##| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10|`)
  for (let j = 0; j < board.length; j++) {
    console.log(board[j].join(' | '))
  }
  return validBomb(board, bomb, shipPos)
}

const validBomb = (board, bomb, shipPlacement) => {
  let bullet = []
  let colTag = 'ABCDEFGHIJ'
  let validBomb = true
  for (let i = 0; i < bomb.length; i++) {
    let translate = bomb[i].split('')
    if (translate[1] > 10) {
      validBomb = false
    }
    for (let j = 0; j < colTag.length; j++) {
      if (translate[0] === colTag[j]) {
        translate[0] = j
      }
    }
    bullet.push([translate[0], +translate[1]])
  }
  if (validBomb === false) {
    console.log(`Wrong Input we can't start the game`)
  }
  else if (validBomb === true) {
    return shootTheShip(board, bullet, shipPlacement)
  }
}

const shootTheShip = (board, bullet, shipPlacement) => {
  let swampShip = []
  let count = 0
  for (let i = 0; i < bullet.length; i++) {
    for (let j = 0; j < shipPlacement.length; j++) {
      for (let k in shipPlacement[j].placement) {
        let pos = shipPlacement[j].placement[k]
        if (bullet[i][0] === pos[0] && bullet[i][1] === pos[1]) {
          swampShip.push(shipPlacement[j].name)
          board[pos[0]][pos[1]] = '🔥'
          count++
        }
        else if (board[bullet[i][0]][bullet[i][1]] === ' ') {
          board[bullet[i][0]][bullet[i][1]] = '/'
        }
      }
    }
    sleep(500)
    clearScreen()
    printBattleField(board)
  }
  
  if (count) {
    console.log(`You shoot ${bullet.length} times`)
    console.log(`Ship ${swampShip.join(',')} has been lost`)
    console.log(`Total succeeded shoot ${count}`)
  } else {
    console.log(`You shoot ${bullet.length} times`)
  }
}

const printBattleField =  (board) => {
  console.log('\n--------------------BATTLE---------------------\n')
  console.log(`##| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10|`)
  for (let j = 0; j < board.length; j++) {
    console.log(board[j].join(' | '))
  }
}

function shipPlacement() {
  let allShip = []
  for (let k = 0; k < infoShip.length; k++) {
    while (infoShip[k].placement.length < infoShip[k].size) {
      let randomVal = Math.round(Math.random())
      if (randomVal < 1) {
        // horizontal
        let posHoriz = Math.floor(Math.random() * 10)
        let randomStart = Math.floor(Math.random() * 10) + 1
        if (randomStart + infoShip[k].size < 11) {
          for (let i = 0; i < infoShip[k].size; i++) {
            let posSideWay = randomStart + i
            if (!allShip) {
              allShip.push([posHoriz, posSideWay])
              infoShip[k].placement.push([posHoriz, posSideWay])
            } else {
              let placed = false
              for (let j = 0; j < allShip.length; j++) {
                if (allShip[j][0] === posHoriz && allShip[j][1] === posSideWay) {
                  placed = true
                }
              }
              if (!placed) {
                allShip.push([posHoriz, posSideWay])
                infoShip[k].placement.push([posHoriz, posSideWay])
              }
            }
          }
        }
      }
      else {
        //Vertical
        let posVer = Math.floor(Math.random() * 10) + 1
        let randomStart = Math.floor(Math.random() * 10)
        if (randomStart + infoShip[k].size < 11) {
          for (let i = 0; i < infoShip[k].size; i++) {
            let posDownWay = randomStart + i
            if (!allShip) {
              allShip.push([posVer, posDownWay])
            } else {
              let placed = false
              for (let j = 0; j < allShip.length; j++) {
                if (allShip[j][0] === posDownWay && allShip[j][1] === posVer) {
                  placed = true
                }
              }
              if (!placed) {
                allShip.push([posDownWay, posVer])
                infoShip[k].placement.push([posDownWay, posVer])
              }
            }
          }
        }
      }
    }
  }
  return infoShip
}

function emptyBoard() {
  let colTag = 'ABCDEFGHIJ'
  let board = []
  for (let i = 0; i < colTag.length; i++) {
    board.push([])
    for (let j = 0; j < 12; j++) {
      board[i].push([])
      board[i][0] = colTag[i]
      if (j > 0) {
        board[i][j] = ' '
      }
    }
  }
  return board
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function clearScreen() {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

startGame()


