
//stuck sampai menemukan titik kepala
//belum kepikiran untuk rekursif nya

function board(baris, kolom){

    let board = []
    for(let i=0; i<baris+1; i++){
        let row = []
        for(let j=0; j<kolom+1; j++){
            let str = ""
            if(i===0 && i!==j){
                str = `${j}`
            }else{
                str = ` `
            }
            row.push(str)
            
        }
        board.push(row)
    }
    return board
}


function finalBoard(baris, kolom){
    let labelKolom =[" ","A","B","C","D","E","F","G","H","I","J"]
    let base = board(baris, kolom)
    //console.log(base[1][2])

    for(let i=0; i<labelKolom.length; i++){
        //console.log(labelKolom[i])
        base[i][0]=`${labelKolom[i]}`
    }

   return base

 
}
    
function PlaceCoordinate(kapal){

    
    for(let i in kapal){
        let randomI = Math.floor(Math.random()*10)+1
        let randomJ = Math.floor(Math.random()*10)+1
        let randomHV = Math.floor(Math.random()*2)
        ships[i].position.push(randomI, randomJ, randomHV)
        //console.log(ships[i].name, randomI, randomJ, randomHV)
        //console.log(kapal[i])
    }
    
    return kapal
    

}

const ships = [
    {name: "aircraft", length: 5, position: []},
    {name: "battleship", length: 4, position: []},
    {name: "cruiser", length: 3, position: []},
    {name: "destroyer", length: 2, position: []}
]

/*
let fleetList = {
    "aircraft":5,
    "battleship":4,
    "cruiser":3,
    "destroyer":2
}
*/

function placingShips(kapal, baris, kolom){
    let shipsCordinate=PlaceCoordinate(kapal)
    let template = finalBoard(baris, kolom)

    for(let i in shipsCordinate){
        
        //console.log(shipsCordinate[i].position)
        template[shipsCordinate[i].position[0]][shipsCordinate[i].position[1]]="X"
        //console.log(shipsCordinate[i].length)
        if(shipsCordinate[i].position[2]===0){
            template[shipsCordinate[i].position[0]][shipsCordinate[i].position[1]]
            for(let j=0; j<shipsCordinate[i].length; j++){
                shipsCordinate[i].position[1]++
                //console.log(j)
                console.log(shipsCordinate[i])
            }
        }else{
            template[shipsCordinate[i].position[0]][shipsCordinate[i].position[1]]
            for(let k=0; k<shipsCordinate[i].length; k++){
                shipsCordinate[i].position[0]++
                //console.log(k)
                console.log(shipsCordinate[i])
            }
      
        }
        
    }

    console.log(template)
}

console.log(placingShips(ships, 10, 10))