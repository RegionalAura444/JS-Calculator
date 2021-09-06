//////////////////////////
////// DOM ELEMENTS//////
////////////////////////

///Clock Elements Variables
const hourEl= document.querySelector('.hour');
const minuteEl = document.querySelector('.minutes');

///Calculator Display Variable
const displayElement = document.querySelector('.value');

///Calculator Function Buttons variables
const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('percent');

///Calculator Operator Buttons Variable
const additionEl = document.querySelector('.addition');
const subtractionEl = document.querySelector('.subtraction');
const multiplicationEl = document.querySelector('.multiplication');
const divisionEl = document.querySelector('.division');
const equalEl = document.querySelector('.equal');

///Calculator Number and Decimal button variables
const decimalEl = document.querySelector('.decimal');

const number0El = document.querySelector('.number-0');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');

/// Buttons arrays
const numberElArray = [
    number0El, number1El, number2El, number3El, number4El, 
    number5El, number6El, number7El, number8El, number9El
];

// Memory variables
let valueStrInMem =null;
let operatorInMem =null;

///////////////////////////////
////// General Functions //////
///////////////////////////////

const getValueAsStr =() => {
    const currentValueStr = displayElement.textContent;
    return currentValueStr.split(',').join('');
}
const getValueAsNum = ()=>{
    return parseFloat(getValueAsStr())
}

const setStrAsValue = (valueStr) => {
    if(valueStr[valueStr.length -1]=== '.'){
        displayElement.textContent += '.';
        return;
    }

    const [wholeNumStr, decimalStr] = valueStr.split('.');
    //console.log(wholeNumStr, decimalStr)
    if(decimalStr){
        displayElement.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
    } else {
        displayElement.textContent = parseFloat(wholeNumStr).toLocaleString();
    } 
};

const handleNumberClick =(numStr) => {
    const currentValueStr = getValueAsStr() ;
    if(currentValueStr === '0') {
        setStrAsValue(numStr);
    } else {
      setStrAsValue(currentValueStr + numStr);
    }
};

const handleOperatorClick = (operation) =>{
    const currentValueStr = getValueAsStr();
    const currentValueNum = getValueAsNum();

    if(!valueStrInMem){
        valueStrInMem = currentValueStr;
        operatorInMem = operation ;
        setStrAsValue('0');
        return;
    }
    
    const valueNumInMem = parseFloat(valueStrInMem);
    let newValueNum;
    if(operatorInMem === 'addition') {
        newvalueNum = valueNumInMem + currentValueNum;
    } else if(operatorInMem === 'subtraction') {
        newvalueNum = valueNumInMem - currentValueNum;
    } else if(operatorInMem === 'multiplication') {
        newvalueNum = valueNumInMem * currentValueNum;
    } else if(operatorInMem === 'division') {
        newvalueNum = valueNumInMem / currentValueNum;
    }

    valueStrInMem = newValueNum.toString();
    operatorInMem = operation;
    setStrAsValue("0");
};


//////////////////////////////////////////////////////
//////// Event Listeners to Function Buttons /////////
//////////////////////////////////////////////////////

acEl.addEventListener('click',() => {
    setStrAsValue('0');
    valueStrInMem =null;
    operatorInMem =null;
});

pmEl.addEventListener('click', () => {
     const currentValueNum = getValueAsNum();
     const currentValueStr = getValueAsStr();

     if (currentValueStr === '-0') {
         setStrAsValue('0');
         return;
     }

     if (currentValueNum > 0) {
         setStrAsValue('-' + currentValueStr);
     } else {
        setStrAsValue( currentValueStr.substring(1));
     }
});

//  percentEl.addEventListener('click', () =>{
//      const currentValueNum = getValueAsNum();
//      const newValueNum = currentValueNum /100;
//      setStrAsValue(newValueNum.toString());
//      valueStrInMem =null;
//      operatorInMem =null;
//  });



//////////////////////////////////////////////////////
//////// Event Listeners to Operator Buttons /////////
//////////////////////////////////////////////////////

additionEl.addEventListener('click', () => {
    handleOperatorClick('addition');
});

subtractionEl.addEventListener('click', () => {
    handleOperatorClick('subtraction');
});

multiplicationEl.addEventListener('click', () => {
    handleOperatorClick('multiplication');
});

divisionEl.addEventListener('click', () => {
    handleOperatorClick('division');
});


equalEl.addEventListener('click', () => {
    if(!valueStrInMem){

    } 
});

//////////////////////////////////////////////////////
////// Event Listeners for Buttons and Decimal ///////
//////////////////////////////////////////////////////

// loop through arrray of buttons
for( let i=0; i < numberElArray.length; i++){
    const numberEl = numberElArray[i];
    numberEl.addEventListener('click', () => {
        handleNumberClick(i.toString());
    });
}

decimalEl.addEventListener('click', () =>{
    const currentValueStr = getValueAsStr();

    // Makes sure that you can NOT add more than one decimal point
    if(!currentValueStr.includes('.')) {
        setStrAsValue( currentValueStr + '.');
    }
});

////////////////////////
/////// TIME ///////////
////////////////////////

const updateTime = () => {
    const currentTime = new Date();

    let currentHour= currentTime.getHours();
    const currentMinute= currentTime.getMinutes();

    /// This code turns the time to a 12-hour clock system 
        if(currentHour >12){
            currentHour -= 12;
        }

    hourEl.textContent = currentHour.toString();
    minuteEl.textContent = currentMinute.toString().padStart(2, '0');
}

setInterval(updateTime, 1000)
updateTime();