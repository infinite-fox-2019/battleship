// Your code here

let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let coords = process.argv.slice(2)



function translateNumToWord(num){
    for(let i = 0; i < alphabet.length; i++){
        if(i === num) {
            return alphabet[i]
        }
    }
}


function translateWordToNum(word){
    for(let i = 0; i < alphabet.length; i++){
        if(alphabet[i] === word){
            return i
        }
    }
}


// BOARD GENERATOR
let board = []
for(let i = 0; i <= 9; i++){
    var store = []
    for(let j = 0; j <= 9; j++){
        if(j === 0){
            store.push(translateNumToWord(i))
        }
        else if(i === 0){
            store.push(j)
        }
        else {
            store.push(' ')
        }
    }
    board.push(store)
    store = []
}

const ships = {
    aircraft: {name:'a',size: 5},
    battleship: {name:'b',size: 4},
    cruiser: {name:'c',size: 3},
    destroyer: {name:'d',size: 2}
}

function generateCoordinate(array,ship){
    let length = ship.size
    let name = ship.name

    let start = Math.ceil(Math.random()*9)
    let column = Math.ceil(Math.random()*9)

    //GENERATE COORDINATE
    let coordinate = []
    let random = Math.round(Math.random())
    if(random === 0){
        for(let i = start; i < start + length; i++){
            if(i > 9) {
                return generateCoordinate(array,ship)
            }
            else {
                coordinate.push([column,i])
            }
        }
    }else{
        for(let i = start; i < start + length; i++){
            if(i > 9){
                return generateCoordinate(array,ship)
            }
            else {
                coordinate.push([i,column])
            }
        }
    }

    //CHECK COORDINATE
    for(let index = 0; index < coordinate.length; index++){
        if(array[coordinate[index][0]][coordinate[index][1]] !== ' ' ||
            array[coordinate[index][0]][coordinate[index][1]] === undefined){
            return generateCoordinate(array,ship)
        }
    }

    //ASSIGN TO ARRAY
    for(let i = 0; i < coordinate.length; i++){
        array[coordinate[i][0]][coordinate[i][1]] = name
    }



}

let hit = 0
let miss = 0


function getShot(array , shotCoordinates){
    shotCoordinates[0] = translateWordToNum(shotCoordinates[0])
    shotCoordinates[1] = Number(shotCoordinates[1])

    if(array[shotCoordinates[0]][shotCoordinates[1]] === ' '){
        array[shotCoordinates[0]][shotCoordinates[1]] = '/'
        miss++
    }else if(array[shotCoordinates[0]][shotCoordinates[1]] === 'a'){
        changeArr('a')
        hit++
    }else if(array[shotCoordinates[0]][shotCoordinates[1]] === 'b'){
        changeArr('b')
        hit++
    }else if(array[shotCoordinates[0]][shotCoordinates[1]] === 'c'){
        changeArr('c')
        hit++
    }else if(array[shotCoordinates[0]][shotCoordinates[1]] === 'd'){
        changeArr('d')
        hit++
    }


    function changeArr(str){
        for(let i = 0; i  < array.length; i++){
            for(let j = 0; j < array[i].length; j++){
                if(array[i][j] === str)array[i][j] = 'X'
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


console.log('========================================================')
console.log(board)
console.log('HIT :', hit)
console.log('MISS : ', miss)