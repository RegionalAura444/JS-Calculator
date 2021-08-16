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


///////////////////////
////// Functions //////
///////////////////////

//This Functions places a comma and concatenates the number if its more than 9,999
const getValueAsStr = () => {
    const currentDisplayStr = displayElement.textContent;
    return currentDisplayStr.split(',').join('');
}

const getValueAsNum = () => {
    return parseFloat(getValueAsStr());
};

const setStrAsValue  = (valueStr) => {
    displayElement.textContent = parseFloat(valueStr).toLocaleString();
};

const handleNumberClick =  (numStr) => {
  //  console.log(numStr)
  const currentDisplayStr = getValueAsStr();
  if( currentDisplayStr === '0'){
      setStrAsValue(numStr);
  } else{
      setStrAsValue(currentValueSt + numStr);
  }
};


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
        setStrAsValue( currentValueStr + '.')
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