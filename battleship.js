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


function generateShips1() {
    let borderBox = drawBox();
    const simbol = ['@','?','^','&'];
    let koordinatBawah = [];
    let koordinatAtas = [];
    let xkoordinat = 0;
    let ykoordinat = 0;
    for (let i = 0; i < 5; i++) {
        let verticalOrHorizontal = Math.floor(Math.random() *2);
        let x = randomCoordinat();
        let y = randomCoordinat();
        if (borderBox[x][y] === ' ') {
            if (verticalOrHorizontal === 1) {
                xkoordinat = x;
                ykoordinat = y;
                let isFind = false;
                if (x+ships[shipsKeys[i]] <= 10) {
                    for (let j = x+1; j <= x + ships[shipsKeys[i]]; j++) {
                        if (borderBox[j][y] === undefined) {
                            generateShips1();
                        }
                        if (borderBox[j][y] === ' ') {
                            isFind = true;
                            koordinatBawah.push(j);
                        } else {
                            isFind = false;
                            break;
                        }
                    }
                    if (isFind === true) {
                        
                        for (let k = 0; k < koordinatBawah.length; k++) {
                            borderBox[koordinatBawah[k]][y] = simbol[i];
                        }
                    }
                }
            } else {
                xkoordinat = x;
                ykoordinat = y;
                let isFind = false;
                if (x+ships[shipsKeys[i]] <= 10) {
                    for (let j = y+1; j <= y + ships[shipsKeys[i]]; j++) {
                        if (borderBox[x][j] === undefined) {
                            generateShips1();
                        }
                        if (borderBox[x][j] === ' ') {
                            isFind = true;
                            koordinatBawah.push(j);
                        } else {
                            isFind = false;
                            break;
                        }
                    }
                    if (isFind === true) {
                        
                        for (let k = 0; k < koordinatBawah.length; k++) {
                            borderBox[x][koordinatBawah[k]] = simbol[i];
                        }
                    }
                }
            }   
        }
    }
  
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
console.log(generateShips1());


