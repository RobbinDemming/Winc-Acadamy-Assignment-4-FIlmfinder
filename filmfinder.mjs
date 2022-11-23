import {movies} from './movie-data.mjs'

// ADDING MOVIES TO DOM FUNCTION

const addMoviesToDom = (array) => {

    const movieLis = array.map(movie => {

        const li = document.createElement("li");
        const img = document.createElement("img");
        const a = document.createElement("a");

    
        li.appendChild(a)
        a.setAttribute("href", "https://www.imdb.com/") // KOMT HIER DE IMDB-LINK FUNCTIE IN TE STAAN???
        a.setAttribute("target", "_blank")
        a.appendChild(img)
        img.src = movie.poster

        return li

    });

    movieLis.forEach(element => {
        const moviesUl = document.getElementById("movie-archive__ul");
        moviesUl.appendChild(element)
    });
};

addMoviesToDom(movies);





// RADIOBUTTONS EVENTLISTENERS

const addEventListenersToRadioButtons = () => {
    
    const radioButtons = document.querySelectorAll('[name="movie-filter"]');

    radioButtons.forEach(button => {
        button.addEventListener("change", (e) => {
            handleOnChangeEvent(e);
        });
    });
};

addEventListenersToRadioButtons();





// HANDLEONCHANGE FUNCTION

const handleOnChangeEvent = (event) => {  // ACTIVATED IN THE "addEventListeners()" FUNCTION 
    const moviesUl = document.getElementById("movie-archive__ul");
    // moviesUl.innerHTML = ""; // THIS DELETES ALL CURRENT MOVIES FROM THE DOM FIRST BEFORE ADDING NEW ONES.
    // moviesUl.replaceChildren(); // OR LIKE THIS.
    while (moviesUl.firstChild) { // OR LIKE THIS.
        moviesUl.removeChild(moviesUl.lastChild);
    }

     switch (event.target.value) { // THE SWITCHSTATEMENT ADDS THE NEW MOVIES TO THE DOM WITH THE FILTERFUNCTIONS BELOW. 
        case "latest": 
            filterLatestMovies();
            break;
        case "avengers":
            filterMoviesByWord("Avengers");
            break;
        case "x-men":
            filterMoviesByWord("X-Men");
            break;
        case "princess":
            filterMoviesByWord("Princess");
            break;
        case "batman":
            filterMoviesByWord("Batman");
            break;
        default:
            break;
    }

    // const e = event.target.value;

    // if (e === "latest") {
    //     filterLatestMovies();
    // } else if (e === "avengers") {
    //     filterMoviesByWord("Avengers");
    // } else if (e === "x-men") {
    //     filterMoviesByWord("X-Men");
    // } else if (e === "princess") {
    //     filterMoviesByWord("Princess");
    // } else if (e === "batman") { 
    //     filterMoviesByWord("Batman");
    // }

};




// MOVIE FILTER FUNCTIONS

const filterMoviesByWord = (wordInMovie) => { // ACTIVATED IN THE "handleOnChangeEvent()" FUNCTION
    const filteredMovies = movies.filter(movie => movie.title.match(wordInMovie));
    return addMoviesToDom(filteredMovies);
};

const filterLatestMovies = () => {
    const filteredMovies = movies.filter(movie => movie.year > 2014)
    return addMoviesToDom(filteredMovies);
};



// IK SNAP NIET HOE IK DEZE FUNCTIE MOET OPZETTEN..

const imdbLink = (imdbID) => {

};

imdbLink();







// SEARCHBAR AND BUTTONS FUNCTIONS

const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const resetButton = document.getElementById("reset-button");

searchButton.addEventListener("click", () => {
    const moviesUl = document.getElementById("movie-archive__ul");
    const searchString = searchBar.value.toLowerCase();
    const filteredMovies = movies.filter((movie) => {
        return (movie.title.toLocaleLowerCase().includes(searchString));
    });
    if (searchBar.value) {
    moviesUl.innerHTML = "";
    addMoviesToDom(filteredMovies);
    }
});

searchBar.addEventListener("keypress", (e) => {
 if (e.key === "Enter" && searchBar.value) {
    e.preventDefault();
    searchButton.click();
    }
});

resetButton.addEventListener("click", () => {
    const moviesUl = document.getElementById("movie-archive__ul");
    moviesUl.innerHTML = "";
    addMoviesToDom(movies);
});
