let map = [];
let shipLocation = [];
let ship = 5;
function boardGenerator(arr) {
    let arrDalam = [];
    const data = ['A','B','C','D','E','F','G','H','I','J'];
    let count = 0;
    for(let i = 0; i<11; i++){
        arrDalam = []
        for(let j = 0; j<23; j++){
            if(j % 2 == 0){
                arrDalam.push('|')
            }
            else{
                if(i == 0 && j == 1){
                    arrDalam.push('+');
                }
                else if(i == 0){
                    arrDalam.push((j-1)/2)
                }
                else if(j == 1){
                    arrDalam.push(data[count]);
                    count++
                }
                else{
                    arrDalam.push(' ');
                }
            }
        }

        arr.push(arrDalam)
    }
    map = arr;
    return map;
}
               
function battleshipGenerator(kapal){
    let arr = [];
    const dataH = [3,5,7,9,11,13,15,17,19,21];
    const dataV = [1,2,3,4,5,6,7,8,9,10];
    
    
    if(shipLocation.length == 0){
        // if random 0 => horizontal
        // if random 1 => vertical
        let random = Math.floor(Math.random() * 2);
        if(random == 0){
            let randomH = dataH[Math.floor(Math.random() * (dataH.length - kapal - 1))];
            let randomV = dataV[Math.floor(Math.random() * dataV.length)];
            for(let i = 0; i<kapal; i++){
                if(i%2 == 1){
                    shipLocation.push([randomV,randomH + i+1])
                }
                else{
                    shipLocation.push([randomV,randomH + i+2])
                }
            }
        }
        else{
            let randomH = dataH[Math.floor(Math.random() * dataH.length)];
            let randomV = dataV[Math.floor(Math.random() * (dataV.length - kapal - 1))];
            for(let i = 0; i<kapal; i++){
                shipLocation.push([randomV + i,randomH])
            }
        }
    }
    else{
        let acak = Math.floor(Math.random() * 2);
        if(acak = 0){
            let randomH = dataH[Math.floor(Math.random() * (dataH.length - kapal - 1))];
            let randomV = dataV[Math.floor(Math.random() * dataV.length)];
            for(let i = 0; i<kapal; i++){
                console.log(shipLocation);
                console.log('=====================');  
                for(j = 0; j<shipLocation.length; j++){
                    if(i%2 == 1){
                        if([randomV,randomH + i+1] == shipLocation[j]){
                            console.log(1);
                            
                            return battleshipGenerator(kapal)
                        }
                    }
                    else{
                        arr.push([randomV,randomH + i+2])
                        if([randomV,randomH + i+2] == shipLocation[j]){
                            console.log(1);
                            
                            return battleshipGenerator(kapal)
                        }
                    }
                    
                }
                if(i%2 == 1){
                    arr.push([randomV,randomH + i+1])
                }
                else{
                    arr.push([randomV,randomH + i+2])
                }
            }
        }
        else{
            let randomH = dataH[Math.floor(Math.random() * dataH.length)];
            let randomV = dataV[Math.floor(Math.random() * (dataV.length - kapal - 1))];
            for(let i = 0; i<kapal; i++){
                console.log(shipLocation);
                console.log('=====================');
                for(j = 0; j<shipLocation.length; j++){
                    if([randomV + i,randomH] == shipLocation[j]){
                        console.log(1);
                        
                        return battleshipGenerator(kapal)
                    }
                }
                arr.push([randomV + i,randomH])
            }
        }
    }
    kapal--;
    ship = kapal;
    shipLocation = shipLocation.concat(arr);
    return shipLocation;
}

function shipPlacement(lokasi){
    for(let i = 0; i<lokasi.length; i++){
        map[lokasi[i][0]][lokasi[i][1]] = '!';
        // console.log(lokasi[i][0], lokasi[i][1]);
    }
}

boardGenerator(map);
while(ship>1){
    
    battleshipGenerator(ship, shipLocation)
}

shipPlacement(shipLocation);


for(let i = 0; i<map.length; i++){
    console.log(map[i].join(''));
}
console.log(shipLocation);

