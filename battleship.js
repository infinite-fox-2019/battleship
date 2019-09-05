// Your code here
const coordinate = process.argv.slice(2)

if (coordinate.length === 0) {
    console.log('HOW TO PLAY');
    console.log('=====================');
    console.log('node <fileName.js> <coordinate1> <coordinate2> .....');
    console.log('i.e node battleShip.js A10 B5 B3 C5');
} else {


    const ships = [
        { name: 'Aircraft Carrier', size: 5, damage: 0, symbol: '🛩', pos: [] },
        { name: 'Battleship', size: 4, damage: 0, symbol: '⛵', pos: [] },
        { name: 'Cruiser', size: 3, damage: 0, symbol: '🚢', pos: [] },
        { name: 'Destroyer', size: 2, damage: 0, symbol: '🚚', pos: [] }
    ]

    const bombs = []

    function createBoard() {
        let board = [];

        Array(10).fill('').forEach(el => board.push(Array(10).fill(' ')))

        return board
    }

    function printBoard(board) {

        let label = 'ABCDEFGHIJ'
        console.log(`\n================BATTLESHIPS================`);
        console.log(`===========================================`);
        console.log(`# | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10|`);
        console.log(`-------------------------------------------`);
        let result = ''
        for (let i = 0; i < board.length; i++) {
            let row = `${label[i]} |`
            for (let j = 0; j < board[i].length; j++) {
                row += ` ${board[i][j]} |`
            }
            result += `${row}\n`
            result += `   ----------------------------------------\n`
        }

        console.log(result);

    }

    function findSpot(board) {

        let direction = ['vertical', 'horizontal']
        for (let i = 0; i < ships.length; i++) { //isi semua ships
            let found = false
            searchShip:
            while (!found) {
                let dir = direction[Math.floor(Math.random() * direction.length)]
                if (dir === 'horizontal') {
                    let randRow = Math.floor(Math.random() * board.length)
                    let randCol = Math.floor(Math.random() * (board.length - ships[i].size))

                    for (let j = randCol; j < randCol + ships[i].size; j++) {
                        if (board[randRow][j] !== ' ') {
                            continue searchShip
                        }
                    }
                    found = true;

                    if (found) {
                        for (let k = randCol; k < randCol + ships[i].size; k++) {
                            board[randRow][k] = ships[i].symbol
                            ships[i].pos.push({ iAxis: randRow, jAxis: k })
                        }
                    }
                } else {
                    let randRow = Math.floor(Math.random() * (board.length - ships[i].size))
                    let randCol = Math.floor(Math.random() * board.length)

                    for (let j = randRow; j < randRow + ships[i].size; j++) {
                        if (board[j][randCol] !== ' ') {
                            continue searchShip
                        }
                    }
                    found = true;
                    if (found) {
                        for (let k = randRow; k < randRow + ships[i].size; k++) {
                            board[k][randCol] = ships[i].symbol
                            ships[i].pos.push({ iAxis: k, jAxis: randCol })
                        }
                    }

                }
            }
        }

    }

    function bombing() {

        for (let i = 0; i < coordinate.length; i++) {
            let iAxis = coordinate[i][0].charCodeAt() - 65
            let jAxis = Number(coordinate[i].slice(1)) - 1

            bombs.push({
                iAxis,
                jAxis
            })
        }
    }

    function start(board) {
        for (let i = 0; i < bombs.length; i++) {
            if (board[bombs[i].iAxis][bombs[i].jAxis] === ' ') {
                board[bombs[i].iAxis][bombs[i].jAxis] = '🆗'
            } else {
                board[bombs[i].iAxis][bombs[i].jAxis] = '💥'
            }
        }
    }

    function result() {
        console.log('FLEETS OF THE BATTLE:');
        console.log('=====================');

        for (let i = 0; i < ships.length; i++) {
            for (let j = 0; j < ships[i].pos.length; j++) {
                bombs.forEach(el => {
                    if (el.iAxis === ships[i].pos[j].iAxis && el.jAxis === ships[i].pos[j].jAxis) {
                        ships[i].damage++
                    }
                })
            }
            let healthLevel = ((ships[i].size - ships[i].damage) / ships[i].size) * 100
            if (healthLevel > 0) {
                console.log(`${ships[i].name}: Health level = ${(((ships[i].size - ships[i].damage) / ships[i].size) * 100).toFixed(2)}%`);
            } else {
                console.log(`${ships[i].name} is destroyed`);
            }
        }
    }

    let board = createBoard()

    findSpot(board)


    bombing()
    start(board)
    printBoard(board)
    result()
}