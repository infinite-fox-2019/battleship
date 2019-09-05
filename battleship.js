const kapal = [["a", 5], ["b", 4], ["c", 3], ["d", 2]]
const serang = process.argv.slice(2) // masukan berupa huruf kecil a-j digabung angka 1-10
const huruf = {
    " " : 0, a : 1, b : 2, c : 3, d : 4, e : 5, f : 6, g : 7, h : 8, i : 9, j : 10
}

function kosong (){
    let angka = 0
    let arr = []
    for(let i = 0 ; i<11 ; i++){
        arr.push([])
        for(let j = 0 ; j<11 ; j++){
            if (i == 0 && angka != 0){
                arr[arr.length-1].push(String(angka))
            }
            else if (j == 0 && angka != 0){
                arr[arr.length-1].push(Object.keys(huruf)[i])
            }
            else{
                arr[arr.length-1].push(" ")
            }
            angka++
        }
    }
    return arr
}


function isi (arrkosong) {
    let kosongan = arrkosong
    for (let i = 0 ; i<kapal.length ; i++){
        if(random(2)[0] == 0){ //vertikal
            while(true){
                let a = 0
                while (true){
                    a = random(10)
                    if ((a[0]+kapal[i][1]) < 10){
                        break
                    }
                }
                let flag = true
                for (let j = 0 ; j<kapal[i][1] ; j++){
                    if(kosongan[a[0]+j][a[1]] != " "){
                        flag = false
                    }
                }
                if(flag == true){
                    for (let j = 0 ; j<kapal[i][1] ; j++){
                        kosongan[a[0]+j][a[1]] = kapal[i][0]
                    }
                    break
                }
            }
        }
        else{ //horizontal
            while(true){
                let a = 0
                while (true){
                    a = random(10)
                    if ((a[1]+kapal[i][1]) < 10){
                        break
                    }
                }
                let flag = true
                for (let j = 0 ; j<kapal[i][1] ; j++){
                    if(kosongan[a[0]][a[1]+j] != " "){
                        flag = false
                    }
                }
                if(flag == true){
                    for (let j = 0 ; j<kapal[i][1] ; j++){
                        kosongan[a[0]][a[1]+j] = kapal[i][0]
                    }
                    break
                }
            }
        }
    }
    return kosongan
}

function main () {
    let arrkosong = kosong()
    let arrisi = isi(arrkosong)
    let kena = 0 
    let miss = 0
    for(let i = 0 ; i<serang.length ; i++){
        if (Object.keys(huruf).indexOf(serang[i][0]) != -1 && Number(serang[i][1]) < 11){
            if (arrisi[huruf[serang[i][0]]][Number(serang[i][1])] != " "){
                arrisi[huruf[serang[i][0]]][Number(serang[i][1])] = "X"
                kena++
            }
            else{
                arrisi[huruf[serang[i][0]]][Number(serang[i][1])] = "/"
                miss++
            }
        }
        else{
            return "Input salah"
        }
    }
    for(let j = 0 ; j<11 ; j++){
        console.log("|" + arrisi[j].join("|") + "|");
    }
    return `kena: ${kena} \nmiss: ${miss}`
}

function random (max) {
    while(true){
        let indexi = Math.floor(Math.random() * max)
        let indexj = Math.floor(Math.random() * max)
            return [indexi, indexj]
    }
}

console.log(main());
