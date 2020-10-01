// Commonly used values
const access_token = '338148107599656';
const api_url = "https://www.superheroapi.com/api.php/"+access_token+"/";
const favFalse = '../assets/images/white_star.png';
const favTrue = '../assets/images/red_star.png';

driver();

function driver(){
    // Getting the fav list from localStorage
    var favs = JSON.parse(localStorage.getItem('superheroFavs'));
    if(favs.length==0){
        document.getElementById('results').innerHTML = "Add your favourite Heroes";
        return;
    }
    document.getElementById('results').innerHTML = '';
    favs.forEach((id) => {
        searchHero(id);
    });
}

// Handling details, add favourite actions
document.addEventListener('click', (event) => {
    // Details button
    if(event.target.id == 'details_btn'){
        var id = event.target.parentNode.id;
        window.open('./details.html'+'?id='+id, "_self");
    }
    // Favourite button
    else if(event.target.id == 'add_fav_btn'){
        var id = event.target.parentNode.parentNode.id;
        var favs = JSON.parse(localStorage.getItem('superheroFavs'));
        if (favs.indexOf(id) != -1){
            favs = favs.filter((item) => item!=id);
            localStorage.setItem('superheroFavs',JSON.stringify(favs));
            event.target.src = favFalse;
            document.getElementById(id).remove();
            customAlert('failure','Removed from fav');
        }
        else{
            favs.push(id);
            localStorage.setItem('superheroFavs',JSON.stringify(favs));
            event.target.src = favTrue;
            customAlert('success','Added to fav');
        }
    }
});

// Function to call API
async function searchHero(id){
    // Calling API
    let response = await fetch(api_url+id);
    if (response.ok) { // if HTTP-status is 200-299
        renderCard(await response.json());
    }
    else {
        alert("HTTP-Error: " + response.status);
    }
}


// Form the card DOM
function renderCard(data){
    var cardContainer = document.createElement('DIV');
    cardContainer.className = 'card-container center';
    cardContainer.id = data.id;
    var srcFav;
    var favs = JSON.parse(localStorage.getItem('superheroFavs'));
    // Cheking if its a fav or not
    if(favs.indexOf(data.id) !== -1){
        srcFav = favTrue;
    }
    else{
        srcFav = favFalse;
    }
    cardContainer.innerHTML = `
        <div class="card-img-container">
            <img src="${data.image.url}">
        </div>
        <div id="details_btn" class="card-name">${data.name}</div>
        <div class="card-btns">
            <img id="add_fav_btn" src="${srcFav}" width="25">
        </div>
    
        <div id="stats-container">
            <div id="stat-names">
                <span>Combat</span>
                <span>Durability</span>
                <span>Intelligence</span>
                <span>Power</span>
                <span>Speed</span>
                <span>Strength</span>
            </div>

            <div id="stat-bars">
                <div class="bar-container">
                    <div class="bar combat" style="width: ${data.powerstats.combat}%;">${data.powerstats.combat}</div>
                </div>
                <div class="bar-container">
                    <div class="bar durability" style="width: ${data.powerstats.durability}%;">${data.powerstats.durability}</div>
                </div>
                <div class="bar-container">
                    <div class="bar intelligence" style="width: ${data.powerstats.intelligence}%;">${data.powerstats.intelligence}</div>
                </div>
                <div class="bar-container">
                    <div class="bar power" style="width: ${data.powerstats.power}%;">${data.powerstats.power}</div>
                </div>
                <div class="bar-container">
                    <div class="bar speed" style="width: ${data.powerstats.speed}%;">${data.powerstats.speed}</div>
                </div>
                <div class="bar-container">
                    <div class="bar strength" style="width: ${data.powerstats.strength}%;">${data.powerstats.strength}</div>
                </div>
            </div>
        </div>
    `
    document.getElementById('results').appendChild(cardContainer);
}



// For changing visibility of alert box
function customAlert(type, message){
    var element = document.getElementsByClassName(type);
    element[0].innerHTML = message;
    element[0].style.visibility = "visible"
    setTimeout(() => {
        element[0].style.visibility = "hidden";
    }, 1500);
}