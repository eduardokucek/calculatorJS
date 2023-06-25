class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "%":
        computation = prev * (current / 100);
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
    // const floatNumber = parseFloat(number);
    // if (isNaN(floatNumber)) return "";
    // return floatNumber.toLocaleString("en");
  }
  updateDisplay() {
    this.currentOperandText.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandText.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandText.innerText = "";
    }
  }
}

const numbersKey = document.querySelectorAll("[data-number]");
const operationsKey = document.querySelectorAll("[data-operation]");
const equalsKey = document.querySelector("[data-equals]");
const deleteKey = document.querySelector("[data-delete]");
const allClearKey = document.querySelector("[data-all-clear]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandText, currentOperandText);

numbersKey.forEach((key) => {
  key.addEventListener("click", () => {
    calculator.appendNumber(key.innerText);
    calculator.updateDisplay();
  });
});

operationsKey.forEach((key) => {
  key.addEventListener("click", () => {
    calculator.chooseOperation(key.innerText);
    calculator.updateDisplay();
  });
});

equalsKey.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearKey.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteKey.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
