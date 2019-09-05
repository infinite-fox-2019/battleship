// Your code here
function printBoard () {
    let alphabet = ' ABCDEFGHIJ';
    let board = [];
    for (let i = 0; i < 11; i++) {
        let tempBoard = [];
        for (let j = 0; j < 11; j++) {
            if (i === 0 && j !== i) {
                tempBoard.push(String(j))
            } else if (j === 0) {
                tempBoard.push(alphabet[i]);
            } else {
                tempBoard.push(' ');
            }
        }
        board.push(tempBoard);
    }
    return board;
};

function battleship (arrayParameter) {
    let tukangBom = bomber(arrayParameter)
    let board = printBoard();
    let tableShip = {
        'Aircreaft carrier' : 5,
        'Battleship' : 4,
        'Cruiser' : 3,
        'Destroyer' : 2
    };
    //untuk set posisi perahu dinamis :
    while (tableShip.hasOwnProperty('Aircreaft carrier') || tableShip.hasOwnProperty('Battleship') || tableShip.hasOwnProperty('Cruiser') || tableShip.hasOwnProperty('Destroyer')) {
        for (let keys in tableShip) {
            let randomPosisi = checkHorizontalOrVertical();
            if (randomPosisi === 'horizontal') {
                //horizontal
                let posisiShip = randomRowColForShip();
                let checkPerahuInBoard = 0;
                for (let i = 0; i < tableShip[keys]; i++) {
                    if (board[posisiShip[0]][posisiShip[1]+i] !== ' ') {
                        checkPerahuInBoard++;
                    }
                }
                if (checkPerahuInBoard === 0) {
                    for (let i = 0; i < tableShip[keys]; i++) {
                        board[posisiShip[0]][posisiShip[1]+i] = String(tableShip[keys]);
                    }
                    delete tableShip[keys];   
                }
            } else {
                //vertical
                let posisiShip = randomRowColForShip();
                let checkPerahuInBoard = 0;
                for (let i = 0; i < tableShip[keys]; i++) {
                    if (board[posisiShip[0]+i][posisiShip[1]] !== ' ') {
                        checkPerahuInBoard++;
                    }
                }
                if (checkPerahuInBoard === 0) {
                    for (let i = 0; i < tableShip[keys]; i++) {
                        board[posisiShip[0]+i][posisiShip[1]] = String(tableShip[keys]);
                    }
                    delete tableShip[keys];   
                }
            }
        }
    }
    
    //tes bom, jika terkena bom * jadi x 
    for (let i = 0; i < board.length; i++) {

    }
    return board;
};

function randomRowColForShip () {
    var randomRow = 0;
    var randomCol = 0;
    while (randomRow === 0 || randomCol === 0) {
        randomRow = Math.floor(Math.random()*5);
        randomCol = Math.floor(Math.random()*5);
    }
    let rowCol = [randomRow, randomCol];
    return rowCol
};

function checkHorizontalOrVertical () {
    let vertiOrHori = Math.floor(Math.random() * 2);
    if (vertiOrHori === 0) {
        return 'horizontal';
    } else {
        return 'vertical';
    }
};

function bomber (arrayParameter) {
    let posBom = arrayParameter;
    let board = printBoard();
    let indexPosBom = [];
    for (let i = 0; i < posBom.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (posBom[i][0] === board[j][0]) {
                indexPosBom.push([j, Number(posBom[i][1])]);
            }
        }
    }
    return indexPosBom; 
};

let arrayParameter = process.argv.slice(2);
console.log(battleship(arrayParameter));