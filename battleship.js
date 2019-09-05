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
    let yumn = Math.ceil(Math.random()*9)
    let horiOrVerti = Math.round(Math.random())
    
    let coordinat = []

    if(horiOrVerti === 0){
        for(let i = headOfShip; i < headOfShip+lengthS; i++){    
            if(i > 10) {
                return game(table,kapal)
            } else {
                coordinat.push([yumn,i])
            }
        }
    } else {
        for(let i = headOfShip; i < headOfShip+lengthS; i++){    
            if(i > 10) {
                return game(table,kapal)
            } else {
                coordinat.push([i,yumn])
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

function tembakCapekKak(input){
    let checking = input.split('')
    let indexY = Number(checking[1])
    let indexX = Infinity

    switch(checking[0]){
        case 'A' : {indexX = 1; break;}
        case 'B' : {indexX = 2; break;}
        case 'C' : {indexX = 3; break;}
        case 'D' : {indexX = 4; break;}
        case 'E' : {indexX = 5; break;}
        case 'F' : {indexX = 6; break;}
        case 'G' : {indexX = 7; break;}
        case 'H' : {indexX = 8; break;}
        case 'I' : {indexX = 9; break;}
        case 'J' : {indexX = 10; break;}
        default : return 'KOORDINAT SALAH'
    }
    return {x : indexX, y : indexY}
}

let countKena = {
    a:0,
    b:0,
    c:0,
    d:0,
}
let countMiss = 0;
let countTotalTembak = 0;

function tembakan(hayoTembak) {
    for(let i = 0 ; i < hayoTembak.length; i++){
        let luncurkan = tembakCapekKak(hayoTembak[i].toUpperCase())
        // istirahat kak lelah besok livecode
        let x = luncurkan.x;
        let y = luncurkan.y;

        switch(tablesShip[x][y]){
            case 'a' : {tablesShip[x][y] = '🔥'
                        countTotalTembak++
                        countKena.a += 1
                        ; break;}
            case 'b' : {tablesShip[x][y] = '🔥'
                        countTotalTembak++
                        countKena.b += 1
                        ; break;}
            case 'c' : {tablesShip[x][y] = '🔥'
                        countTotalTembak++
                        countKena.c += 1
                        ; break;}
            case 'd' : {tablesShip[x][y] = '🔥'
                        countTotalTembak++
                        countKena.d +=1
                        ; break;}
            case ' ' : {tablesShip[x][y] = '/'
                        countTotalTembak++
                        countMiss++
                        ; break;}
        }
    }
}
let shot = process.argv.slice(2)
// console.log(shot);
tembakan(shot)

if (shot.length == 0) {
    console.log('KIRIMKAN SERANGAN!');
} else {
    console.log(tablesShip);
    console.log('\n');
    for(var i in countKena){
        if (i == 'a') {
            if (countKena[i] !== 0) {
                console.log(`kapal aircraft tertembak sebanyak ${countKena[i]}`);
            }
        } else  if (i == 'b') {
            if (countKena[i] !== 0) {
                console.log(`kapal battleship tertembak sebanyak ${countKena[i]}`);
            }
        } else  if (i == 'c') {
            if (countKena[i] !== 0) {
                console.log(`kapal cruiser tertembak sebanyak ${countKena[i]}`);
            }
        } else  if (i == 'd') {
            if (countKena[i] !== 0) {
                console.log(`kapal destroyer tertembak sebanyak ${countKena[i]}`);
            }
        }
    }

    console.log(`total serangan yang dikirimkan ${countTotalTembak}`);
    console.log(`serangan yang gagal mengenai sasaran ${countMiss}`);
}