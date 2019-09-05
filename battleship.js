const ships = [
    { name: 'Aircraft', size: 5, sign: 'A' },
    { name: 'Battleship', size: 4, sign: 'B' },
    { name: 'Cruiser', size: 3, sign: 'C' },
    { name: 'Destroyer', size: 2, sign: 'D' },
  ]

function generateBoard() {
    let alphabet = 'ABCDEFGHIJ';
    let output = [];

    for(let i = 0; i < 11; i++) {
        output.push([]);
        for(let j = 0; j < 11; j++) {
            if(i !== 0 && j == 0) {
                output[i].push(alphabet[i-1])
            } else if(i == 0 && j !== 0) {
                output[i].push(j);
            } else {
                output[i].push(' ');
            }
        }
    }
    return output;
}
console.log(generateBoard());

// function printBoard(arr){
//     for(let i = 0; i<arr.length;i++){
//         console.log(arr[i].join(', '));
//     }
// }
// printBoard(generateBoard());