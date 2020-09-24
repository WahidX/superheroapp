console.log('script loaded');
const access_token = '338148107599656';
const url = 'https://superheroapi.com/api.php/'+access_token+'/search/';

async function searchHero(searchString){

    let response = await fetch(url+searchString);
      
    if (response.ok) { // if HTTP-status is 200-299
        let data = await response.json();
        console.log('ans: ',data);
        renderData(data);
    } 
    else {
        alert("HTTP-Error: " + response.status);
    }
}

function renderData(data){
    if(data.results.length === 0){
        console.log('Nothing Found');
    }
    else{
        data.results.forEach(element => renderCard(element));
    }
}

function renderCard(heroData){
    console.log("Hero Data : ",heroData);

    const cardContainer = document.getElementById("result-container");
    

}

const searchBar = document.getElementById('search-data');

searchBar.addEventListener('keyup', (e)=> {
    const searchString = e.target.value;
    console.log("Searching for: ",searchString);
    if (searchString.length < 2){
        return;
    }
    
    searchHero(searchString);
})