console.log('script loaded');
const access_token = '338148107599656';
const url = 'https://superheroapi.com/api.php/'+access_token+'/search/';


// Driver Code
const searchBar = document.getElementById('search-data');

searchBar.addEventListener('keyup', (e)=> {
    const searchString = e.target.value;
    console.log("Searching for: ",searchString);
    if (searchString.length < 2){
        document.getElementById('results').innerHTML = 'Add atleast 2 characters';
    }
    else{
        searchHero(searchString);
    }
})


async function searchHero(searchString){
    
    // Calling API
    let response = await fetch(url+searchString);
      
    if (response.ok) { // if HTTP-status is 200-299
        renderData(await response.json());
    }
    else {
        alert("HTTP-Error: " + response.status);
    }
}

function renderData(data){
    // Checking if there's anything found
    if(data.response=='error' || data.results.length === 0){
        document.getElementById('results').innerHTML = data.error;   
    }
    else{
        // deleting previous results
        var results = document.getElementById('results');
        results.remove();

        // Creating new results
        var result_container = document.getElementById('result-container');
        var results = document.createElement('DIV');
        results.id = 'results';
        result_container.appendChild(results);
        
        // rendering each heroes
        data.results.forEach((element) => {
            results.appendChild(getCard(element));
        });
    }
}


function getCard(data){
    // Card container
    var cardContainer = document.createElement('DIV');
    cardContainer.className = 'card-container center';
    
    // Image div
    var cardImg = document.createElement('DIV');
    cardImg.className = 'card-img-container';
    var img = document.createElement('IMG');
    img.src = data.image.url;
    cardImg.appendChild(img);
    cardContainer.appendChild(cardImg); //appended
    
    // Name div
    var cardName = document.createElement('DIV');
    cardName.className = 'card-name';
    cardName.innerHTML = data.name;
    cardContainer.appendChild(cardName);    //appemded

    // Buttons
    var cardBtns = document.createElement('DIV');
    cardBtns.className = 'card-btns';
    var detailsBtn = document.createElement('BUTTON');
    detailsBtn.innerHTML = 'Details';
    var addFavBtn = document.createElement('BUTTON');
    addFavBtn.innerHTML = 'Add Fav';
    cardBtns.appendChild(detailsBtn);
    cardBtns.appendChild(addFavBtn);
    cardContainer.appendChild(cardBtns);    //appended

    return cardContainer;
}

