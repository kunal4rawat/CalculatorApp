//all variables

let DishName = document.getElementById("DishName");
let search = document.getElementById("search");
let randomBtn = document.getElementById("random");

let chicken = document.getElementById("Chicken");
let Dessert = document.getElementById("Dessert");
let Pasta = document.getElementById("Pasta");
let Seafood = document.getElementById("Seafood");
let Side = document.getElementById("Side");
let Starter = document.getElementById("Starter");
let Vegan = document.getElementById("Vegan");
let Vegetarian = document.getElementById("Vegetarian");
let Breakfast = document.getElementById("Breakfast");

let display = document.getElementById("display");

let categoryarr = [
  chicken,
  Dessert,
  Pasta,
  Seafood,
  Side,
  Starter,
  Vegan,
  Vegetarian,
  Breakfast,
];
//recipe category

for (let i = 0; i < categoryarr.length; i++) {
  if (categoryarr[i].click) {
    categoryarr[i].addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      let category = async () => {
        let dishCategory = categoryarr[i].innerText;
        let url3 = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${dishCategory}`
        );
        let response3 = await url3.json();
        let mealcategory = response3.meals;
        display.classList.remove("hidden");
        let container = display.children[1];
        display.firstElementChild.textContent = `Heres Your ${dishCategory} Meals`;
        container.innerHTML = "";

        for (let j = 1; j < mealcategory.length; j++) {
          console.log("Meal Name:", mealcategory[j].strMeal);

          container.innerHTML += `Meal ${[j]} : ${
            mealcategory[j].strMeal
          } <br>`;
        }
      };
      category();
    });
  }
}

//For Random recipe

randomBtn.addEventListener("click", () => {
  let randomRecipe = async () => {
    let url2 = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    let response2 = await url2.json();
    let ranMeal = response2.meals[0];

    console.log("Meal Name:", ranMeal.strMeal);
    console.log("Category:", ranMeal.strCategory);
    console.log("Area:", ranMeal.strArea);
    console.log("Instructions:", ranMeal.strInstructions);
    console.log("Image:", ranMeal.strMealThumb);

    display.classList.remove("hidden");

    display.firstElementChild.textContent = "Heres Your  Recipe";

    let steps = ranMeal.strInstructions
      .split(".")
      .map((step) => step.trim())
      .filter((step) => step.length > 0);

    let list = document.createElement("ol");
    steps.forEach((step) => {
      let li = document.createElement("li");
      li.textContent = step;
      list.appendChild(li);
    });

    // Append to display
    let container = display.children[1];

    container.innerHTML = `Meal Name : ${ranMeal.strMeal}  <br> Category : ${ranMeal.strCategory} <br> Area : ${ranMeal.strArea} <img style=" border-radius:10px;   width:400px; height:300px;" src="${ranMeal.strMealThumb}"><br> Instructions :<br> `;
    container.appendChild(list);
  };
  randomRecipe();
});

//For searching Recipies

function searchBtn() {
  try {
    let dish = DishName.value;
    if (dish == "") {
    } else {
      let searchRecipe = async () => {
        let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`;

        let response = await fetch(url);
        let data = await response.json();
        if (!data.meals) {
          display.classList.remove("hidden");
          display.firstElementChild.textContent = "No recipe found!";
          display.children[1].innerHTML = "";
          return;
        }

        let meal = data.meals[0];

        display.classList.remove("hidden");

        display.firstElementChild.textContent = "Heres Your Recipe";

        let steps = meal.strInstructions
          .split(".")
          .map((step) => step.trim())
          .filter((step) => step.length > 0);

        let list = document.createElement("ol");
        steps.forEach((step) => {
          let li = document.createElement("li");
          li.textContent = step;
          list.appendChild(li);
        });

        // Append to display
        let container = display.children[1];

        if (meal.strCategory === "Miscellaneous") {
          container.innerHTML = `Meal Name : ${meal.strMeal}  <br> Area : ${meal.strArea} <img style=" border-radius:10px;   width:400px; height:300px;" src="${meal.strMealThumb}"><br> Instructions :<br> `;
          container.appendChild(list);
        } else {
          container.innerHTML = `Meal Name : ${meal.strMeal}  <br> Category : ${meal.strCategory} <br> Area : ${meal.strArea} <img style=" border-radius:10px;   width:400px; height:300px;" src="${meal.strMealThumb}"><br> Instructions :<br> `;
          container.appendChild(list);
        }
      };

      searchRecipe();
    }
  } catch (error) {
    console.log("Error fetching recipe:", error);
  }
}
search.addEventListener("click", searchBtn);
