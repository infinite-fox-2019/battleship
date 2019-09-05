let ships = {
    'aircraft carrier': 5,
    battleship: 4,
    cruiser: 3,
    destroyer: 2
}
let shipsKeys = Object.keys(ships);

function randomCoordinat () {
    let randomCoor = Math.floor((Math.random() * 10) + 1 );
    return randomCoor;
}

// console.log(verticalOrHorizontal);

function generateShips() {
    // return drawBox();
    let borderBox = drawBox();
    let koordinatBawah = [];
    let koordinatAtas = [];
    let xkoordinat = 0;
    let ykoordinat = 0;
    // return borderBox; borderBox[2][2] = '#';
    // for (let i = 0; i < shipsKeys.length; i++) {
        let verticalOrHorizontal = Math.floor(Math.random() *2);
        let x = randomCoordinat();
        let y = randomCoordinat();
        borderBox[3][3] = '#';
        borderBox[5][5] = '#';
        borderBox[7][8] = '#';
        borderBox[2][4] = '#';
        borderBox[1][7] = '#';
        borderBox[8][2] = '#';
        borderBox[9][6] = '#';
        borderBox[10][7] = '#';
        borderBox[3][9] = '#';
        if (borderBox[x][y] === ' ') {
            if (verticalOrHorizontal === 1) {
                xkoordinat = x;
                ykoordinat = y;
                borderBox[x][y] = '@';
                let isFind = false;
                for (let j = x+1; j <= x + ships[shipsKeys[0]]; j++) {
                    if (borderBox[j][y] === ' ') {
                        isFind = true;
                        koordinatBawah.push(j);
                    } else {
                        console.log('astaganaga');
                        break;
                    }
                }
                // for (let j = ships[shipsKeys[i]]; j > 0 ; j--) {
                //     if (borderBox[j][y] === ' ') {
                //         isFind = true;
                //         koordinatAtas.push(j);

                //     }
                // }
                // if (isFind === true) {

                // }
            }
            
        }
    // }
    // console.log(ships[shipsKeys[0]);
    console.log(`atas ${koordinatAtas}`);
    console.log(`bawah ${koordinatBawah}`);
    console.log(xkoordinat);
    console.log(ykoordinat);
    
    
    return borderBox;

}

function drawBox () {
    let borderBox = [];
    const lib = ['','A','B','C','D','E','F','G','H','I','J'];
    for (let i = 0; i <= 10; i++) {
        borderBox.push([]);
        for (let j = 0; j <= 10; j++) {
            if(i === 0 && j != 0) {
                borderBox[i].push(String(j));
            } else {
                if (j === 0) {
                    borderBox[i].push(lib[i]);
                }
               else {
                borderBox[i].push(' ');
               }
            }
        }
    }
    return borderBox;
}
console.log(generateShips());


