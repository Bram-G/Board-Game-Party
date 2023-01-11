gameSearch()
function gameSearch() {

    const endPointAtlas = `https://api.boardgameatlas.com/api/search?random=true&client_id=gwluPRwMeB&pretty=true`

    fetch(endPointAtlas) 
    .then (response => response.json()) 
    .then (data => {
    console.log(data)
    document.getElementById('gameSearchTitle').textContent = "Title: " + data.games[0].name
    document.getElementById('gameSearchDescription').textContent = "Description: " + data.games[0].description_preview
    document.getElementById('gameSearchImage').src = data.games[0].image_url
   
    
    })

}



