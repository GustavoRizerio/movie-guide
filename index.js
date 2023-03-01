let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//funçao para pegar a data da api

let getMovie = () => {
    let movie = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movie}&apikey=${key}`;

    //se o compo de pesquisa estiver vazio

    if (movie.length <= 0) {
        result.innerHTML =
            `<h3 class="msg"> Por favor coloque o nome do filme</h3>`;
    }

    //se o campo nao estive vazio
    else {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                //se o filme existir no banco de dados
                if (data.Response === "True") {
                    result.innerHTML = `<div class="info">
                <img src=${data.Poster} class="poster">
                <div>
                <h2>${data.Title}</h2>
                <div class="rating">
                    <img src="star-icon.svg">
                    <h4>${data.imdbRating}</h4>
                </div>
                <div class="details">
                    <span>${data.Rated}</span>
                    <span>${data.Year}</span>
                    <span>${data.Runtime}</span>
                </div>
                <div class="genre">
                    <div>${data.Genre.split(',').join('</div><div>')}</div>
                </div>
                </div>
                </div>
                <h3>Plot:</h3>
                <p>${data.Plot}</p>
                <h3>Cast:</h3>
                <p>${data.Actors}</p>`;

                }

                //se o filme nao estiver no banco de dados
                else{
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`
                }
            })
            //se o erro occorrer
            .catch(() =>{
                result.innerHTML = `<h3 class="msg">Error occured</h3>`
            });
    }
};

searchBtn.addEventListener("click", getMovie)
window.addEventListener("load", getMovie)
