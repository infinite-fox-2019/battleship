// Your code here

//note masih belum sempurna bila menemukan error bisa dicoba sekali lagi node battleship.js ... nya
//sepertinya ada kondisi yang salah pada saat random sehingga didapatkan undefined;
//setelah beberapa kali percobaan belum ada kapal yang bersentuhan

let menuShip = [
    {
        ship : 'Aircraft carrier',
        size : 5,
        much : 1
    },
    {
        ship : 'Battleship',
        size : 4,
        much : 1
    },
    {
        ship : 'Cruiser',
        size : 3,
        much : 1
    },
    {
        ship : 'Destroyer',
        size : 2,
        much : 1
    }
]
//function menentukan angka random
function randomMath () {
    let random = Math.random() * 10;
    return random;
}
//function menentukan kapan random
function randomShipTurn(){
    let random = randomMath();
    let tamp = menuShip[0].size;
    if(random > 0 && random < 2.5) tamp = menuShip[0].size;
    else if(random > 2.5 && random < 5) tamp = menuShip[1].size;
    else if(random > 5 && random < 7.5) tamp = menuShip[2].size;
    else if(random > 7.5 && random < 10) tamp = menuShip[3].size;
    return tamp;
}
//function menentukan tempat random
function randomPlace () {
    let i = Math.floor(Math.random() * 11);
    let j = Math.floor(Math.random() * 11);
    if(i !== 0 & j !== 0) {
        return {i:i,j:j}
    }else{
        return randomPlace()
    }
}

function randomHorVer () {
    let num = Math.floor(Math.random() * 2);
    if(num === 0){
        return 'horizontal';
    }else if(num === 1){
        return 'vertikal'
    }else{
        return randomHorVer();
    }
}

function checkPos (posisi) {
    let check = false;
    if(posisi === ' '){
        check = true;
    }

    if(check){
        return true
    }else{
        return false;
    }
}

let fire = process.argv[2];
let fire2 = process.argv[3];

//function print papan
function printBoard () {
    let forJ = ' ABCDEFGHIJ';
    let board = [];
    for(let i=0; i<11; i++){
        board.push([])
        for(let j=0; j<11; j++){
            if(i===0 && i !== j){
                board[i].push(String(j));
            }else if(j===0 && i !== j){
                board[i].push(forJ[i]);
            }else {
                board[i].push(' ')
            }
        }
    }
    let randPlace = randomPlace();
    for(let k=0; k<menuShip.length; k++){
        debugger;
        let randUpDown = randomHorVer();
        memberShip = randomShipTurn();
        randPlace = randomPlace();
        if(randUpDown === 'horizontal'){
            for(let i=0; i<memberShip; i++){
                debugger;
                if(checkPos(board[randPlace.i][randPlace.j+i])){
                    if(checkPos(board[randPlace.i][randPlace.j+i]) === undefined){
                        return printBoard();
                    }else{
                        board[randPlace.i][randPlace.j+i] = String(memberShip);
                    }
                }else{
                    return printBoard();
                }
            }
        }else if(randUpDown === 'vertikal'){
            randPlace = randomPlace();
            for(let i=0; i<memberShip; i++){
                if(checkPos(board[randPlace.i+i][randPlace.j])){
                    if(checkPos(board[randPlace.i+i][randPlace.j]) === undefined){
                        return printBoard();
                    }else{
                        board[randPlace.i+i][randPlace.j] = String(memberShip);
                    }
                }else{
                    return printBoard();
                }
            }
        }
    }

    // saat coba mendeklarasikan function ...
    
    // ===========================================

    // let targetDummy = setFire(fire);
    // for(let i=0; i<targetDummy.length; i++){
    //     board[targetDummy[i][0]][targetDummy[i][1]] = 'X';
    // }
    // console.log(targetDummy)

    // ========================================= tembakan pertama *Manual 
    let splitFire = fire[0];
    let numFire = fire.slice(1);
    let cekHuruf = []
    for(let i=1; i<board.length; i++){
        for(let j=0; j<board[i].length; j++){
            if(j===0 && board[i][j] === splitFire){
                cekHuruf.push(i,j)
            }
        }
    }
    let cekAngka = [];
    for(let i=0; i<board.length; i++){
        for(let j=0; j<board[i].length; j++){
            if(i===0 && board[i][j] === numFire){
                cekAngka.push(i,j)
            }
        }
    }
    let placeFire = [Math.abs(cekAngka[0]+cekHuruf[0]),Math.abs(cekAngka[1]+cekHuruf[1])]
    board[placeFire[0]][placeFire[1]] = 'X'

    // ================================================================ tembakan kedua
    
    let splitFire2 = fire2[0];
    let numFire2 = fire2.slice(1);
    let cekHuruf2 = []
    for(let i=1; i<board.length; i++){
        for(let j=0; j<board[i].length; j++){
            if(j===0 && board[i][j] === splitFire2){
                cekHuruf2.push(i,j)
            }
        }
    }
    let cekAngka2 = [];
    for(let i=0; i<board.length; i++){
        for(let j=0; j<board[i].length; j++){
            if(i===0 && board[i][j] === numFire2){
                cekAngka2.push(i,j)
            }
        }
    }
    let placeFire2 = [Math.abs(cekAngka2[0]+cekHuruf2[0]),Math.abs(cekAngka2[1]+cekHuruf2[1])]
    board[placeFire2[0]][placeFire2[1]] = 'X';
    //======================================================
    return board;
}

console.log(printBoard())


//function untuk menembak udah dapat indexnya tapi error saat dideklarasi ke variabel ini PR;
function setFire(target){
    let boards = printBoard();
    let getTarget = [];
    for(let i=0; i<target.length; i++){
        let obj = {}
        obj['huruf'] = target[i][0];
        obj['angka'] = target[i].slice(1);
        getTarget.push(obj)
    }
    let checkHuruf = [];
    for(let i=0; i<boards.length; i++){
        for(let j=0; j<boards[i].length; j++){
            for(let k=0; k<getTarget.length; k++){
                if(j === 0 && boards[i][j] === getTarget[k].huruf){
                    checkHuruf.push([i,j]);
                }
            }
        }
    }
    let checkAngka = [];
    for(let i=0; i<boards.length; i++){
        for(let j=0; j<boards[i].length; j++){
            for(let k=0; k<getTarget.length; k++){
                if(i === 0 && boards[i][j] === getTarget[k].angka){
                    checkAngka.push([i,j]);
                }
            }
        }
    }
    let placeTarget = [];
    for(let i=0; i<checkAngka.length; i++){
        for(let j=0; j<checkHuruf.length; j++){
            if(i === j){
                placeTarget.push([Math.abs(checkAngka[i][0]+checkHuruf[j][0]),Math.abs(checkAngka[i][1]+checkHuruf[j][1])]);
            }
        }
    }
    return placeTarget;
}

// console.log(setFire(['C6','D10','A3']))