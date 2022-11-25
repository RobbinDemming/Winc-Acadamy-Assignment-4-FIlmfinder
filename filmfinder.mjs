import {movies} from './movie-data.mjs'

// ADDING MOVIES TO DOM FUNCTION

const addMoviesToDom = (array) => {

    const movieLis = array.map(movie => {

        const li = document.createElement("li");
        const img = document.createElement("img");
        const a = document.createElement("a");

    
        li.appendChild(a)
        a.setAttribute("href", "https://www.imdb.com/title/" + movie.imdbID)
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
            searchResults(e);
        });
    });
};

addEventListenersToRadioButtons();

// HANDLEONCHANGE FUNCTION

const handleOnChangeEvent = (e) => {  // ACTIVATED IN THE "addEventListeners()" FUNCTION 
    const moviesUl = document.getElementById("movie-archive__ul");

    while (moviesUl.firstChild) { 
        moviesUl.removeChild(moviesUl.lastChild);
    }

     switch (e.target.value) { // THE SWITCHSTATEMENT ADDS THE NEW MOVIES TO THE DOM WITH THE FILTERFUNCTIONS BELOW. 
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
    const filteredMovies = movies.filter(movie => movie.year > 2014);
    return addMoviesToDom(filteredMovies);
};

// SEARCH RESULTS FUNCTION

const searchResults = (e) => {

    const searchString = searchBar.value;
    const resultCount = document.getElementById("movie-archive__ul").children.length
    const searchResult = document.getElementById("search-result")
    const radioHtml = document.querySelector("span").innerHTML; // <---------------------------------------------------------------

    switch(e.target.type) {
        case "search":
            searchResult.innerHTML = resultCount + " Results found on '" + searchString + "'";
        break
        case "button":
            searchResult.innerHTML = resultCount + " Results found on '" + searchString + "'";
        break
        case "radio":
            searchResult.innerHTML = resultCount + " Results found on '" + radioHtml + "'"; // <------------------------------------
        break
    };
};

// SEARCHBAR AND ITS BUTTONS EVENTLISTENERS

const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const resetButton = document.getElementById("reset-button");

searchBar.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && searchBar.value) {
       e.preventDefault();
       searchButton.click();
       searchResults(e);
       }
});

searchButton.addEventListener("click", (e) => {
    const moviesUl = document.getElementById("movie-archive__ul");
    const searchString = searchBar.value.toLowerCase();
    const filteredMovies = movies.filter(movie => movie.title.toLocaleLowerCase().includes(searchString));
    
    if (searchBar.value) {
    moviesUl.replaceChildren();
    addMoviesToDom(filteredMovies);
    searchResults(e);
    }
});

resetButton.addEventListener("click", () => {
    const moviesUl = document.getElementById("movie-archive__ul");
    const searchResult = document.getElementById("search-result")
    moviesUl.replaceChildren();
    addMoviesToDom(movies);
    searchResult.innerHTML = "";
    searchBar.value = "";
});

