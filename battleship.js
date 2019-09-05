
//fleetTable
/*
#  | Ship              | Size
1x | Aircraft carrier  | 5
1x | Battleship        | 4
1x | Cruiser           | 3
1x | Destroyer         | 2
*/

//input terminal = node battleship.js J2 B9 A7 E8 C1 H5 I6 D1
//catat semua random sampai gada yg tabrakan dulu baru print board nya
//dibatasi board utk 10x10


let attack = process.argv.slice(2)
console.log(attack);

const damage = {
    miss: 'o', 
    dead: 'x'
}

const fleet = [
    {ship: 'Aircraft carrier', size: 5, sign: 'A'},
    {ship: 'Battleship', size: 4, sign: 'B'}, 
    {ship: 'Cruiser', size: 3, sign: 'C'}, 
    {ship: 'Destroyer', size: 2, sign: 'D'}
]

//random kepala, i dan j dibuat dari 1 - 10, sesuai ketersediaan petak
// DAN agar tidak kena 0, which is label boardside
function shipAnchor() {
    let forI = Math.floor(Math.random() * 10) + 1
    console.log(forI);
    let forJ = Math.floor(Math.random() * 10) + 1
    console.log(forJ);
    let head = [forI, forJ]
    console.log(head);
    theShips(forI, forJ)
}
shipAnchor()
//random arah
function shipFace(){
    let face = Math.floor(Math.random() * 2)
    //0 = vertikal (i bertambah)
    //1 = horizontal (j bertambah)
    console.log(face);   
}
shipFace()

//cek tabrakan gak
//0 = vertikal (i bertambah)
//1 = horizontal (j bertambah)
function theShips (forI, forJ) {
    let seaBoard = battleField()
    console.log("-------");
    for (let j=0; j<seaBoard.length; j++) {
        console.log(seaBoard);
        if (seaBoard[forI, forJ] === ' ') {
            for (let k=0; k<fleet.length; k++) {
                for (let l=0; l<fleet[k].size; l++) {
                    if (face === 0) {
                        seaBoard[forI++, forJ] = fleet[k].sign
                        console.log(seaBoard[forI++, forJ]);
                    } else if (face === 1) {
                        seaBoard[forI, forJ++] = fleet[k].sign
                        console.log(seaBoard[forI++, forJ])
                    }   
                }
            }
        } //else shipFace
    }
}
console.log(theShips());

function bomb () {
    for (let i=0; i<attack.length; i++) {
        
    }
}

function battleField(matrix) {
    let count = 0
    let lib = 'ABCDEFGHIJ'
    let border = []
    let field = []
    for (let i=0; i<matrix; i++) {
        field = []
        for (let j=0; j<matrix; j++) {
            if (i != 0 && j === 0) {
                field.push(lib[i-1])
            } else if (j != 0 && i ===0) {
                field.push(count)
            } else {
                field.push(' ')
            }
            count++
        }
        border.push(field)
    }
    return border
}
console.log(battleField(11));

