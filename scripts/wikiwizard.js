// Code by Ishan Patel, std id: 8882831

// Define the API URL that we'll use to make requests to Wikipedia
const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

// Get references to the form, input, and results DOM elements
const formDOM = document.querySelector('.form');
const inputDOM = document.querySelector('.form-input');
const resultsDOM = document.querySelector('.results');

// Add a submit event listener to the form that fetches pages based on the user's search term
formDOM.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent the form from submitting and reloading the page
  const value = inputDOM.value; // get the value of the input element
  if (!value) { // if the value is empty or falsy, show an error message and return
    resultsDOM.innerHTML =
      '<div class="error"> please enter valid search term</div>';
    return;
  }
  fetchPages(value); // otherwise, fetch pages based on the search term
});

// Define an async function that fetches pages based on a search term
const fetchPages = async (searchValue) => {
  resultsDOM.innerHTML = '<div class="loading"></div>'; // show a loading spinner
  try {
    const response = await fetch(`${url}${searchValue}`); // make a request to the API with the search term
    const data = await response.json(); // parse the response as JSON
    const results = data.query.search; // extract the search results from the response data
    if (results.length < 1) { // if there are no search results, show an error message and return
      resultsDOM.innerHTML =
        '<div class="error">no matching results. Please try again</div>';
      return;
    }
    renderResults(results); // otherwise, render the search results
  } catch (error) { // if there's an error, show an error message
    resultsDOM.innerHTML = '<div class="error"> there was an error...</div>';
  }
};

// Define a function that renders a list of search results as cards
const renderResults = (list) => {
  const cardsList = list
    .map((item) => {
      const { title, snippet, pageid } = item; // extract the title, snippet, and page ID from each search result
      return `<a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
            <h4>${title}</h4>
            <p>
              ${snippet}
            </p>
          </a>`; // return a card for each search result with a link to the page on Wikipedia
    })
    .join(''); // join the cards into a single string
  resultsDOM.innerHTML = `<div class="articles">
          ${cardsList}
        </div>`; // render the cards as a list of articles in the results DOM element
};
