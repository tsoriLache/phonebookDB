function isNumberValid(number){
    const arrNumber = number.split("");
    arrNumber.splice(3,1);
    return( number.length===11 &&
            number.slice(3,4)==='-' && 
            arrNumber.every(digit => digit>=0&&digit<=9) &&
            arrNumber[0]==='0' &&
            arrNumber[1]==='5')
}

console.log( isNumberValid('052-8272267'));
module.exports = {isNumberValid}