//DOM
const btns = document.querySelectorAll('.use');
const display = document.querySelector('.display');

const numsAndOpsRegExp = /[+-/*=0-9c]/;
const numsRegExp = /[0-9]/;
const opsRegExp = /[+-/*]/;
let userInputArr = [];
let currentInput = 0;
let previousInput;
let resultToRender;

btns.forEach(x => x.addEventListener('click', e => {
    e.preventDefault();
    if (numsAndOpsRegExp.test(x.value)) userInputArr.push(x.value.toLowerCase());
    controller();
}));

document.addEventListener('keyup', e => {
    e.preventDefault();

    if(e.key === 'Enter') userInputArr.push('=');
    
    // else if(!numsAndOpsRegExp.test(e.key)) return null;
    else if(numsAndOpsRegExp.test(e.key)) userInputArr.push(e.key.toLowerCase());
    controller();
});
//process user input and 
function controller() {
    currentInput = userInputArr[userInputArr.length - 1];
    console.log(userInputArr);
    // clear
    if(currentInput === 'c') render(false, true);
    // check to see if current input is an equals
    else if(currentInput === '=') {
        // if yes: call computation function and render computed expression
        resultToRender = computation(formatter(userInputArr));
        render(false, false, true);
    } else {
        // if no: render currentInput
        render(true);
    }
    
}
//render function
function render(doRender = false, doClear = false, doReRender = false){
//     //clear
    if(doClear) display.innerText = '0', userInputArr = [], currentInput = 0;
    //re-render
    else if(doReRender) {
        display.innerText = resultToRender;
        userInputArr = [resultToRender];
    }
    //render
    else if(doRender) {
        if (display.innerText === '0') display.innerText = userInputArr[0];
        else if(display.innerText) display.innerText += currentInput
    }
}
//format userInputArr
function formatter(inputArr) {
    const charGroup = /[+-/*=()√.%]/;
    return inputArr.map(x => charGroup.test(x) ? x : +x);
}
// computation
function computation(formattedUserInput){
    let operator;
    const nums = [];
    for(let value of formattedUserInput) {
        if(opsRegExp.test(value)) operator = value;
        else if(numsRegExp.test(value)) nums.push(value);
    }
    if(operator === '*') return nums[0] * nums[1];
    else if(operator === '/') return nums[0] / nums[1];
    else if (operator === '-') return nums[0] - nums[1];
    else if (operator === '+') return nums[0] + nums[1];
}


//test cases
// function assertEquals(actual, expected, testName){
//     if(!actual) console.log('Undefined');
//     if(actual === expected) console.log('passed');
//     else {
//         console.log(`FAILED [${testName}]. Expected: "${expected}", but got "${actual}".`)
//     }
}



//basic tests

// const additionBasicTest = computation([4, '+', 5]);
// const additionBasicTestExpected = 9;
// console.log(additionBasicTest, "4+5 = 9");
// assertEquals(additionBasicTest, additionBasicTestExpected, 'Addition Basic Test');
// const multiplicationBasicTest = computation([4, '*', 5]);
// const multiplicationBasicTestExpected = 20;
// console.log(multiplicationBasicTest, "4*5 = 20");
// assertEquals(multiplicationBasicTest, multiplicationBasicTestExpected, 'Multiplication Basic Test');
// const divisionBasicTest = computation([33, '/', 15]);
// const divisionBasicTestExpected = 2.2;
// console.log(divisionBasicTest, "33/15 = 2.2");
// assertEquals(divisionBasicTest, divisionBasicTestExpected, 'Division Basic Test');
// const subtractionBasicTest = computation([50, '-', 15]);
// const subtractionBasicTestExpected = 35;
// console.log(subtractionBasicTest, "50-15 = 35");
// assertEquals(subtractionBasicTest, subtractionBasicTestExpected, 'Subtraction Basic Test');

// const createsNegativeTest = controller(['-', 15]);
// const createsNegativeTestExpected = -15;
// console.log(createsNegativeTest, "5-15");
// assertEquals(createsNegativeTest, createsNegativeTestExpected, 'Creates Negative Test');

// const multipliesWhenNoOperatorGivenTest = controller(5, 5, '-', 15);
// const multipliesWhenNoOperatorGivenTestExpected = -50;
// console.log(multipliesWhenNoOperatorGivenTest, "5,5-15");
// assertEquals(multipliesWhenNoOperatorGivenTest, multipliesWhenNoOperatorGivenTestExpected, 'Ignores Digit Not Followed By Operator Test');

// const handlesParentheses = controller(5, '(', 5, '+', 15, ')');
// const handlesParenthesesExpected = 100;
// console.log(handlesParentheses, "5(5+15) = 100");
// assertEquals(handlesParentheses, handlesParenthesesExpected, 'Handles Parentheses Correctly');

// const handlesParentheses2 = controller(5, 5, '+', 15, ')');
// const handlesParentheses2Expected = 'Invalid Input';
// console.log(handlesParentheses2, "55+15)");
// assertEquals(handlesParentheses2, handlesParentheses2Expected, 'Handles Parentheses Correctly 2');

// const handlesParenthesesAdvanced = controller(5, '+', '(', 5, '+', 15, ')', '+', '(', 10, '+', 20, ')');
// const handlesParenthesesAdvancedExpected = 55;
// console.log(handlesParenthesesAdvanced, "5(5+15)+(10+20) = 55");
// assertEquals(handlesParenthesesAdvanced, handlesParenthesesAdvancedExpected, 'Handles Parentheses Correctly');

// const singleDigitInParenthesesTest = controller([4, '+', 5, '(', 7, ')']);
// const singleDigitInParenthesesTestExpected = 63;
// console.log(singleDigitInParenthesesTest, "4+5(7) = 63");
// assertEquals(singleDigitInParenthesesTest, singleDigitInParenthesesTestExpected, 'Addition Basic Test');

// const multiplicationAdvancedTest = controller(4, '*', 5);
// const multiplicationAdvancedTestExpected = 20;
// console.log(multiplicationAdvancedTest, "4*5");
// assertEquals(multiplicationAdvancedTest, multiplicationAdvancedTestExpected, 'Addition Basic Test');
// const divisionAdvancedTest = controller(33, '/', 15);
// const divisionAdvancedTestExpected = 2.2;
// console.log(divisionAdvancedTest, "33/15");
// assertEquals(divisionAdvancedTest, divisionAdvancedTestExpected, 'Addition Basic Test');
// const subtractionAdvancedTest = controller(50, '-', 15);
// const subtractionAdvancedTestExpected = 35;
// console.log(subtractionAdvancedTest, "50-15");
// assertEquals(subtractionAdvancedTest, subtractionAdvancedTestExpected, 'Addition Basic Test');
