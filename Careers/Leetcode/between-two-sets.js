function getTotalX(a, b) {
    // Write your code here
    const maxA = a.sort((aDt, bDt)=>bDt - aDt)[0];
    const minB = b.sort((aDt, bDt)=>aDt - bDt)[0];
    
    let count=0;
    let res = []
    for(let i=maxA; i<=minB; i++){
        let satisfied = true;
        
        for(let ai = 0; ai<a.length; ai++){
            if(i%a[ai] !== 0){
                satisfied=false
                break
            }
        }
        if(!satisfied) continue
        
        for(let bi = 0; bi<b.length; bi++){
            if(b[bi]%i !== 0){
                satisfied=false
                break
            }
        }
        if(!satisfied) continue
        count++;
        res.push(i)
    }
    console.log(res)
    
    return count;
}


const res = getTotalX([2, 4], [16, 32, 96])
console.log(res)