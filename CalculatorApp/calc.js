let btn = document.querySelectorAll(".button");

let screen = document.querySelector(".screen");

for (const button of btn) {
  button.addEventListener("click", function () {
    if (button.innerText  == "=") {
      screen.value = eval(screen.value);
    } else if (button.innerText  == "AC") {
      screen.value = "";
    } else if (button.innerText == "DEL") {
      screen.value = screen.value.slice(0, -1);
    } else {
      
      screen.value += button.innerText ;
    }
  });
}
