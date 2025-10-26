const toggleElemnt = document.querySelector(".themes__toggle");

const toggleDarkTheme = () =>
  toggleElemnt.classList.toggle("themes__toggle--isActive");

const toggleDarkThemeAcess = (event) =>
  event.key === "Enter" && toggleDarkTheme();

toggleElemnt.addEventListener("keydown", toggleDarkThemeAcess);
toggleElemnt.addEventListener("click", toggleDarkTheme);

let storedNumber = "";
let currentNumber = "";
let operation = "";

const resultElament = document.querySelector(".calc__result");
const keyElement = document.querySelectorAll("[data-type]");

const updateScreen = (value) => {
  resultElament.innerText = !value ? "0" : value;
};

const numberButton = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;
  currentNumber += value;
  updateScreen(currentNumber);
};

const resetButtonHan = () => {
  storedNumber = "";
  currentNumber = "";
  operation = "";
  updateScreen(currentNumber);
};

const deletButtonHan = () => {
  if (!currentNumber || currentNumber === "0") return;

  if (currentNumber.length === 1) {
    currentNumber = "";
  } else {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }

  updateScreen(currentNumber);
};

const execuateOperation = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case "+":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        break;

      case "*":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        break;

      case "-":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        break;

      case "/":
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
        break;
    }

    currentNumber = "";
    updateScreen(storedNumber);
  }
};

const operationButtonHan = (operationValue) => {
  if (!storedNumber && !currentNumber) return;

  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = operationValue;
  } else if (storedNumber) {
    operation = operationValue;
    if (currentNumber) execuateOperation();
  }
};

const keyElemntsHan = (elemnt) => {
  elemnt.addEventListener("click", () => {
    if (elemnt.dataset.type === "number") {
      numberButton(elemnt.dataset.value);
    } else if (elemnt.dataset.type === "operation") {
      switch (elemnt.dataset.value) {
        case "c":
          resetButtonHan();
          break;
        case "Backspace":
          deletButtonHan();
          break;
        case "Enter":
          execuateOperation();
          break;
        default:
          operationButtonHan(elemnt.dataset.value);
      }
    }
  });
};

keyElement.forEach(keyElemntsHan);

const avaliableNumbers = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
];

const availableOperations = ["+", "/", "-", "*"];

const avaiableKeys = [
  ...availableOperations,
  ...avaliableNumbers,
  "Backspace",
  "Enter",
  "C",
];

window.addEventListener("keydown", (event) => {
  keyboardWithHover(event.key);
});

const keyboardWithHover = (key) => {
  if (avaiableKeys.includes(key)) {
    const elem = document.querySelector(`[data-value="${key}"]`);

    elem.classList.add("hover");
    elem.click();
    setTimeout(() => elem.classList.remove("hover"), 100);
  }
};
