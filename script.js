let movienameEle = document.getElementById("umoviename");
let cardContainer = document.querySelector(".card-container");

let apikey = "2921ae46";

function fetchmovies() {
    let moviename = movienameEle.value.trim();
    console.log(moviename);

    if (moviename == "") {
        alert("please enter a movie name");
    } else {
        let data = fetch(`https://www.omdbapi.com/?s=${moviename}&apikey=${apikey}`);
        console.log(data);

        data.then(res => res.json())
        .then((d) => {
            console.log(d);

            // Clear old results
            cardContainer.innerHTML = "";

            if (d.Response === "True") {
                d.Search.forEach(movie => {
                    let moviecard = document.createElement("div");
                    moviecard.classList.add("moviecard");

                    moviecard.innerHTML = `
                      <div class="card bg-black text-white" onclick="showDetails('${movie.imdbID}')">
                        <img src="${movie.Poster}" class="card-img" alt="No Poster">
                        <div class="card-info">
                        <h3 class="card-title">${movie.Title.length>14 ?movie.Title.slice(0,14)+"....":movie.Title}</h3>
                        <p class="movie-year">Year: ${movie.Year}</p>
                        </div>
                        </div>
                    `;

                    cardContainer.appendChild(moviecard);
                });
            } else {
                cardContainer.innerHTML = `<p>No movies found</p>`;
            }
        })
        .catch(err => console.error("Error fetching data:", err));
    }
    
}
function showDetails(id) {
  fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${id}&plot=full`)
    .then(res => res.json())
    .then(movie => {
      document.getElementById("movieTitle").innerText = movie.Title;
      document.getElementById("movieBody").innerHTML = `

        <img src="${movie.Poster}" class="img-fluid mb-3 mx-auto d-block">
        <p><b>Year:</b> ${movie.Year}</p>
        <p><b>Genre:</b> ${movie.Genre}</p>
        <p><b>Plot:</b> ${movie.Plot}</p>
      `;
      new bootstrap.Modal(document.getElementById('movieModal')).show();
    });
}
