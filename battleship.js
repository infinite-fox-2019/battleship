const ships = [
    {name: 'Aircraft carrier', size: 5},
    {name: 'Battleship', size: 4},
    {name: 'Cruiser', size: 3},
    {name: 'Destroyer', size: 2},
]
let shipCoordinates = [];
let hitCoordinates = [];
let missCoordinates = [];

generateEnemyShip();
fireEnemyShip();
printBoard();
printReport();

function generateEnemyShip() {
    for(let i = 0; i < ships.length; i++) {
        let currentShip = ships[i];
        let validPosition = false;
        let currentShipCoordinate = [];

        while(!validPosition) {
            currentShipCoordinate = [];

            let horizontal = getRandomNumberInclusive(0, 1) === 0;
            let maxRandomX = 10;
            let maxRandomY = 10;
            horizontal ? maxRandomY -= currentShip.size - 1 : maxRandomX -= currentShip.size - 1;
            let randomX = getRandomNumberInclusive(1, maxRandomX);
            let randomY = getRandomNumberInclusive(1, maxRandomY);

            for(let j = 0; j < currentShip.size; j++) {
                currentShipCoordinate.push([randomX, randomY]);
                horizontal ? randomY++ : randomX++;
            }
            validPosition = !arrayHaveSameElement(shipCoordinates, currentShipCoordinate);
        }
        arrayJoin(shipCoordinates, currentShipCoordinate);
    }
}

function fireEnemyShip() {
    let ammo = getRandomNumberInclusive(4, 10);

    for(let i = 0; i < ammo; i++) {
        let x = getRandomNumberInclusive(1, 10);
        let y = getRandomNumberInclusive(1, 10);
        if(arrayHaveSameElement(shipCoordinates, [[x, y]])) {
            hitCoordinates.push([x, y]);
        } else {
            missCoordinates.push([x, y]);
        }
    }
}

function printBoard() {
    let board = [];
    for(let i = 0; i <= 10; i++) {
        board[i] = []
        for(let j = 0; j <= 10; j++) {
            if(i === 0 && j !== 0) {
                board[i][j] = j + '';
            } else if(i !== 0 && j === 0) {
                board[i][j] = String.fromCharCode(i + 64);
            } else {
                board[i][j] = ' ';
            }
        }
    }
    for(let i = 0; i < shipCoordinates.length; i++) {
        board[shipCoordinates[i][0]][shipCoordinates[i][1]] = '#';
    }
    for(let i = 0; i < hitCoordinates.length; i++) {
        board[hitCoordinates[i][0]][hitCoordinates[i][1]] = 'X';
    }
    for(let i = 0; i < missCoordinates.length; i++) {
        board[missCoordinates[i][0]][missCoordinates[i][1]] = 'O';
    }
    
    console.log(board);
}

function printReport() {
    console.log(`HIT: ${hitCoordinates.length}`);
    console.log(`MISS: ${missCoordinates.length}`);
}

function getRandomNumberInclusive(min, max) {
  return Math.floor(Math.random() * Math.floor(max + 1 - min) + min);
}

function arrayJoin(arr1, arr2) {
    for(i = 0; i < arr2.length; i++) {
        arr1.push(arr2[i]);
    }
}

function arrayHaveSameElement(arr1, arr2) {
    for(let i = 0; i < arr1.length; i++) {
        for(let j = 0; j < arr2.length; j++) {
            if(arr1[i][0] === arr2[j][0] && arr1[i][1] === arr2[j][1]) {
                return true;
            }
        }
    }
    return false;
}