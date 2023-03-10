let maxPlayersInput = document.querySelector("#inputMax");
let minPlayersInput = document.querySelector("#inputMin");
let maxTimeInput = document.querySelector("#inputTime");
let gameNameInput = document.querySelector("#gameNameInput");
let searchButton = document.querySelector(".btn");
let lowerSection = document.querySelector("#lower-section");
let gameHistory = document.querySelector(".gameHistory");
let randomButton = document.querySelector("#randomizer");
// ah-api-key = AIzaSyCTD8bBuqk848EMDD-KGrIraiHg4dhSiZI
// ah-api-key2 = AIzaSyBr2xAN2JPItpBZfu8FjhFyY7-908xKleM
// dc-api-key = AIzaSyBDsfH-p60RH4HGaZ8FKWozhjZW7LCA_CY
const endPointAtlasRandom = `https://api.boardgameatlas.com/api/search?random=true&client_id=gwluPRwMeB&pretty=true`;
const endPointAtlasSearch = `https://api.boardgameatlas.com/api/search?name=catan&client_id=gwluPRwMeB&pretty=true`;
const YT_API_KEY = "AIzaSyBr2xAN2JPItpBZfu8FjhFyY7-908xKleM";

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

  gameSearch(baseURL + endURL);
  gameRandom(baseURL + endURL);
});
// click event listening for random button to be pressed then adding random game to main card
randomButton.addEventListener("click", (e) => {
  fetch(endPointAtlasRandom)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("gameSearchTitle").textContent =
        "Title: " + data.games[0].name;
      document.getElementById("gameSearchDescription").textContent =
        data.games[0].description_preview;
      document.getElementById("gameSearchImage").src =
        data.games[0].images.medium;
      document.getElementById("gameSearchRating").textContent =
        "Rating: " + data.games[0].average_user_rating.toFixed(2);
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

      let amazonSearchLink = `https://www.amazon.com/s?k=${gameTitle}`;
      document.getElementById("gameAmazonSearch").href = amazonSearchLink;
      document.getElementById("gameAmazonSearch").textContent =
        "Search on Amazon";

      lowerSection.innerHTML = "";

      fetch(endPointAtlasRandom)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          generateCards(
            data.games[0].name,
            data.games[0].images.medium,
            data.games[0].primary_publisher.name,
            data.games[0].msrp,
            data.games[0].min_playtime,
            data.games[0].max_playtime,
            data.games[0].id
          );
        });

      for (let index = 0; index < 1; index++) {
        fetch(endPointAtlasRandom)
          .then((response) => response.json())
          .then((data) => {
            generateCards(
              data.games[0].name,
              data.games[0].images.medium,
              data.games[0].primary_publisher.name,
              data.games[0].msrp,
              data.games[0].min_playtime,
              data.games[0].max_playtime,
              data.games[0].id
            );
          });
      }
    });
});

// Pulling a random game and some brief info from the Board Game Atlas API
function gameRandom(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      lowerSection.innerHTML = "";
      let indexes = [1, 2, 3, 4];
      // while (indexes.length < 4) {
      //   let index = Math.floor(Math.random() * (data.games.length - 1));
      //   if (index === 0) {
      //     index += 1;
      //   }
      //   if (
      //     index !== indexes[0] &&
      //     index !== indexes[1] &&
      //     index !== indexes[2] &&
      //     index !== indexes[3]
      //   ) {
      //     indexes.push(index);
      //   }
      // }
      for (let x of indexes) {
        generateCards(
          data.games[x].name,
          data.games[x].images.medium,
          data.games[x].primary_publisher.name,
          data.games[x].msrp,
          data.games[x].min_playtime,
          data.games[x].max_playtime,
          data.games[x].id
        );
      }
    });
}

