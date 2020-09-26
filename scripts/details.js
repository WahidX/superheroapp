const access_token = '338148107599656';
const api_url = "https://www.superheroapi.com/api.php/"+access_token+"/";

function driver(){
    const id = extractId();
}


async function renderPage(id){
    let response = await fetch(api_url+id);
    if(response.ok){
        // renderPage(await response.json());
        var jsonData = await response.json();
        console.log(jsonData);
    }
    else{
        alert("HTTP-Error: ",response.status);
    }
}


function extractId(){
    //Extracting ID from url
    const url = location.search;
    return url.substring(url.indexOf('=')+1);
}