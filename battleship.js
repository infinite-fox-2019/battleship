// Your code here
let objectShip = {
    aircraft: 5,
    battleship: 4,
    cruiser: 3,
    destroyer: 2,
}

function makeBoard() {
    let board = [];
    for (let i = 0; i <= 10; i++) {
        let row = [];
        if (i == 0) {
            for (let j = 0; j <= 10; j++) {
                row.push(j);
            }
        } else {
            row.push(String.fromCharCode(i+64))
            for (let j = 1; j <= 10; j++) {
                row.push(' ');
            }
        }
        board.push(row);
    }
    return board;
}

function printBoard(myBoard) {
    for (let i = 0; i < myBoard.length; i++) {
        console.log(myBoard[i].join('|') + '|');   
    }
}

function getPosition(shipLength) {
    let randomRow = (Math.ceil(Math.random() * 9)) + 1;
    let randomColumn = (Math.ceil(Math.random() * 9)) + 1;
    let position = Math.round(Math.random() * 1);
    if (position === 0) {
        for (let i = 0; i < shipLength; i++) {
            if (!(myBoard[randomRow][(randomColumn+i)]) || myBoard[randomRow][(randomColumn+i)] != ' ') {
                return getPosition(shipLength);
            }
        }
    } else {
        for (let i = 0; i < shipLength; i++) {
            if (!(myBoard[(randomRow+i)]) || myBoard[(randomRow+i)][randomColumn] != ' ') {
                return getPosition(shipLength);
            }
        }
    }

    return {x: randomRow, y: randomColumn, direction: position}
    
}

function randomShip(objShip) {
    for (let key in objShip) {
        let koordinat = getPosition(objShip[key]);
        let x = koordinat.x;
        let y = koordinat.y;
        let direction = koordinat.direction;
        if (direction === 0) {
            for (let i = 0; i < objShip[key]; i++) {
                myBoard[x][(y+i)] = objShip[key];
            }
        } else {
            for (let i = 0; i < objShip[key]; i++) {
                myBoard[(x+i)][y] = objShip[key];
            }
        }
        
    }

    return myBoard;
}

let myBoard = makeBoard();
randomShip(objectShip, myBoard);
let bomb = process.argv.slice(2);
let hit = 0;
let miss = 0;

// looping bomb process.argv
for (let i = 0; i < bomb.length; i++) {
    let check = false;
    let koordinat = bomb[i].split('');
    switch (koordinat[0].toUpperCase()) {
        case 'A':
            koordinat[0] = 1;
            break;
        case 'B':
            koordinat[0] = 2;
            break;
        case 'C':
            koordinat[0] = 3;
            break;
        case 'D':
            koordinat[0] = 4;
            break;
        case 'E':
            koordinat[0] = 5;
            break;
        case 'F':
            koordinat[0] = 6;
            break;
        case 'G':
            koordinat[0] = 7;
            break;
        case 'H':
            koordinat[0] = 8;
            break;
        case 'I':
            koordinat[0] = 9;
            break;
        case 'J':
            koordinat[0] = 10;
            break;
        default:
            check = true;
            break;
    }
    if (Number(koordinat[1]) > 10) {
        check = true;
    }
    if (!check) {
        koordinat[1] = Number(koordinat[1])
        if (myBoard[koordinat[0]][koordinat[1]] === ' ') {
            myBoard[koordinat[0]][koordinat[1]] = '/';
            miss++;
        } else {
            myBoard[koordinat[0]][koordinat[1]] = 'x';
            hit++;
        }
    }
}

printBoard(myBoard);
console.log('');
console.log(`HIT : ${hit}`);
console.log(`MISS: ${miss}`);

