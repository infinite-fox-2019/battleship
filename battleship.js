// Your code here
let kapal = [{nama : 'aircraft', size : 5, mark : 'A'},
            {nama : 'battleship', size : 4, mark : 'B'},
            {nama : 'cruiser', size : 3, mark : 'C'},
            {nama : 'destroyer', size : 2, mark : 'D'}
            ]

function board(){
    let numb = [0,1,2,3,4,5,6,7,8,9,10]
    let huruf = 'zABCDEFGHIJ'
    let result = []
    for(let i = 0; i < 11; i++){
        let temp =[]
        for(let j = 0; j < 11; j++){
            if(i == 0 && j != 0){
                temp.push((numb[j]).toString())
            }  else if(j == 0 && i != 0){
                temp.push(huruf[i])
            } else {
                temp.push(' ')
            }
        }
        result.push(temp)
        temp = []
    }
    return result
}

let boards = board()
function koordinat(ship){
    let arr = []
    let head = Math.ceil(Math.random()*10)
    let randomArah = Math.round(Math.random())
    let length = ship.size
    let mark = ship.mark

    if(head + length > 9){
        return koordinat(ship)
    }
    if(randomArah == 0){
        for(let i = head; i < head + length; i++){
            arr.push([head, i])
        }
    } else {
        for(let i = head; i < head + length; i++){
            arr.push([i, head])
        }
    }
    
    if(cekKoordinat(arr, boards) == true){
        for(let i = 0; i < arr.length; i++){
            boards[arr[i][0]][arr[i][1]] = mark
        }
    } else {
        return koordinat(ship)
    }
}

function cekKoordinat(arr,boards){
    for(let i = 0; i < arr.length; i++){
        if(boards[arr[i][0]][arr[i][1]] == ' ' && boards[arr[i][0]][arr[i][1]] != undefined){
            return true
        } else {
            return false
        }
    }
}


for(let i = 0; i < kapal.length; i++){
    koordinat(kapal[i])
}
console.log(boards);


