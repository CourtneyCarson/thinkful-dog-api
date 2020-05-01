/* This app doesn't follow a11y best practices, and the JS file is incomplete. Complete the getDataFromApi and displaySearchData functions. When you're done, this app should allow a user to search for a specific dog breed, and display a random image of that dog breed. You should make requests to this API: https://dog.ceo/dog-api/ . Also make any necessary adjustments to make this app accessible. */


//Step 1 - watch for user input; tell shopkeeper what shoe size, color
function watchSubmit() {

    //Step 1a - create a trigger
    $(".js-search-form").submit(function(event) {

        //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
        event.preventDefault();

        //Step 1b - get user input - get the value from the input box
        let queryTarget = $('.js-query').val();

        //console.log(queryTarget);

        //Step 1c - input validation - validate input
        if (queryTarget == '') {
            alert("Please select a breed");
        } else {
            //Step 1d - use the api function - use that input values to call the getResults function defined at the top
            getDataFromApi(queryTarget);
        }

    });
}

//Step 2 - define the function to make the api call; shopkeeper goes to warehouse to get shoe
function getDataFromApi(queryTarget) {

    //Step 2a - create the url
    const url = `https://dog.ceo/api/breed/${queryTarget}/images/random`;
    console.log(url);
    // Step 2b - make the api call using the URL, dataType (JSON or JSONP), type (GET or POST)
    fetch(url)

    //Step 2c - success scenario (call the function to display the results)
    .then(response => {
            if (response.ok) {
                return response.json();
            }
            // DISPLAY ERRORS if the server connection works but the json data is broken
            throw new Error(response.statusText);
        })
        .then(responseJson => displaySearchData(responseJson))

    // Step 2d - failure scenario  (DISPLAY ERRORS if the server connection fails)
    .catch(err => {
        console.log(err);
    });
};


//Step 3 - display the results; sales process
function displaySearchData(responseJson) {

    //Step 3a - console.log the results
    console.log(responseJson);

    //Step 3b - create an HTML results variable
    let htmlOutput = `<li><img src='${responseJson.message}' alt='Dog image'/></li>`;

    //Step 3c - send the content of HTML results variable to the HTML - display them in the html page
    $('#js-search-results').html(htmlOutput);

    // Step 3d - remove class hidden from the result container
    $('#js-search-results').removeClass("hidden");
}






$(watchSubmit);
