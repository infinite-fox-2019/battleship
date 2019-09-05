// Your code here
function clearScreen() {
    // Un-comment this line if you have trouble with console.clear();
    return process.stdout.write('\033c');
    console.clear();
}
"use strict"

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

const ships = [
    {
        name: `Aircraft carrier`,
        size: 5,
        symbol: '🚢',
        health: 100
    },
    {
        name: `Battleship`,
        size: 4,
        symbol: '🚤',
        health: 100
    },
    {
        name: `Cruiser`,
        size: 3,
        symbol: '🚣',
        health: 100
    },
    {
        name: `Destroyer`,
        size: 2,
        symbol: '🦀',
        health: 100
    }
]

const boomCoordinate = process.argv.slice(2)


console.log(dropBoom());

function generatedBoard() {
    let output = []
    for (let i = 0; i < 10; i++) {
        let temp = []
        for (let j = 0; j < 10; j++) {
            temp.push(' ')
        }
        output.push(temp)
    }
    return output
}



function generatedRamdomShip() {
    let limit = 0
    let board = generatedBoard()

    for (let i = 0; i < ships.length; i++) {
        let ship = ships[i]
        let emptySpot = false
        let horzOrVert = Math.round(Math.random() * 3)
        while (emptySpot === false) {
            emptySpot = true
            let place = board.length - ship.size
            let randomPlace = Math.round(Math.random() * place)
            if (horzOrVert === 0) {
                for (let j = 0; j < ship.size; j++) {
                    if (board[place][randomPlace + j] !== ' ') {
                        emptySpot = false
                        break;
                    }
                }
            }
            else if (horzOrVert === 1) {
                for (let j = 0; j < ship.size; j++) {
                    if (board[randomPlace + j][place] !== ' ') {
                        emptySpot = false
                        break;
                    }
                }
            } else if (horzOrVert === 2) {
                for (let j = 0; j < ship.size; j++) {
                    if (board[randomPlace + j][randomPlace + j] !== ' ') {
                        emptySpot = false
                        break;
                    }
                }
            } else if (horzOrVert === 3) {
                for (let j = 0; j < ship.size; j++) {
                    if (board[randomPlace + j][randomPlace - j] !== ' ') {
                        emptySpot = false
                        break;
                    }
                }
            }

            if (emptySpot) {
                //print kapal ke tempat yang kosong
                if (horzOrVert === 0) {
                    for (let j = 0; j < ship.size; j++) {
                        board[place][randomPlace + j] = ship.symbol
                    }
                } else if (horzOrVert === 1) {
                    for (let j = 0; j < ship.size; j++) {
                        board[randomPlace + j][place] = ship.symbol
                    }
                } else if (horzOrVert === 2) {
                    for (let j = 0; j < ship.size; j++) {
                        board[randomPlace + j][randomPlace + j] = ship.symbol
                    }
                } else if (horzOrVert === 3) {
                    for (let j = 0; j < ship.size; j++) {
                        board[randomPlace + j][randomPlace - j] = ship.symbol
                    }
                }
            }
            limit++
            if (limit > 100) {
                board = generatedBoard()
                i = -1
                emptySpot = true
                limit = 0
                break
            }
        }

    }

    return board

}


function getBoomCoor() {
    let output = []
    for (let i = 0; i < boomCoordinate.length; i++) {
        let x = boomCoordinate[i][0].toUpperCase().charCodeAt(0) - 65
        let y = Number(boomCoordinate[i].slice(1)) - 1
        output.push([x, y])
    }
    return output
}


function dropBoom() {
    let boardWithShip = generatedRamdomShip()
    let boomCoor = getBoomCoor()
    let len = boomCoor.length

    for (let i = 0; i < len; i++) {
        let x = boomCoor[i][0]
        let y = boomCoor[i][1]
        if (boardWithShip[x][y] !== ' ') {
            for (let j = 0; j < ships.length; j++) {
                if (ships[j].symbol === boardWithShip[x][y]) {
                    ships[j].health -= (Math.round(100 / ships[j].size))
                    boardWithShip[x][y] = '🔥'
                    break;
                }
            }
        } else {
            boardWithShip[x][y] = '✧'
        }
        console.log(printLine(boardWithShip));
        console.log(message());
        sleep(1000)
        clearScreen()
    }

    console.log(printLine(boardWithShip));
    return message()
}


function message() {
    let output = '\n'
    ships.forEach(ship => {
        if (ship.health === 0) {
            output += ` (${ship.symbol} ) ${ship.name} Completely Demolished, health (${ship.health}%)\n`
        } else if (ship.health !== 100) {
            output += ` (${ship.symbol} ) ${ship.name} is hit by BOOM, health (${ship.health}%)\n`
        } else {
            output += ` (${ship.symbol} ) ${ship.name} is save, health (${ship.health}%)\n`
        }
    })
    return output
}


function printLine(board) {

    clearScreen()
    console.log(`Boom Coordinate : ` + boomCoordinate.join(' '));

    let finaBoard = board
    let output = '\n'
    output += `     A   B   C   D   E   F   G   H   I   J\n`
    output += `   +---------------------------------------+\n`
    for (let i = 0; i < finaBoard.length; i++) {
        output += `   |---|---|---|---|---|---|---|---|---|---|\n`
        if (i + 1 === 10) {
            output += `${i + 1}`
        } else {
            output += `${i + 1} `
        }

        output += ` | `
        output += finaBoard[i].join(' | ')
        output += ' |\n'
    }
    output += `   +---------------------------------------+\n`

    return output
}