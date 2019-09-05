// Your code here
let argumentsTable = process.argv.splice(2)
let fleetTable = [
    {
        name: 'Aircraft carrier',
        size: 5
    },
    {
        name: 'Battleship',
        size: 4
    },
    {
        name: 'Cruiser',
        size: 3
    },
    {
        name: 'Destroyer',
        size: 2
    }
]

function generateBoard(){
    let kamus = 'ABCDEFGHIJ'
    let board = []
    let nomor = 1
    let l = -1
    for(let i=0; i<=10; i++){
        board.push([])
        for(let j=0; j<=10; j++){
            if(i===0 && j!==0){
                board[i].push(String(nomor))
                nomor+=1
            }else if(j===0){
                board[i].push(kamus[l])
                l+=1
            }else{
                board[i].push(' ')
            }
        }
        if(board[0][0]===undefined){
            board[0][0] = ' '
        }
    }
    return board
}

function randomPlace(arr){
    let random = Math.floor(Math.random()*10)+1
    let codeAircraft = 'a'
    let codeBattle = 'b'
    let codeCruiser = 'c'
    let codeDestroyer = 'd'
    for(let i=0; i<=5; i++){
        if(arr[i][random] === ' '){
            arr[i][random] = codeAircraft
        }
    }
    random = Math.floor(Math.random()*10)+1
    for(let j=0; j<=4; j++){
        if(arr[j][random] === ' '){
            arr[j][random] = codeBattle
        }
    }
    random = Math.floor(Math.random()*10)+1
    for(let j=0; j<=3; j++){
        if(arr[j][random] === ' '){
            arr[j][random] = codeCruiser
        }
    }
    random = Math.floor(Math.random()*10)+1
    for(let j=0; j<=2; j++){
        if(arr[j][random] === ' '){
            arr[j][random] = codeDestroyer
        }
    }
    //HIT 
    let count = 0
    while(count<argumentsTable.length){
        for(let x=0; x<arr.length; x++){
            for(let k=0; k<arr[x].length; k++){
                if((arr[x][0]+arr[0][k])===argumentsTable[count]){
                    arr[x][k] = 'x'
                }
            }
        }
        count+=1
    }
    return arr  
}
console.log(randomPlace(generateBoard()))

