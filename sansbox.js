function translateNumToWord(num){
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for(let i = 0; i < alphabet.length; i++){
        if(i === num)return alphabet[i]
    }
}

function translateWordToNum(word){
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for(let i = 0; i < alphabet.length; i++){
        if(alphabet[i] === word)return i
    }
}

// let coord = process.argv[2].split('')
let coords = process.argv.slice(2)

//generateBoard 
let board = []
for(let i = 0; i <= 9; i++){
    var temp = []
    for(let j = 0; j <= 9; j++){
        if(j === 0)temp.push(translateNumToWord(i))
        else if(i === 0)temp.push(j)
        else temp.push(` `)
    }
    board.push(temp)
    temp = []
}

const ships = {
    aircraft: {mark:'a',size: 5},
    battleship: {mark:'b',size: 4},
    cruiser: {mark:'c',size: 3},
    destroyer: {mark:'d',size: 2}
}

function generateCoordinate(array,ship){
    let length = ship.size
    let mark = ship.mark

    let start = Math.ceil(Math.random()*9)
    let col = Math.ceil(Math.random()*9)
    
    //GENERATE COORDINATE
    let coordinate = []
    let random = Math.round(Math.random())
    if(random === 0){
        for(let i = start; i < start+length; i++){    
            if(i > 9)return generateCoordinate(array,ship)
            else coordinate.push([col,i])    
        }
    }else{
        for(let i = start; i < start+length; i++){    
            if(i > 9)return generateCoordinate(array,ship)
            else coordinate.push([i,col])    
        }
    }

    //CHECK COORDINATE
    for(let c = 0; c < coordinate.length; c++){
        if(array[coordinate[c][0]][coordinate[c][1]] !== ' ' || array[coordinate[c][0]][coordinate[c][1]] === undefined){
            return generateCoordinate(array,ship)
        }    
    }

    //ASSIGN TO ARRAY
    for(let c = 0; c < coordinate.length; c++){
        array[coordinate[c][0]][coordinate[c][1]] = mark
    }



}

let hit = 0;
let miss = 0;
function getShot(array , shot){
    shot[0] = translateWordToNum(shot[0])
    shot[1] = Number(shot[1])
    
    if(array[shot[0]][shot[1]] === ' '){
        array[shot[0]][shot[1]] = '/'
        miss++
    }else if(array[shot[0]][shot[1]] === 'a'){
        changeAr('a')
        hit++
    }else if(array[shot[0]][shot[1]] === 'b'){
        changeAr('b')
        hit++
    }else if(array[shot[0]][shot[1]] === 'c'){
        changeAr('c')
        hit++
    }else if(array[shot[0]][shot[1]] === 'd'){
        changeAr('d')
        hit++
    }


    function changeAr(str){
        for(let i = 0; i  < array.length; i++){
            for(let j = 0; j < array[i].length; j++){
                if(array[i][j] === str)array[i][j] = 'x'
            }
        }
    }
}


generateCoordinate(board,ships.aircraft)
generateCoordinate(board,ships.battleship)
generateCoordinate(board,ships.cruiser)
generateCoordinate(board,ships.destroyer)

console.log(board)

for(let i = 0; i < coords.length; i++){
    let coord = coords[i].split('')
    getShot(board,coord)
}

// getShot(board, coord)
console.log('--------------------')
console.log(board)
console.log('HIT :', hit)
console.log('MISS : ', miss)
// console.log(getShot(coord))

