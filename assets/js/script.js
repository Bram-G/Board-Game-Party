let maxPlayersInput = document.querySelector("#inputMax");
let minPlayersInput = document.querySelector("#inputMin");
let maxTimeInput = document.querySelector("#inputTime");
let gameNameInput = document.querySelector("#gameNameInput");
let searchButton = document.querySelector(".btn");
// ah-api-key = AIzaSyCTD8bBuqk848EMDD-KGrIraiHg4dhSiZI
// ah-api-key2 = AIzaSyBr2xAN2JPItpBZfu8FjhFyY7-908xKleM
// dc-api-key = AIzaSyBDsfH-p60RH4HGaZ8FKWozhjZW7LCA_CY
const endPointAtlasRandom = `https://api.boardgameatlas.com/api/search?random=true&client_id=gwluPRwMeB&pretty=true`;
const endPointAtlasSearch = `https://api.boardgameatlas.com/api/search?name=catan&client_id=gwluPRwMeB&pretty=true`;
const YT_API_KEY = "AIzaSyBr2xAN2JPItpBZfu8FjhFyY7-908xKleM";
/*
bga api search criteria min_players= max_players= lt_max_playtime= categories=
*/

//gameSearch(endPointAtlasSearchTEST);
//gameRandom(endPointAtlasRandom)

searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  let baseURL = "https://api.boardgameatlas.com/api/search?";
  let endURL = "client_id=gwluPRwMeB&pretty=true";

  if (maxPlayersInput.value && parseInt(maxPlayersInput.value)) {
    baseURL += `max_players=${maxPlayersInput.value}&`;
  }
  if (minPlayersInput.value && parseInt(minPlayersInput.value)) {
    baseURL += `min_players=${minPlayersInput.value}&`;
  }
  if (maxTimeInput.value && parseInt(maxTimeInput.value)) {
    baseURL += `lt_max_playtime=${maxTimeInput.value}&`;
  }
  if (gameNameInput.value) {
    baseURL += `name=${gameNameInput.value}&`;
  }

  gameSearch(baseURL + endURL)
  gameRandom(endPointAtlasRandom);
});

// Pulling a random game and some brief info from the Board Game Atlas API
function gameRandom(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("gameRandomTitle").textContent =
        "Title: " + data.games[0].name;
      document.getElementById("gameRandomImage").src =
        data.games[0].images.large;
      document.getElementById("gameRandomRating").textContent =
        "Rating: " + data.games[0].average_user_rating;
      document.getElementById("gameRandomReleaseDate").textContent =
        "Release Date: " + data.games[0].year_published;
      document.getElementById("gameRandomMsrp").textContent =
        "MSRP: $" + data.games[0].msrp;
      document.getElementById("gameRandomPublisher").textContent =
        "Publisher: " + data.games[0].primary_publisher.name;
    });
}

// results for game that user SEARCHES for in the search bar and clicks submit
function gameSearch(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("gameSearchTitle").textContent =
        "Title: " + data.games[0].name;
      document.getElementById("gameSearchImage").src =
        data.games[0].images.small;
      document.getElementById("gameSearchRating").textContent =
        "Rating: " + data.games[0].average_user_rating;
      document.getElementById("gameSearchReleaseDate").textContent =
        "Release Date: " + data.games[0].year_published;
      document.getElementById("gameSearchMsrp").textContent =
        "MSRP: $" + data.games[0].msrp;
      document.getElementById("gameSearchPublisher").textContent =
        "Publisher: " + data.games[0].primary_publisher.name;

      let gameTitle = data.games[0].name;
      let youTubeSearch = `${gameTitle} boardgame`;

      const endPointYoutubeSearch = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${youTubeSearch}&key=${YT_API_KEY}`;
      searchYoutube(endPointYoutubeSearch);
      saveGameId(data)

      let amazonSearchLink = `https://www.amazon.com/s?k=${gameTitle}`;
      document.getElementById("gameAmazonSearch").href = amazonSearchLink;
      document.getElementById("gameAmazonSearch").textContent =
        "Search on Amazon";
    });
}

function searchYoutube(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById(
        "gameYoutubeSearch1"
      ).href = `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`;
      document.getElementById("gameYoutubeSearch1").textContent =
        data.items[0].snippet.title;
      document.getElementById(
        "gameYoutubeSearch2"
      ).href = `https://www.youtube.com/watch?v=${data.items[1].id.videoId}`;
      document.getElementById("gameYoutubeSearch2").textContent =
        data.items[1].snippet.title;
    });
}
$(document).ready(function () {
  $(".materialboxed").materialbox();
});

// function generateExtraCards()

// //function to save game id and name to local storage after search
function saveGameId(data) {
  let gameName = data.games[0].name;
  let gameId = data.games[0].id;
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  let isDuplicate = history.find(game => game.id === gameId);
  if (!isDuplicate) {
    history.push({name: gameName, id: gameId});
    localStorage.setItem("searchHistory", JSON.stringify(history));;
}
}