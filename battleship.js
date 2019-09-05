function tables(num) {
    let alphabet = (' abcdefghijklmnopqrstuvwxyz').toUpperCase()
    let output = []
    for(let i = 0 ; i < num; i++){
        output.push([])
        for(let j = 0 ; j < num; j++){
            if (i != 0 && j == 0) {
                output[i].push(alphabet[i-j])
            } else if ( i == 0 && j != 0){
                output[i].push(j.toString())
            } else {
                output[i].push(' ')
            }
        }
    }
    return output
}
let tablesShip = tables(11)


const kapal = {
    aircraft: {ship:'a',lengthS: 5},
    battleship: {ship:'b',lengthS: 4},
    cruiser: {ship:'c',lengthS: 3},
    destroyer: {ship:'d',lengthS: 2}
}

function game(table,kapal){
    let ship = kapal.ship
    let lengthS = kapal.lengthS

    let headOfShip = Math.ceil(Math.random()*9)
    let column = Math.ceil(Math.random()*9)
    let horiOrVerti = Math.round(Math.random())
    
    let coordinat = []

    if(horiOrVerti === 0){
        for(let i = headOfShip; i < headOfShip+lengthS; i++){    
            if(i > 10) {
                return game(table,kapal)
            } else {
                coordinat.push([column,i])
            }
        }
    } else {
        for(let i = headOfShip; i < headOfShip+lengthS; i++){    
            if(i > 10) {
                return game(table,kapal)
            } else {
                coordinat.push([i,column])
            }    
        }
    }

    for(let i = 0; i < coordinat.length; i++){
        if(table[coordinat[i][0]][coordinat[i][1]] !== ' ' || table[coordinat[i][0]][coordinat[i][1]] === undefined){
            return game(table,kapal)
        }
    }

    for(let l = 0; l < coordinat.length; l++){
        table[coordinat[l][0]][coordinat[l][1]] = ship
    }
}
game(tablesShip,kapal.aircraft)
game(tablesShip,kapal.battleship)
game(tablesShip,kapal.cruiser)
game(tablesShip,kapal.destroyer)
console.log(tablesShip);

function tembakan(hayoTembak) {
    for(let i = 0 ; i < hayoTembak.length; i++){
        let luncurkan = tembakCapekKak(hayoTembak[i])
        // istirahat kak lelah besok livecode
    }
}
let shot = []
tembakan(shot)

function tembakCapekKak(convert){
    convert.split('')

}
