const access_token = "338148107599656";
const api_url = "https://www.superheroapi.com/api.php/"+access_token+"/";

driver();

async function driver(){
    const id = extractId();
    const data = await getInfo(id);
    console.log(data);
    renderPage(data);
}


function extractId(){
    //Extracting ID from url
    const url = location.search;
    return url.substring(url.indexOf('=')+1);
}


async function getInfo(id){
    let response = await fetch(api_url+id);
    if(response.ok){
        var jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    }
    else{
        alert("HTTP-Error: ",response.status);
    }
}


function renderPage(data){
    
    // Setting image
    document.getElementById('image').firstElementChild.src = `${data.image.url}`;

    // Powerstats
    var combat = document.getElementsByClassName('combat');
    combat[0].innerHTML = `${data.powerstats.combat}`;
    combat[0].style = `width: ${data.powerstats.combat}%;`;

    var durability = document.getElementsByClassName('durability');
    durability[0].innerHTML = `${data.powerstats.durability}`;
    durability[0].style = `width: ${data.powerstats.durability}%;`;

    var intelligence = document.getElementsByClassName('intelligence');
    intelligence[0].innerHTML = `${data.powerstats.intelligence}`;
    intelligence[0].style = `width: ${data.powerstats.intelligence}%;`;

    var power = document.getElementsByClassName('power');
    power[0].innerHTML = `${data.powerstats.power}`;
    power[0].style = `width: ${data.powerstats.power}%;`;

    var speed = document.getElementsByClassName('speed');
    speed[0].innerHTML = `${data.powerstats.speed}`;
    speed[0].style = `width: ${data.powerstats.speed}%;`;

    var strength = document.getElementsByClassName('strength');
    strength[0].innerHTML = `${data.powerstats.strength}`;
    strength[0].style = `width: ${data.powerstats.strength}%;`;

    // Appearance
    document.getElementById('appearance').innerHTML = makePresentable(data.appearance);

    document.getElementById('biography').innerHTML = makePresentable(data.biography);

    document.getElementById('occupation').innerHTML = makePresentable(data.work);

    document.getElementById('connections').innerHTML = makePresentable(data.connections);

}

function makePresentable(jsonData){
    var str='';
    for (var key in jsonData){
        str += 
            '<p><b>'+key.charAt(0).toUpperCase()+key.slice(1) +'</b> : '+ jsonData[key]+ '</p>';
    }
    return str;
}