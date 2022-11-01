export default class Calc {
  constructor() {
    this.#accumulatedValue = ""
    this.#currentValue = ""
    this.#operation = ""
  }
  #accumulatedValue
  #currentValue
  #operation

  get accumulatedValueAsNumber() {
    return !this.#accumulatedValue ? 0 : parseFloat(this.#accumulatedValue)
  }

  get accumulatedValueAsString() {
    if (!this.#accumulatedValue) {
      return "0"
    }
    let val = this.#accumulatedValue
    if (val[val.length - 1] === ".") {
      val = val.slice(0, -1)
    }
    return val.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  get currentValueAsNumber() {
    return !this.#currentValue ? 0 : parseFloat(this.#currentValue)
  }

  get currentValueAsString() {
    if (!this.#currentValue) {
      return "0"
    }
    let val = this.#currentValue
    return val.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  handleOperation(operation) {
    // Make sure divide sign is handled correctly
    operation = operation === "÷" ? "/" : operation
    if (!["+", "-", "/", "*"].includes(operation)) {
      throw new Error("Invalid operation submitted")
    }
    if (this.#operation !== "" && this.#accumulatedValue !== "") {
      this.handleMath()
    } else {
      this.#accumulatedValue = this.#currentValue
      this.#currentValue = ""
    }
    this.#operation = operation
  }

  handleEquals() {
    this.handleMath()
    this.#operation = ""
  }

  handleMath() {
    let a = this.accumulatedValueAsNumber
    let b = this.currentValueAsNumber
    switch (this.#operation) {
      case "+":
        a += b
        break
      case "-":
        a -= b
        break
      case "*":
        a *= b
        break
      case "/":
        a /= b
        break
    }
    if (isNaN(a) || !isFinite(a)) {
      throw new Error("Result is either NaN or Infinity")
    }
    this.#accumulatedValue = a.toString()
    this.#currentValue = ""
  }

  addDigitToCurrentValue(digit) {
    digit = digit.toString()
    if (digit === ".") {
      this.addDecimalToCurrentValue()
      return
    }
    if (isNaN(digit) || digit.length !== 1) {
      throw new Error(
        "Only a single numeric character can be submitted as an argument"
      )
    }
    if (!this.#currentValue && digit === "0") {
      return
    }
    this.#currentValue += digit
  }

  removeDigitFromCurrentValue() {
    this.#currentValue = this.#currentValue.slice(0, -1)
  }

  addDecimalToCurrentValue() {
    if (!this.#currentValue.includes(".")) {
      this.#currentValue += "."
    }
  }

  allClear() {
    this.#accumulatedValue = ""
    this.#currentValue = ""
    this.#operation = ""
  }
}
