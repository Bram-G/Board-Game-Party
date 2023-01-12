let maxPlayersInput = document.querySelector('#inputMax');
let minPlayersInput = document.querySelector('#inputMin');
let maxTimeInput = document.querySelector('#inputTime');
let gameCategoryInput = document.querySelector('#inputCategory');
let searchButton = document.querySelector('.btn');

const endPointAtlasRandom = `https://api.boardgameatlas.com/api/search?random=true&client_id=gwluPRwMeB&pretty=true`
const endPointAtlasSearchTEST = `https://api.boardgameatlas.com/api/search?name=catan&client_id=gwluPRwMeB&pretty=true`
const YT_API_KEY = 'AIzaSyCTD8bBuqk848EMDD-KGrIraiHg4dhSiZI'
/*
bga api search criteria min_players= max_players= lt_max_playtime= categories=
*/

//gameSearch(endPointAtlasSearchTEST);
//gameRandom(endPointAtlasRandom)

searchButton.addEventListener('click', ()=> {
    let baseURL = "https://api.boardgameatlas.com/api/search?"
    let endURL = "client_id=gwluPRwMeB&pretty=true";

    if(maxPlayersInput.value && parseInt(maxPlayersInput.value)){
        baseURL += `max_players=${maxPlayersInput.value}&`;
    }
    if(minPlayersInput.value && parseInt(minPlayersInput.value)){
        baseURL += `min_players=${minPlayersInput.value}&`;
    }
    if(maxTimeInput.value && parseInt(maxTimeInput.value)){
        baseURL += `lt_max_playtime=${maxTimeInput.value}&`;
    }
    if(gameCategoryInput.value){
        baseURL += `categories=${gameCategoryInput.value}&`;
    }

    console.log(baseURL + endURL);
    gameSearch(baseURL + endURL);
    gameRandom(endPointAtlasRandom);
});

// Pulling a random game and some brief info from the Board Game Atlas API
function gameRandom(url) {

    fetch(url) 
        .then (response => response.json()) 
        .then (data => {
            console.log(data)
            document.getElementById('gameRandomTitle').textContent = "Title: " + data.games[0].name
            document.getElementById('gameRandomImage').src = data.games[0].images.medium
            document.getElementById('gameRandomRating').textContent = "Rating: " + data.games[0].average_user_rating
            document.getElementById('gameRandomReleaseDate').textContent = "Release Date: " + data.games[0].year_published
            document.getElementById('gameRandomMsrp').textContent = "MSRP: $" + data.games[0].msrp
            document.getElementById('gameRandomPublisher').textContent = "Publisher: " + data.games[0].primary_publisher.name
    })
}
// results for game that user SEARCHES for in the search bar and clicks submit
function gameSearch(url) {

     fetch(url) 
        .then (response => response.json()) 
        .then (data => {
            console.log(data)
            document.getElementById('gameSearchTitle').textContent = "Title: " + data.games[0].name
            document.getElementById('gameSearchImage').src = data.games[0].images.medium
            document.getElementById('gameSearchRating').textContent = "Rating: " + data.games[0].average_user_rating
            document.getElementById('gameSearchReleaseDate').textContent = "Release Date: " + data.games[0].year_published
            document.getElementById('gameSearchMsrp').textContent = "MSRP: $" + data.games[0].msrp
            document.getElementById('gameSearchPublisher').textContent = "Publisher: " + data.games[0].primary_publisher.name

            let gameTitle = data.games[0].name
            // console.log(gameID)
            const endPointYoutubeSearch = `https://www.googleapis.com/youtube/v3/search?${gameTitle}&key=${YT_API_KEY}`
            // `https://www.amazon.com/s?k=${nameofGame}`
            searchYoutube(endPointYoutubeSearch);
    })
}

function searchYoutube(url) {
    fetch(url)
        .then (response => response.json())
        .then (data => {
            console.log(data)
        })
}



        



