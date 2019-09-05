// Your code here



/*

type "node battleship.js <first_bomb_coordinate> <second_bomb_coordinate> ... <n_bomb_coordinate>"
example : "node battleship.js A1 B3 C3 A2"

*/



const openFire = process.argv.slice(2)

clearScreen();


var ships = [
    {
        name: 'Aircraft carrier',
        size: 5,
        symbol: '🚀'
        
    },
    {
        name: 'Battleship',
        size: 4,
        symbol: '🚣'
        
    },
    {
        name: 'Cruiser',
        size: 3,
        symbol: '⛵'
        
    },
    {
        name: 'Destroyer',
        size: 2,
        symbol: '🏄'
        
    }
]
var health = [];
for (let i = 0;i<ships.length;i++) {
    let rek = {};
    rek.name = ships[i].name;
    rek.health = ships[i].size;
    health.push(rek)
}

function sleep(milliseconds) { //.............SleepFunction
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > milliseconds) {
            break;
        }
    }
}

function clearScreen() { //........................clearScreen
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
}

function generateBoard() {

    let numBoard = 10;
    let board = []
    for (let i = 0;i<numBoard;i++) {
        let subBoard = [];
        for (let j = 0;j<numBoard;j++) {
            subBoard.push('-');
        };
        board.push(subBoard);
    };
    return board;
};

function printBoard (board) {

    let border = '    A     B     C     D     E     F     G     H     I     J   ' + '\n';
    border += '+------------------------------------------------------------+ ' + '\n';
    for (let i = 0;i<board.length;i++) {
        border += `${i}`
        for (let j = 0;j<board[i].length;j++) {
            if (board[i][j] == '-') {
                border += `|  ${' '}  `
            }else {
                border += `|  ${board[i][j]}  `
            }
            
            if (j == board[i].length-1) {
                border += '|'
            }
        }
        border += '\n';
        border += '--------------------------------------------------------------'
        border += '\n'
    }
    console.log(border)

};

function putShip (board) {

for (let i = 0;i<ships.length;i++) {
    
        let shipPosition = false;
    while (shipPosition == false) {
        let possition = Math.floor(Math.random()*4);
        let randomPosVer = Math.floor(Math.random()*ships[i].size);
        let randomPosHor = Math.floor(Math.random()*ships[i].size);
        if (board[randomPosVer][randomPosHor] == '-' && board[randomPosVer][randomPosHor] != undefined) {

            if (possition == 0) { //vertical
                let count = 0;
                for (let j = randomPosVer;j<ships[i].size + randomPosVer;j++) {
                    if (board[j][randomPosHor] != '-' || board[j][randomPosHor] == undefined) {
                        count++
                    }
                }
                if (count == 0) {
                    for (let j = randomPosVer;j<ships[i].size + randomPosVer;j++) {
                        board[j][randomPosHor] = ships[i].symbol;
                    }
                    shipPosition = true;
                }
            }else if (possition == 1) { //horizontal

                let count = 0;
                for (let j = randomPosHor;j<ships[i].size + randomPosHor;j++) {
                    if (board[randomPosVer][j] != '-' || board[randomPosVer][j] == undefined) {
                        count++
                    }
                }
                if (count == 0) {
                    for (let j = randomPosHor;j<ships[i].size + randomPosHor;j++) {
                        board[randomPosVer][j] = ships[i].symbol;
                    }
                    shipPosition = true;
                }
            }else if (possition == 2) { //first diagonal \
                let count = 0;
                for (let j = randomPosVer; j<ships[i].size + randomPosVer;j++) {
                    let x = j;
                    let y = randomPosHor + j;
                    if (board[x][y] != '-' || board[x][y] == undefined) {
                        count++
                    }
                }
                if (count == 0) {
                    for (let j = randomPosVer; j<ships[i].size + randomPosVer;j++) {
                        let x = j;
                        let y = randomPosHor + j;
                        board[x][y] = ships[i].symbol;
                    }
                    shipPosition = true;
                }
            }else if (possition == 3) {
                let count = 0;
                for (let j = randomPosVer;j<ships[i].size + randomPosVer;j++) {
                    let x = j;
                    let y = randomPosHor - j;
                    if (board[x][y] != '-' || board[x][y] == undefined) {
                        count++
                    }
                }
                if (count == 0) {
                    for (let j = randomPosVer;j<ships[i].size + randomPosVer;j++) {
                        let x = j;
                        let y = randomPosHor - j;
                        board[x][y] = ships[i].symbol;
                    }
                    shipPosition = true;
                }
            }

        }//end if
        
    }//end while
}//end loop i
return board
};//end function board

function inputCommand() {
    let library = 'ABCDEFGHIJ'
    let numLib = [0,1,2,3,4,5,6,7,8,9];

    let result = [];
    for (let i = 0;i<openFire.length;i++) {
        let subCode = [];
        let decoded = openFire[i].split('');
        for (let j = 0;j<library.length;j++) {
            if (decoded[0] == library[j]) {
                subCode.push(numLib[j])
            }
        }
        subCode.push(Number(decoded[1]) - 1);
        result.push(subCode)
    }
    return result
}//end function 

function dropTheBomb (board,bomb) {
    
    for (let i = 0;i<bomb.length;i++) {

        let x = bomb[i][0];
        let y = bomb[i][1];
        if (board[x][y] != '-') {
            for(let j = 0;j<ships.length;j++) {
                if (board[x][y] == ships[j].symbol){
                    ships[j].size --
                }
            }
        }
        board[x][y] = '💥'
        printBoard(board)
        sleep(1000);
        clearScreen();

        board[x][y] = '-'
    }//end loop i

    let status = [];
    for (let i = 0;i<ships.length;i++) {
        if (ships[i].size == 0) {
            console.log(`You destroy the ${ships[i].name}`)
        }
            let rek = {};
            rek.name = ships[i].name;
            let percent = Math.floor((ships[i].size / health[i].health) * 100);
            rek.healthPercent = `${percent}%`
            status.push(rek)
        
    }
    status.forEach(function(ele) {
        let message = `Remaining health of ${ele.name} is ${ele.healthPercent}`
        console.log(message)
    })

    return '||--------------------------------------||'

} //end function




let board = generateBoard();
let shipOnBoard = putShip(board);
let bombOnBoard = dropTheBomb(shipOnBoard,inputCommand())
console.log(bombOnBoard)
