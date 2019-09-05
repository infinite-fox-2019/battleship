// Your code here
function generateBoard(){
    let arrBoard = [];
    for(let i = 0;i<10;i++){
        arrBoard.push([]);
        for (let j = 0;j<10;j++){
            if(i==0 && j==0){
                arrBoard[i].push("START");
            } else if (j == 0){
                arrBoard[i].push(String.fromCharCode(96+i).toUpperCase());
            } else if (i == 0){
                arrBoard[i].push(j);
            } else {
                arrBoard[i].push(" ");
            }
        }
    }
    return arrBoard;
}

function gachaKapal(){
    let bool = false;
    let enterprise = {panjang:5,mark:"5"};
    let yamato = {panjang:4,mark:"4"};
    let prinzEugen = {panjang:3,mark:"3"}
    let fubuki = {panjang:2,mark:"2"};
    let arrKapal = [enterprise,yamato,prinzEugen,fubuki];
    let daduKapal = Math.round(Math.random()*3);
    return arrKapal[daduKapal];
}
let kapalTerpilih = gachaKapal();
function penempatanKapal(){
    // let kapalTerpilih = gachaKapal();
    // kapalTerpilih = {panjang:2,mark:"2"}
    let Board = generateBoard();
    let start= [Math.round(Math.random()*10), Math.round(Math.random()*10)];
    console.log(kapalTerpilih)
    console.log(start)
    let arah = Math.round(Math.random());
    console.log(arah)
    let bool = false;
    let koordinatKapal = [];
    let angka1 = start[0]+ kapalTerpilih.panjang;
    let angka2 = start[1]+ kapalTerpilih.panjang;
    // while (!bool){
    //     if (angka1>Board.length)return penempatanKapal();
    //     else if(angka2>Board.length) return penempatanKapal();
    //     else {
    //         for(let i = 0; i <Board.length;i++){
    //             if(i == start[0]){
    //                 for(let j = 0; j<Board[i].length;j++){
    //                     let count = j;
    //                     if(Board[i][j]== undefined || Board[i][j] !=" "){
    //                         return penempatanKapal();
    //                     } else {
    //                         for(let k = 0; k<kapalTerpilih.panjang;k++){
    //                             koordinatKapal.push([i,j]);
    //                             Board[i][j] = koordinatKapal
    //                         }
    //                         bool = true;
    //                         break;
    //                     } 
    //                 }
    //             }
    //         }
    //     }
    // }
    // while(!bool){

    // }
    while(!bool){
        if(start[0] == 0)return penempatanKapal();
        else if(start[1] == 0)return penempatanKapal();
        else if (start[0]<11&&start[1]<11) {
            for(let i = 0; i < Board.length; i++){
                if(start[0]==i&&arah == 0 && angka1<Board.length){
                    for(let j =0;j<Board[i].length;j++){
                        if (j == start[1]&&angka2<Board[i].length){
                            let count = j;
                            for(let k = 0;k<kapalTerpilih.panjang;k++){
                                if(Board[count]){
                                    Board[i][count] = kapalTerpilih.mark;
                                    koordinatKapal.push([i,count])
                                    console.log(koordinatKapal);
                                    count++;
                                } else {
                                    bool = true;
                                }
                                // Board[i][count] = kapalTerpilih.mark;
                                // count++;
                            }
                            bool = true;
                            break;
                        } else{
                            // return penempatanKapal();
                        }
                    }
                } else if (start[0]==i&&arah == 1 && angka1<Board.length){
                    for(let j =0;j<Board[i].length;j++){
                        if (j == start[1]&&angka2<Board[i].length){
                            let count = i;
                            for(let k = 0;k<kapalTerpilih.panjang;k++){
                                if(Board[count]){
                                    Board[count][j] = kapalTerpilih.mark;
                                    koordinatKapal.push([count,j])
                                    console.log(koordinatKapal);
                                    count++;
                                } else {
                                    bool = true;
                                }
                            }
                            bool = true;
                            break;
                        } else {
                            // return penempatanKapal();
                        }
                    }
                }
            }
        } else {
            penempatanKapal();
            break;
        }
    }
    return Board;
}

// console.log(generateBoard());
// console.log(gachaKapal());
console.log(penempatanKapal());