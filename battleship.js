// Your code here
function generateBoard() {
    let board = []
    for (let i=0; i<11; i++) {
        board.push([])
        for (let j=0; j<11; j++) {
            board[i].push(' -')
        }
        
    }
    //timpa elemen board baris ke-0 
    let num = 1
    for (let j=1; j<11; j++) {
        board[0][j] = ' ' + num
        num++
    }
    //timpa elemen board kolom ke-0
    let abj = 'OABCDEFGHIJ'
    for (let i=1; i<11; i++) {
        board[i][0] = abj[i]
    }
    return board
}




function getCoordinate(shipList, newBoard) {
    for (let key in shipList) {
        shipList[key].coordinate = (randomPosition(shipList[key].lengthShip, newBoard))
    }
    return shipList
}

function randomPosition(lengthOfShip, newBoard) {
    //random vertikal atau horizontal
    let random = Math.round(Math.random()*3)
    let point = rand()
    let y = point[0]
    let x = point[1]
    let coordinate = [point]
    //0 => vertikal ke atas
    //1 => vertikal ke bawah
    //2 => horizontal ke kanan
    //3 => horizontal ke kiri
    if (random == 0) {
        for (let i=0; i<lengthOfShip-1; i++) {
            coordinate.push([y+1+i, x])
        }
    } else if (random == 1) {
        for (let i=0; i<lengthOfShip-1; i++) {
            coordinate.push([y-1-i, x])
        }
    } else if (random == 2) {
        for (let i=0; i<lengthOfShip-1; i++) {
            coordinate.push([y, x+1+i])
        }
    } else if (random == 3) {
        for (let i=0; i<lengthOfShip-1; i++) {
            coordinate.push([y, x-1-i])
        }
    }    
    //pastikan koordinatnya berbeda dengan koordinat kapal yang sudah ada 
    for (let a=0; a<coordinate.length; a++) {
        let b = coordinate[a][0] 
        let c = coordinate[a][1]
        if (b > 10 || b <1 || c > 10 || c <1) {
            return randomPosition(lengthOfShip, newBoard)
        }
        if (newBoard[b][c] != ' -') {
            return randomPosition(lengthOfShip, newBoard)
        }
    }
    return coordinate
}

function rand() {
    i = Math.ceil(Math.random()*10)
    j = Math.ceil(Math.random()*10)
    return [i,j]
}

function shipPositioning(coordinate, newBoard) {
    for (let i=0; i<coordinate.length; i++) {
        for (let j=0; j<newBoard.length; j++) {
            for (let k=0; k<newBoard[j].length; k++) {
                if (j == coordinate[i][0] && k == coordinate[i][1]) {
                    newBoard[j][k] = 'S'
                }
            }
        }
    }
    return newBoard
}

function swicthInputUser() {

}
function output(newShipList, newBoard) {
    for (let key in newShipList) {
        shipPositioning(newShipList[key].coordinate,newBoard)
    } 
    return newBoard
}

function main() {
    let board = generateBoard()
    let newBoard = board
    let shipList = {
        aircraftCarrier : {lengthShip: 5, coordinate: []},
        battleship : {lengthShip:4, coordinate: []},
        cruiser : {lengthShip:3, coordinate: []},
        destroyer : {lengthShip: 2, coordinate: []}
    }
    let newShipList = getCoordinate(shipList, newBoard)
    newBoard = output(newShipList, newBoard)
    return newBoard
}

console.table(main())