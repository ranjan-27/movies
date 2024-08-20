let APIKey = "2bbd728a";
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

const getData = async (movie) => {
    try {
        let fetchData = await fetch(`http://www.omdbapi.com/?t=${movie}&apikey=${APIKey}`);
        let jsonData = await fetchData.json();

        // Check if the response is valid
        if (jsonData.Response === "False") {
            throw new Error(jsonData.Error);
        }

        console.log(jsonData);
        document.querySelector(".card").innerHTML = "";
        searchInput.value = "";

        let div = document.createElement("div");
        div.classList.add("movieCard");
        div.innerHTML = `
            <img src="${jsonData.Poster}" alt="">
            <div class="cardText">
                <a href="www.imbd.com"><h1>${jsonData.Title}</h1></a>
                <p class="rating">Rating : <span>${jsonData.Ratings[0]?.Value || 'N/A'}</span></p>
                <a href="#">${jsonData.Genre}</a>
                <p>Release : <span>${jsonData.Released}</span></p>
                <p>Duration : <span>${jsonData.Runtime}</span></p>
                <p>Description : <span>${jsonData.Plot}</span></p>
            </div>
        `;
        document.querySelector(".card").appendChild(div);
    } catch (error) {
        document.querySelector(".card").innerHTML = `<h1>${error.message}</h1>`;
    }
}

searchBtn.addEventListener("click", function() {
    let movieName = searchInput.value.trim();
    if (movieName !== "") {
        getData(movieName);
    } else {
        document.querySelector(".card").innerHTML = "<h1>First Search Movie Name</h1>";
    }
});
