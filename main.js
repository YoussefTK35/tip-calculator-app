const billInput = document.getElementById("bill-input");
const tipButtons = document.querySelectorAll(".tips-grid-container button");
const customTipInput = document.getElementById("tip-input");
const peopleInput = document.getElementById("num-people-input");

const errorMessage = document.querySelector(".error-num-people");
const tipAmountDisplay = document.getElementById("tip-amount");
const totalAmountDisplay = document.getElementById("total-amount");

const calcButton = document.getElementById("reset");

tipButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    tipButtons.forEach((btn) => btn.classList.remove("active-tip"));
    button.classList.add("active-tip");
    customTipInput.value = "";
  });
});

customTipInput.addEventListener("input", (event) => {
  tipButtons.forEach((btn) => btn.classList.remove("active-tip"));
});

function checkInputs() {
  let billValue = parseFloat(billInput.value);
  let peopleValue = parseInt(peopleInput.value);

  if (!isNaN(billValue) && !isNaN(peopleValue)) {
    calcButton.disabled = false;
    calcButton.classList.remove("disabled");
  } else {
    calcButton.disabled = true;
    calcButton.classList.add("disabled");
  }
}

billInput.addEventListener("input", checkInputs);
peopleInput.addEventListener("input", checkInputs);

calcButton.addEventListener("click", (event) => {
  let billValue = parseFloat(billInput.value);
  let peopleValue = parseInt(peopleInput.value);

  if (isNaN(peopleValue) || peopleValue <= 0) {
    errorMessage.style.display = "block";
    peopleInput.classList.add("input-error");
    return;
  } else {
    errorMessage.style.display = "none";
    peopleInput.classList.remove("input-error");
  }

  let tipPercentage = 0;
  if (customTipInput.value) {
    tipPercentage = parseFloat(customTipInput.value) / 100;
  } else {
    tipButtons.forEach((button) => {
      if (button.classList.contains("active-tip")) {
        tipPercentage = parseFloat(button.textContent.slice(0, -1)) / 100;
      }
    });
  }

  let tipAmount = (billValue * tipPercentage) / peopleValue;
  let totalAmount = billValue / peopleValue + tipAmount;
  tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
  totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
});
