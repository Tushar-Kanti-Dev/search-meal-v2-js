function loadData() {
    fetch('https://randomuser.me/api/')
        .then(res => res.json())
        .then(data => displayData(data.results[0]))
}
loadData();
const displayData = datas => {
        const showData = document.getElementById('data');
        const div = document.createElement('div');
        div.innerHTML = `
    <h3>Name: ${datas.name.first} ${datas.name.last}</h3>
    <h4>Phone: ${datas.phone}</h4>
    <img src="${datas.picture.large}" alt="">
    `;
        showData.appendChild(div)
            // console.log(datas)

    }
    // meal DB 
    // search meal 
const toggoleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggoleSearchMeals = displayStyle => {
    document.getElementById('data').style.display = displayStyle;
}

const searchMeal = () => {
    const searchText = document.getElementById('search-meal').value;
    toggoleSpinner('block');
    toggoleSearchMeals('none');
    loadMealData(searchText);
    document.getElementById('search-meal').value = '';
}

// load data 


const loadMealData = searchText => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
}
loadMealData('Pancakes');
const displayMeals = meals => {
    const displayDiv = document.getElementById('data');
    displayDiv.textContent = '';
    if (!meals) {
        const notFound = document.getElementById('not-found');
        const head4 = document.createElement('h4');
        head4.innerText = 'Not Found';
        notFound.appendChild(head4);
        console.log('not found');
    } else {
        for (const meal of meals) {
            const newDiv = document.createElement('div');
            newDiv.classList.add('card')
            newDiv.innerHTML = `
            <div class= "container">
            <h2>Name: ${meal.strMeal}</h2>
            <h3>CetaG: ${meal.strCategory}</h3>
            <h3>Tag : ${meal.strTags}</h3>
            <p>Ingredient: ${meal.strIngredient5 ? meal.strIngredient5 : ''}</p>
            </div>
            
            <img class="imgs" src="${meal.strMealThumb}" alt="">
            <p>Desc: ${meal.strInstructions.slice(0,250)}</p>
            `;
            displayDiv.appendChild(newDiv);
            console.log(meal);
        }
    }

    toggoleSpinner('none');
    toggoleSearchMeals('block');

}