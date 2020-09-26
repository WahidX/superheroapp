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
});


document.addEventListener('click', (event) => {
    // Details button
    if(event.target.id == 'details_btn'){
        var id = event.target.parentNode.parentNode.id;
        window.open('./details.html'+'?id='+id);
    }
    // Favourite button
    else if(event.target.id == 'details_btn'){
        var id = event.target.parentNode.parentNode;
        console.log(id+' will be fav');
    }

});


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
    cardContainer.id = data.id;
    
    cardContainer.innerHTML = `
        <div class="card-img-container">
            <img src="${data.image.url}">
        </div>
        <div class="card-name">"${data.name}"</div>
        <div class="card-btns">
            <button id="details_btn">Details</button>
            <button id="add_fav_btn">Add Fav</button>
        </div>
    `
    return cardContainer;
}

