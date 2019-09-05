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

function battleship () {
    let tableShip = {
        'Aircreaft carrier' : 5,
        'Battleship' : 4,
        'Cruiser' : 3,
        'Destroyer' : 2
    };
};

let arrayParameter = process.argv.slice(2);
console.log(printBoard(arrayParameter[0], arrayParameter[1]));