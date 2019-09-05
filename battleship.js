let board = generateBoard()
const shoot = process.argv.slice(2);
const ship = [
    {ship: 'aircraftCarrier', size : 5, sym :'*'},
    {ship: 'battleship', size : 4, sym:'#'},
    {ship: 'cruiser', size: 3, sym:'@'},
    {ship: 'destroyer', size: 2, sym:'$'}
    ]

function generateBoard(){
    let alphabet = 'ABCDEFGHIJ'
    let board = [];
    for (let i=0; i<11; i++){
        board.push([])
        for (let j=0; j<11; j++){
            // board.push(' ')
            if (i !== 0 && j == 0){
                board[i].push(alphabet[i-1])
            }
            else if( j !== 0 && i == 0){
                board[i].push(j)
            }
            else {
                board[i].push(' ');
            }
        }
    }
    return board
}
function shipCoord(dataShip) {
    let size = dataShip.size;
    let sym = dataShip.sym;

    let shipFace = Math.round(Math.random()*1)
    let loc = Math.round(Math.random()*10)
    let coord = [];
    if (loc+size > 10){
        return shipCoord(dataShip);
    }
    for (let i=loc; i<loc+size; i++){
        if (shipFace == 0){
            coord.push([loc,i])
        }
        else {
            coord.push([i,loc])
        }
    }
    for (let i=0; i<coord.length; i++){
        if (board[coord[i][0]][coord[i][1]] !== ' '){
            return shipCoord(dataShip);
        }
    }
    for (let i=0; i<coord.length; i++){
        board [coord[i][0]] [coord[i][1]] = sym;
    }
}
function convert(arr){
    let alpha = 'ABCDEFGHIJ';
    let out = []
    for (let i=0; i<arr.length; i++){
        let abjad = arr[i][0];
        let angka = arr[i].slice(1);
        for (let j=0; j<alpha.length; j++){
            if (abjad === alpha[j]){
                abjad = j+1;
            }
        }
        out.push([abjad,Number(angka)])
    }
    return out;
}
function play(){
    if (shoot > 20){
        return 'max shoot 20'
    }
    for (let i=0; i<ship.length; i++){
        shipCoord(ship[i])
    }
    console.log(board)

    let tembak = convert(shoot);
    let countHit = 0, countMiss = 0;
    for (let i=0; i<tembak.length; i++){
        if (board [tembak[i][0]] [tembak[i][1]] === ' '){
            board [tembak[i][0]] [tembak[i][1]] = '/'
            countMiss++
        }
        else if ( board [tembak[i][0]] [tembak[i][1]] !== ' '){
            board [tembak[i][0]] [tembak[i][1]] = 'X'
            countHit++
        }
    }
    console.log(`Hit: ${countHit}, Miss = ${countMiss}`);
    return board;
}

console.log(play())