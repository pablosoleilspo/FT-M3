const sumArray = (array, num) => {
    for (const num1 of array) {
        for (const num2 of array) {
            //continue: termina la ejecucuion 
            if(num1 === num2) continue;
            if(num1 + num2 === num) return true;
        }
    }
    return false
}

module.exports = sumArray;
// [2,   5,   7,10,11,15,20] = 13
//  num1
//      num2

//OPCION 2
//Agregar al test TypeError
// function sumArray(array, num) {
//     if(!Array.isArray(array)) throw new TypeError('array')
//     if(typeof num !== 'number') throw new TypeError('number')
//     for (var i = 0; i < array.length; i++) {
//         for (let j = 0; j < array.length; j++) {
//             if(array[i] + array[j] === n) return true
//             }
//         }
//         return false
// }


// for(let i of arrayaSumar) arrayl+=i;
