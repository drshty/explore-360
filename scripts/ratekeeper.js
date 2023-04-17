// Code by Twinkle Verma, std id: 8858455

// Include the API URL for currency exchange rates
const api = "https://api.exchangerate-api.com/v4/latest/USD";

// Get references to the relevant DOM elements
var convert = document.querySelector(".convert");
var search = document.querySelector(".searchBox");
var fromCurrecy = document.querySelector(".from");
var toCurrecy = document.querySelector(".to");
var finalValue = document.querySelector(".finalValue");
var finalAmount = document.getElementById("finalAmount");

var searchValue; // initialize a variable to store the user's input
var resultFrom; // initialize a variable to store the 'from' currency
var resultTo; // initialize a variable to store the 'to' currency

// Add an event listener to the search box to update the value
search.addEventListener('input', updateValue);

// Add an event listener to the 'from' currency dropdown to update the selected currency
fromCurrecy.addEventListener('change', (event) => {
    resultFrom = `${event.target.value}`;
});
  
// Add an event listener to the 'to' currency dropdown to update the selected currency
toCurrecy.addEventListener('change', (event) => {
    resultTo = `${event.target.value}`;
});

// Define a function to update the searchValue variable
function updateValue(e) {
    searchValue = e.target.value;
}

// Add a click event listener to the 'convert' button
convert.addEventListener("click", function() {
    if (isNaN(searchValue) || searchValue === '') { // if the user input is not a number or is empty, show an error message and clear the input
        alert("Please enter a valid number");
        search.value = '';
        finalAmount.style.display = "none";
    } else { // otherwise, call the getResults function
        getResults();
    }
});

// Define the function to fetch currency exchange rate data from the API
function getResults() {
    fetch(`${api}`)
        .then(currency => {
            return currency.json(); // parse the response as JSON
        }).then(displayResults); // then call the displayResults function with the parsed data
}

// Define the function to display the converted value
function displayResults(currency) {
    let fromRate = currency.rates[resultFrom]; // get the exchange rate for the 'from' currency
    let toRate = currency.rates[resultTo]; // get the exchange rate for the 'to' currency
    finalValue.innerHTML = ((toRate / fromRate) * searchValue).toFixed(2); // calculate and display the converted value
    finalAmount.style.display = "block"; // show the converted value on the page
}

// Add an event listener to the 'reset' button to reload the page and clear the input and result
function clearVal() {
    window.location.reload();
    document.getElementsByClassName("finalValue").innerHTML = "";
};
