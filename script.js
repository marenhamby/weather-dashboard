//make sure the page has loaded before doing anything
$(document).ready(function() {
    
    //create an array to store the list of cities that have been searched for so they can render on the left of the screen
    var citySearched = []

    //create variable for api key to be used throughout the document
    var key = "923dd5734cd0c672e44b457634e8ad6c"


    //create a function to display the list of cities on the left of the screen
    function renderCityList () {
        
        //delete the content inside of the city searched array to prevent multiplying the list
        $("#cityList").empty();

        //create for loop to loop through cities and add them to the list shown on the page
        for (var i=0; i < citySearched.length; i++) {

            //add new tag for each city and add it to the city list
            var newTag = $("<a>");
            newTag.text(citySearched[i]);
            newTag.attr("class", "list-group-item list-group-item-action");
            $("#cityList").prepend(newTag);
        }
    }

    
    //create function to pull forecast information
    
    
    //when the button is clicked to submit the entered city, lots of stuff needs to happen
    $("#button-addon2").on("click", function(event){
        event.preventDefault();
        
        //add variable to grab the new text that was entered
        var newCity = $("#entry").val();
        
        //add the text to the array of cities
        citySearched.push(newCity);
        
        //clear the input box to prepare for next thing to be typed
        $("#entry").val("")
        
        //call the function to render the cities on the screen
        renderCityList()
        
        //create function to pull current weather information
        function currentWeather() {
    
            //create variable for the api url for the current weather
            var currentQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&appid=" + key
    
            //make api call
            $.ajax({
                url: currentQueryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response)


            });

        };

        //call function that pulls current weather
        currentWeather();

    })










})