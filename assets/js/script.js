
// const endPointAtlasSearch = `https://api.boardgameatlas.com/api/search?name=${document.getElementById('gameSearchInput').value}&client_id=gwluPRwMeB&pretty=true`

// gameSearch()
gameRandom()
// Pulling a random game and some brief info from the Board Game Atlas API
function gameRandom() {

    const endPointAtlasRandom = `https://api.boardgameatlas.com/api/search?random=true&client_id=gwluPRwMeB&pretty=true`

    fetch(endPointAtlasRandom) 
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
function gameSearch() {
    const endPointAtlasSearchTEST = `https://api.boardgameatlas.com/api/search?name=catan&client_id=gwluPRwMeB&pretty=true`

     fetch(endPointAtlasSearchTEST) 
    .then (response => response.json()) 
    .then (data => {
    console.log(data)
    document.getElementById('gameSearchTitle').textContent = "Title: " + data.games[0].name
    document.getElementById('gameSearchImage').src = data.games[0].images.medium
    document.getElementById('gameSearchRating').textContent = "Rating: " + data.games[0].average_user_rating
    document.getElementById('gameSearchReleaseDate').textContent = "Release Date: " + data.games[0].year_published
    document.getElementById('gameSearchMsrp').textContent = "MSRP: $" + data.games[0].msrp
    document.getElementById('gameSearchPublisher').textContent = "Publisher: " + data.games[0].primary_publisher.name

    // let gameTitle = data.games[0].name
    // console.log(gameID)
    const YT_API_KEY = 'AIzaSyCTD8bBuqk848EMDD-KGrIraiHg4dhSiZI'
    const endPointYoutubeSearch = `https://www.googleapis.com/youtube/v3/search?${nameofGame}&key=${YT_API_KEY}`
    // `https://www.amazon.com/s?k=${nameofGame}`
    fetch(endPointYoutubeSearch)
     .then (response => response.json())
     .then (data => {
       
     console.log(data)
    })
    })
}

search.addEventListener("submit", function (e) {
  e.preventDefault();
  gameSearch();
});
