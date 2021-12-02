const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = calculator.querySelector('.calculator__display')


    
keys.addEventListener('click', event => {
    if (!event.target.closest('button')) return

    const key = event.target
    const keyValue = key.textContent
    const displayValue = display.textContent
    const { type } = key.dataset
    const { previousKeyType } = calculator.dataset
    
    if (type === 'number') {
        if (displayValue === '0' || previousKeyType === 'operator' ) {
            display.textContent = keyValue
        } 
        else {
            display.textContent = displayValue + keyValue;
        }
    }

    if (type === 'operator') {
        const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
        operatorKeys.forEach(el => { el.dataset.state = ''})
        key.dataset.state = 'selected'

        calculator.dataset.firstNumber = displayValue
        calculator.dataset.operator = key.dataset.key
 
    }

    if (type === 'equal') {
        const firstNumber = calculator.dataset.firstNumber
        const operator = calculator.dataset.operator
        const secondNumber = displayValue
        display.textContent = calculate(firstNumber,operator, secondNumber)
        removeClass()
        
    }
    if (type === 'clear') {
        display.textContent = "0"
        removeClass()
        delete calculator.dataset.firstNumber
        delete calculator.dataset.operator
    }

    if (type === 'decimal') {
        if(!displayValue.includes(keyValue)) {
            display.textContent += keyValue;
        }
    }

    calculator.dataset.previousKeyType = type;
})

function calculate(firstNumber,operator, secondNumber) {
    firstNumber = parseFloat(firstNumber)
    secondNumber = parseFloat(secondNumber)

    if (operator === 'plus') return (firstNumber + secondNumber).toFixed(2)
    if (operator === 'minus') return (firstNumber - secondNumber).toFixed(2)
    if (operator === 'times') return (firstNumber * secondNumber).toFixed(2)
    if (operator === 'divide') return (firstNumber / secondNumber).toFixed(2)
}


function removeClass () {
    let activeClass = keys.querySelectorAll('[data-type="operator"]')
    activeClass.forEach(el => el.dataset.state = [''])
}
