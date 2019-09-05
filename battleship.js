// Your code here

var alphabet = ' ABCDEFGHIJ'
function generateBoard(){
    let board = []
    let row = 10
    let col = 10
   
    for(let i = 0; i<row+1 ; i++){
        let temp = []
        for(let j = 0 ; j<col+1; j++){
            if(j === 0){
                temp[j] = alphabet[i]
            }
            else if(i === 0){
                temp[j] = ''+j
            }else{
                temp.push(' ')
            }
        }
        board.push(temp)
    }
    return board
}

function battleshipA (){
    // console.log('kapal')
    let positionA = []
    let check = false
    let ocean = generateBoard()
     
        while(check === false){
           
        let x = Math.floor(Math.random()*10)
        let y = Math.floor(Math.random()*10)

            if(x !== 0 && x < 6 && ocean[x][y] === ' ' && ocean[x+1][y] === ' ' && ocean[x+2][y] === ' ' && ocean[x+3][y] === ' ' && ocean[x+4][y] === ' '){
                check = true
                positionA.push([x,y],[x+1,y],[x+2,y],[x+3,y],[x+4,y])
            }
            else if(y !== 0 && y < 6 && ocean[x][y] === ' ' && ocean[x][y+1] === ' ' && ocean[x][y+2] === ' ' && ocean[x][y+3] === ' ' && ocean[x][y+4] === ' '){
                check = true
                positionA.push([x,y],[x,y+1],[x,y+2],[x,y+3],[x,y+4])
            }
        }     
        for(let i = 0; i<positionA.length; i++){

           ocean[positionA[i][0]][positionA[i][1]] = '😛'

        //    console.log(positionA[i])
        }
        return ocean
    }


//  console.log(battleshipA())

 function battleshipB (){
    // console.log('kapal')
    
    let positionB = []
    let check = false
    let ocean = battleshipA ()
     
        while(check === false){

            let x = Math.floor(Math.random()*10)
            let y = Math.floor(Math.random()*10)    
           
            if(x !== 0 && x < 6 && ocean[x][y] === ' ' && ocean[x+1][y] === ' ' && ocean[x+2][y] === ' ' && ocean[x+3][y] === ' '){
                check = true
                positionB.push([x,y],[x+1,y],[x+2,y],[x+3,y])
            }
            else if(y !== 0 && y < 6 && ocean[x][y] === ' ' && ocean[x][y+1] === ' ' && ocean[x][y+2] === ' ' && ocean[x][y+3] === ' '){
                check = true
                positionB.push([x,y],[x,y+1],[x,y+2],[x,y+3])
            }
        }     
        for(let i = 0; i<positionB.length; i++){

           ocean[positionB[i][0]][positionB[i][1]] = '😈‍'

        //    console.log(positionA[i])
        }
        return ocean
    }


    //  console.log(battleshipB())

 function battleshipC (){
    // console.log('kapal')
   
    let positionC = []
    let check = false
    let ocean = battleshipB ()
     
        while(check === false){

            let x = Math.floor(Math.random()*10)
            let y = Math.floor(Math.random()*10)
            if(x !== 0 && x < 6 && ocean[x][y] === ' ' && ocean[x+1][y] === ' ' && ocean[x+2][y] === ' '){
                check = true
                positionC.push([x,y],[x+1,y],[x+2,y])
            }
            else if(y !== 0 && y < 6 && ocean[x][y] === ' ' && ocean[x][y+1] === ' ' && ocean[x][y+2] === ' '){
                check = true
                positionC.push([x,y],[x,y+1],[x,y+2])
            }
        }     
        for(let i = 0; i<positionC.length; i++){

           ocean[positionC[i][0]][positionC[i][1]] = '💩'

        //    console.log(positionA[i])
        }
        return ocean
    }

//  console.log(battleshipC())

 function battleshipD (){
    // console.log('kapal')
  
    let positionD = []
    let check = false
    let ocean = battleshipC ()
     
        while(check === false){

            let x = Math.floor(Math.random()*10)
            let y = Math.floor(Math.random()*10)    
            
            if(x !== 0 && x < 6 && ocean[x][y] === ' ' && ocean[x+1][y] === ' '){
                check = true
                positionD.push([x,y],[x+1,y])
            }
            else if(y !== 0 && y < 6 && ocean[x][y] === ' ' && ocean[x][y+1] === ' '){
                check = true
                positionD.push([x,y],[x,y+1])
            }
        }     
        for(let i = 0; i<positionD.length; i++){

           ocean[positionD[i][0]][positionD[i][1]] = '🙈'

        //    console.log(positionA[i])
        }
        return ocean
    }

// function checker (){
//     let bomb = process.argv.slice(2)
//     let ocean = battleshipD ()

//     for(let i = 0 ; i<bomb.length; i++){
//         for(let j = 0 ; j<ocean.length; j++){
            
//             console.log(ocean[j].indexOf(bomb[i][0]))

//         }
//         // console.log(bomb[i][0])    
//     }

    
    
    // console.log(alphabet)
    // return ocean

}

 console.log(checker())