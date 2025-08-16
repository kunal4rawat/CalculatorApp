let btn = document.querySelectorAll(".button");

let screen = document.querySelector(".screen");

for (const button of btn) {
  button.addEventListener("click", function () {
    if (button.innerHTML == "=") {
      screen.value = eval(screen.value);
    } else if (button.innerHTML == "AC") {
      screen.value = "";
    } else if (button.innerHTML == "DEL") {
      screen.value = screen.value.slice(0, -1);
    } else {
      2;
      screen.value += button.innerHTML;
    }
  });
}
