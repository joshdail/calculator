import Calc from "./calc.js"

const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
const OPERATIONS = ["+", "-", "*", "/"]

const calc = new Calc()

const secondaryOperand = document.querySelector("[data-secondary-operand]")
const primaryOperand = document.querySelector("[data-primary-operand]")
const calculatorGrid = document.querySelector(".calculator-grid")

secondaryOperand.innerText = ""
primaryOperand.innerText = calc.currentValueAsString

calculatorGrid.addEventListener("click", e => {
  handleCalcScreenButtonEvent(e)
})

document.addEventListener("keyup", e => {
  handleCalcKeyboardEvent(e)
})

function handleCalcKeyboardEvent(e) {
  try {
    if (NUMBERS.includes(e.key)) {
      calc.addDigitToCurrentValue(e.key)
    }
    if (e.key === "Escape") {
      calc.allClear()
      secondaryOperand.innerText = ""
    }
    if (e.key === "Backspace" || e.key === "Delete") {
      calc.removeDigitFromCurrentValue()
    }
    if (OPERATIONS.includes(e.key)) {
      handleOperation(e.key)
    }
    if (e.key === "=" || e.key === "Enter") {
      handleEquals()
      return
    }
    primaryOperand.innerText = calc.currentValueAsString
  } catch (err) {
    handleCalcError(err)
  }
}

function handleCalcScreenButtonEvent(e) {
  try {
    if (e.target.matches("[data-number]")) {
      calc.addDigitToCurrentValue(e.target.innerText)
    }
    if (e.target.matches("[data-all-clear]")) {
      calc.allClear()
      secondaryOperand.innerText = ""
    }
    if (e.target.matches("[data-delete]")) {
      calc.removeDigitFromCurrentValue()
    }
    if (e.target.matches("[data-operation]")) {
      handleOperation(e.target.innerText)
    }
    if (e.target.matches("[data-equals]")) {
      handleEquals()
      return
    }
    primaryOperand.innerText = calc.currentValueAsString
  } catch (err) {
    handleCalcError(err)
  }
}

function handleEquals() {
  calc.handleEquals()
  primaryOperand.innerText = calc.accumulatedValueAsString
  secondaryOperand.innerText = ""
  calc.allClear()
}

function handleOperation(operation) {
  calc.handleOperation(operation)
  secondaryOperand.innerText = `${calc.accumulatedValueAsString} ${operation}`
}

function handleCalcError(err) {
  console.error(err)
  primaryOperand.innerText = "Error"
  secondaryOperand.innerText = ""
  calc.allClear()
}
