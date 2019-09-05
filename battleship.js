const alphabet = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, i: 9, J: 10 }

const listOfShips = [
  { name: 'Aircraft', size: 5, mark: 'A' },
  { name: 'Battleship', size: 4, mark: 'B' },
  { name: 'Cruiser', size: 3, mark: 'C' },
  { name: 'Destroyer', size: 2, mark: 'D' },
]

const generateBoard = () => {
  const board = []

  for (let i = 0; i < 11; i++) {
    board.push([])
    for (let j = 0; j < 11; j++) {
      if (i === 0 && j === 0) {
        board[i].push('+ ')
      } else if (i == 0) {
        board[i].push(`${j}`)
      } else if (j == 0) {
        board[i].push(`${ String.fromCharCode(96 + i).toUpperCase() } `)
      } else {
        board[i].push(' ')
      }
    }
  }

  return board
}
const board = generateBoard()

const findHead = () => {
  return Math.ceil(Math.random() * 10)
}

const findRandomDirection = () => {
  return Math.round(Math.random() * 1)
}

const findKordinat = (board, ship) => {
  const { size, mark } = ship
  const head = findHead()
  const direction = findRandomDirection()
  const kordinats = []
  
  if (head + size > 10 || head + size < 1) return findKordinat(board, ship)

  // for (let i = 0; i < kordinats.length; i++) {
  //   if (board[i][head] !== ' ' || board[i][head + size] !== ' ') {
  //     return findKordinat(board, ship)
  //   }
  // }

  if (!direction) {
    for (let i = head; i < head + size; i++) {
      kordinats.push([head, i])
    }
  } else {
    for (let i = head; i < head + size; i++) {
      kordinats.push([i, head])
    }
  }

  // console.log(kordinats)
  for (let i = 0; i < kordinats.length; i++) {
    if (board[kordinats[i][0]][kordinats[i][1]] !== ' ' && board[kordinats[i][0]][kordinats[i][1]] != undefined) {
      return findKordinat(board, ship)
    }   
  }
  for (let i = 0; i < kordinats.length; i++) {
    board[kordinats[i][0]][kordinats[i][1]] = mark
  }

  return { head, direction, size, kordinats, board }
}

console.log('k', findKordinat(board, listOfShips[0]))
console.log('k', findKordinat(board, listOfShips[1]))
console.log('k', findKordinat(board, listOfShips[2]))
console.log('k', findKordinat(board, listOfShips[3]))

const battleShip = () => {

}

console.log(battleShip())

