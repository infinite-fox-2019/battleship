// Your code here
function board (){
  let outBoard = []
  const alpha = '/ABCDEFGHIJ'
  for (let i = 0; i<=10;i++){
    let output = []
    for (let j =1; j<=10;j++){
      if (j == 1){
        output.push(i) 
      }
      if (i == 0){
        output.push (alpha[j])
      }else
      output.push(' ')
    }
    outBoard.push(output)
  }
  return outBoard
}

let papan = board()

const kapal = {
  aircraftCarier: {sign: 'w', size:5},
  battleShip: {sign: 'q', size:4},
  cruiser: {sign: 's', size:3},
  destroyer: {sign: 'd', size:2}
}

function ship(papanSign,shipSign){

  let length = shipSign.size
  let sign = shipSign.sign

  let koordinat = []
  let randomKoor = Math.round(Math.random())
  
  let kepala = Math.round((Math.random())*9)
  
  if(kepala+length > 10) return ship(papanSign,shipSign)
  if (randomKoor === 0) {
    for(let i = kepala; i<kepala+length;i++){
      koordinat.push([kepala,i])
    }
  }
  if (randomKoor === 1) {
    for(let j = kepala; j<kepala+length;j++){
      koordinat.push([j,kepala])
    }
  } 
  for(let k = 0; k<koordinat.length;k++){
     if (papanSign[koordinat[k][0]][koordinat[k][1]] !== ' ' && papanSign[koordinat[k][0]][koordinat[k][1]] !== undefined){
      return ship(papanSign,shipSign)
     }
  }
  for(let z = 0; z<koordinat.length; z++){
    papanSign[koordinat[z][0]][koordinat[z][1]] = sign
  }

}

ship(papan,kapal.aircraftCarier)
ship(papan,kapal.battleShip)
ship(papan,kapal.cruiser)
ship(papan,kapal.destroyer)
console.log(papan)


/////////////////////////////////////////////

let nembakKoor = process.argv.slice(2)

for(let i = 0; i<nembakKoor.length;i++){
  let nembak = nembakKoor[i].split('')
  meledak(papan,nembak)
}

function wordNumber(huruf){
  let word = 'ABCDEFGHIJ'
  for(let j = 0; j<word.length-1;j++){
    if(huruf == word[j]){
      return j+1
    }
  }
}

function meledak(adaKapal, koorTembak){
  let hit = 0
  let miss = 0
    console.log(koorTembak)
    koorTembak[0] = wordNumber(koorTembak[0])
    koorTembak[1] = Number(koorTembak[1])

    console.log(koorTembak[0])
    console.log(adaKapal [koorTembak[0]][koorTembak[1]])

    if(adaKapal[koorTembak[0]][koorTembak[1]] == ' '){
      adaKapal[koorTembak[0]][koorTembak[1]] = '/'
      miss++
    }

}