// results for game that user SEARCHES for in the search bar and clicks submit
function gameSearch(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("gameSearchTitle").textContent =
        "Title: " + data.games[0].name;
      document.getElementById("gameSearchDescription").textContent =
        data.games[0].description_preview;
      document.getElementById("gameSearchImage").src =
        data.games[0].images.medium;
      document.getElementById("gameSearchRating").textContent =
        "Rating: " + data.games[0].average_user_rating.toFixed(2);
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

function generateCards(
  gameName,
  gamePicture,
  gamePublisher,
  gameMsrp,
  gameMinPlaytime,
  gameMaxPlaytime,
  gameId
) {
  let outerMostDiv = genEle("div");
  outerMostDiv.setAttribute("class", "card small z-depth-4 col s12 m5 l5");
  outerMostDiv.setAttribute("id", "generatedSearchCard");

  let innerDiv1 = genEle("div");
  innerDiv1.setAttribute(
    "class",
    "card-image waves-effect waves-block waves-light"
  );
  let img = genEle("img");
  img.setAttribute("class", "activator");
  img.setAttribute("src", gamePicture);
  img.setAttribute("id", "gameRandomImage");
  innerDiv1.append(img);

  let innerDiv2 = genEle("div");
  innerDiv2.setAttribute("class", "card-content");
  let innerSpan1 = genEle("span");
  innerSpan1.setAttribute(
    "class",
    "card-title activator grey-text text-darken-4"
  );
  innerSpan1.setAttribute("id", "gameRandomTitle");
  innerSpan1.textContent = gameName;
  let innerI1 = genEle("i");
  innerI1.setAttribute("class", "material-icons right");
  innerI1.textContent = "more_vert";
  innerSpan1.append(innerI1);
  let innerPara = genEle("p");
  innerPara.setAttribute("id", "gameSearchPublisher");
  innerPara.textContent = gamePublisher;
  innerSpan1.append(innerPara);
  innerDiv2.append(innerSpan1);

  let innerDiv3 = genEle("div");
  innerDiv3.setAttribute("class", "card-reveal grey lighten-1");
  let innerSpan2 = genEle("span");
  innerSpan2.setAttribute("class", "card-title grey-text text-darken-4");
  innerSpan2.textContent = gameName;
  let innerI2 = genEle("i");
  innerI2.setAttribute("class", "material-icons right");
  innerI2.textContent = "close";
  innerSpan2.append(innerI2);
  let innerPara3 = genEle("p");
  innerPara3.textContent = "MSRP: $" + gameMsrp;
  let innerPara4 = genEle("p");
  innerPara4.textContent =
    "Playtime: " + gameMinPlaytime + " - " + gameMaxPlaytime + " minutes";
  let innerMostDiv = genEle("div");
  innerMostDiv.setAttribute("class", "card-action");
  innerMostDiv.setAttribute("id", "card-action-flex");
  let innerAnchor = genEle("a");
  innerAnchor.setAttribute("class", "waves-effect waves-light btn light-blue");
  innerAnchor.setAttribute("id", "gameCardHistoryID");
  innerAnchor.textContent = "Save Game To History";
  let innerMostI = genEle("i");
  innerMostI.setAttribute("class", "material-icons left");
  innerMostI.setAttribute("id", "gameHistoryID");
  innerMostI.textContent = "history";
  let a1 = genEle("a");
  a1.setAttribute("class", "waves-effect waves-light btn light-blue");
  a1.setAttribute("id", "pastSearchBtn");
  a1.setAttribute("data-gameName", gameName);
  a1.textContent = "Show This Search";
  let i1 = genEle("i");
  i1.setAttribute("class", "material-icons left");
  i1.textContent = "history";
  a1.append(i1);
  innerMostDiv.append(a1);
  innerAnchor.append(innerMostI);
  innerMostDiv.append(innerAnchor);
  innerDiv3.append(innerSpan2);
  innerDiv3.append(innerPara3);
  innerDiv3.append(innerPara4);
  innerDiv3.append(innerMostDiv);

  outerMostDiv.append(innerDiv1);
  outerMostDiv.append(innerDiv2);
  outerMostDiv.append(innerDiv3);

  lowerSection.append(outerMostDiv);

  innerAnchor.setAttribute("data-gameName", gameName);
  innerAnchor.setAttribute("data-gamePublisher", gamePublisher);
  innerAnchor.setAttribute("data-gameId", gameId);
  innerAnchor.setAttribute("data-gameImage", gamePicture);
}

pullHistoryData();
function pullHistoryData() {
  gameHistory.innerHTML = "";
  let pastGameData = JSON.parse(localStorage.getItem("searchHistory"));
  if (pastGameData != null) {
    for (let i = 0; i < pastGameData.length; i++) {
      generatePastGameCard(
        pastGameData[i].name,
        pastGameData[i].publisher,
        pastGameData[i].image
      );
    }
  }
}

function generatePastGameCard(savedName, savedPublisher, savedImage) {
  let div_1 = genEle("div");
  div_1.setAttribute("class", "col s10 m6");
  div_1.setAttribute("id", "pastGameCard");

  let div_2 = genEle("div");
  div_1.append(div_2);
  div_2.setAttribute("class", "card horizontal blue darken-1 z-depth-4");

  let div_2_1 = genEle("div");
  div_2.append(div_2_1);
  div_2_1.setAttribute("class", "card-image");
  let img = genEle("img");
  img.setAttribute("src", savedImage);
  img.setAttribute("id", "gameRandomImage");
  div_2_1.append(img);

  let div_2_2 = genEle("div");
  div_2.append(div_2_2);
  div_2_2.setAttribute("class", "card-stacked");

  let div_2_2_1 = genEle("div");
  div_2_2_1.setAttribute("class", "card-content");
  let p1 = genEle("p");
  p1.textContent = savedName;
  let p2 = genEle("p");
  p2.textContent = savedPublisher;
  div_2_2_1.append(p1);
  div_2_2_1.append(p2);
  div_2_2.append(div_2_2_1);

  let div_2_2_2 = genEle("div");
  div_2_2_2.setAttribute("class", "card-action");
  div_2_2_2.setAttribute("id", "card-action-flex");
  let a1 = genEle("a");
  a1.setAttribute("data-gameName", savedName);
  a1.setAttribute("class", "waves-effect waves-light btn light-blue");
  a1.setAttribute("id", "pastSearchBtn");
  a1.textContent = "Show This Search";
  let i1 = genEle("i");
  i1.setAttribute("class", "material-icons left");
  i1.textContent = "history";
  a1.append(i1);
  div_2_2_2.append(a1);

  let a2 = genEle("a");
  a2.setAttribute("class", "waves-effect waves-light btn red lighten-2");
  a2.setAttribute("id", "pastSearchDelete");
  a2.textContent = "Delete From History";
  let i2 = genEle("i");
  i2.setAttribute("class", "material-icons right");
  i2.textContent = "delete_forever";
  a2.append(i2);
  div_2_2_2.append(a2);
  div_2_2.append(div_2_2_2);

  gameHistory.prepend(div_1);

  a2.addEventListener("click", function () {
    removeGameFromHistory(
      this.parentNode.parentNode.children[0].children[0].textContent
    );
    this.parentNode.parentNode.parentNode.parentNode.remove();
  });
}

//function to remove saved game from local storage and remove card from page
function removeGameFromHistory(gameString) {
  let pastGameData = JSON.parse(localStorage.getItem("searchHistory"));
  for (let i = 0; i < pastGameData.length; i++) {
    if (
      pastGameData[i].name === gameString
      // pastGameData[i].publisher === gamePublisher &&
      // pastGameData[i].image === gameImage
    ) {
      console.log(pastGameData + " before splice");
      pastGameData.splice(i, 1);
      console.log(pastGameData + " after splice");
      localStorage.setItem("searchHistory", JSON.stringify(pastGameData));
    }
  }
}

function genEle(type) {
  return document.createElement(type);
}

// //function to save game id and name to local storage after search
function saveGameId(data) {
  let gameName = data.games[0].name;
  let gamePublisher = data.games[0].primary_publisher.name;
  let gameImage = data.games[0].image_url;
  let history = JSON.parse(localStorage.getItem("searchHistory"));
  let isDuplicate = history.find((game) => game.name === gameName);
  if (!isDuplicate) {
    history.push({
      name: gameName,
      publisher: gamePublisher,
      image: gameImage,
    });
    localStorage.setItem("searchHistory", JSON.stringify(history));
    generatePastGameCard(gameName, gamePublisher, gameImage);
  }
}

document
  .getElementById("gameHistoryID")
  .addEventListener("click", function (event) {
    let cardContent = event.target.parentNode.parentNode.parentNode.children;
    let title = cardContent[0].textContent.replace("Title: ", "").trim();
    let publisher = cardContent[1].children[3].textContent
      .replace("Publisher: ", "")
      .trim();
    let imgEl = document.querySelector("#gameSearchImage");
    let imgSource = imgEl.getAttribute("src");
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    let isDuplicate = history.find((game) => game.name === title);
    if (!isDuplicate) {
      history.push({
        name: title,
        image: imgSource,
        publisher: publisher,
      });
      localStorage.setItem("searchHistory", JSON.stringify(history));
      generatePastGameCard(title, publisher, imgSource);
    }
  });

document
  .getElementById("lower-section")
  .addEventListener("click", function (event) {
    if (event.target.matches("#gameCardHistoryID")) {
      var gameName = event.target.getAttribute("data-gameName");
      var gamePublisher = event.target.getAttribute("data-gamePublisher");
      var gameId = event.target.getAttribute("data-gameId");
      var gameImage = event.target.getAttribute("data-gameImage");
      let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
      let isDuplicate = history.find((game) => game.id === gameId);
      if (!isDuplicate) {
        history.push({
          name: gameName,
          image: gameImage,
          publisher: gamePublisher,
        });
        localStorage.setItem("searchHistory", JSON.stringify(history));
        generatePastGameCard(gameName, gamePublisher, gameImage);
      }
    }

    if (event.target.matches("#pastSearchBtn")) {
      let gameName = event.target.getAttribute("data-gameName");
      let minPlayers = Math.floor(Math.random() * 8) + 1;
      let searchUrl = `https://api.boardgameatlas.com/api/search?name=${gameName}&random=true&client_id=gwluPRwMeB&pretty=true`;
      let randomUrl = `https://api.boardgameatlas.com/api/search?min_players=${minPlayers}&limit=5&client_id=gwluPRwMeB&pretty=true`;
      gameSearch(searchUrl);
      gameRandom(randomUrl);
    }
  });

document.querySelector(".gameHistory").addEventListener("click", (event) => {
  if (event.target.matches("#pastSearchBtn")) {
    let gameName = event.target.getAttribute("data-gameName");
    let minPlayers = Math.floor(Math.random() * 8) + 1;
    let searchUrl = `https://api.boardgameatlas.com/api/search?name=${gameName}&random=true&client_id=gwluPRwMeB&pretty=true`;
    let randomUrl = `https://api.boardgameatlas.com/api/search?min_players=${minPlayers}&limit=5&client_id=gwluPRwMeB&pretty=true`;
    gameSearch(searchUrl);
    gameRandom(randomUrl);
  }
});

function generateGameOnPageLoad() {
  fetch(endPointAtlasRandom)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("gameSearchTitle").textContent =
        "Title: " + data.games[0].name;
      document.getElementById("gameSearchDescription").textContent =
        data.games[0].description_preview;
      document.getElementById("gameSearchImage").src =
        data.games[0].images.medium;
      document.getElementById("gameSearchRating").textContent =
        "Rating: " + data.games[0].average_user_rating.toFixed(2);
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

      let amazonSearchLink = `https://www.amazon.com/s?k=${gameTitle}`;
      document.getElementById("gameAmazonSearch").href = amazonSearchLink;
      document.getElementById("gameAmazonSearch").textContent =
        "Search on Amazon";
    });
}

generateGameOnPageLoad();
