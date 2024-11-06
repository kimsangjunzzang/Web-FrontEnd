document.addEventListener("DOMContentLoaded", function () {
  let display = document.getElementById("display");

  function append(value) {
      display.value += value;
  }

  function clearDisplay() {
      display.value = "";
  }

  function deleteLast() {
      display.value = display.value.slice(0, -1);
  }

  function calculate() {
      try {
          // Evaluate the expression
          display.value = eval(display.value.replace("×", "*").replace("÷", "/"));
      } catch (error) {
          display.value = "Error";
      }
  }

  // Attach functions to window to make them globally accessible
  window.append = append;
  window.clearDisplay = clearDisplay;
  window.deleteLast = deleteLast;
  window.calculate = calculate;
});
