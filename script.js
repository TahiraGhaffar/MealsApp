const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const mealList = document.getElementById('meal');

const mealDetailsContent = document.querySelector('.meal-details-content'); //black container for details
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
searchInput.addEventListener('input', getMealListConcurrently)
mealList.addEventListener('click', getMealRecipe); //"mealList" will be a list of DIFFERENT MEALS
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    //here searching by NAME of meal item 
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){ // 'meals' is 'ARRaAY' containing different objects AS MEAL ITEMS in api
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <h5 class = "recipe-btn">Get Recipe</h5>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html; //adding all found meals after search into "mealList" that will be displayed 
    });
}

// get meal list that matches with the ingredients concurrently
function getMealListConcurrently(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <h5 class = "recipe-btn">Get Recipe</h5>
                        </div>
                    </div>
                `;
            //     const isVisible =
            //     data.meals.strMeal.toLowerCase().includes(searchInputTxt) //||
            //    // coffee.email.toLowerCase().includes(value)
            //   data.meals.element.classList.toggle("hide", !isVisible)
            });
            mealList.classList.remove('notFound'); //here 'remove('notFound')'  is not js , its CSS only, to add styling
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');//here 'add('notFound')'  is not js , its CSS only, to add styling
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
   // const anchor = document.createElement('a');
   // anchor.setAttribute('target','_blank');
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement; //means clicked 'Get Recipe' button's parent(mealName)
        //ka parent(mealID) will be stored in "mealItem"
       // window.open('itemDetail.html/${mealItem}');
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// // create a modal
function mealRecipeModal(meal){
   // window.open('itemDetail.html');
    console.log(meal);
    meal = meal[0];  //means isnside "meals" ARRAY , check at 0th index
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;

    mealDetailsContent.parentElement.classList.add('showRecipe');
   // mealDetailsContent.classList.add('showRecipe');
    //window.open('itemDetail.html/${mealDetailsContent}');
    //detailsContainer.append(anchor);


}