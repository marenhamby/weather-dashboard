//make sure the page has loaded before doing anything
$(document).ready(function() {
    
    //create an array to store the list of cities that have been searched for so they can render on the left of the screen
    var citySearched = []
    //create variable for api key to be used throughout the document
    var key = "923dd5734cd0c672e44b457634e8ad6c"
    //create variable to put the current city info in
    var newCity = ""

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

    //create function to pull current weather information
    function currentWeather() {

        //create variable for the api url for the current weather
        var currentQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&appid=" + key

        //make api call for current weather
        $.ajax({
            url: currentQueryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            //convert temperature to fahrenheit from kelvin, wind from meter/sec to mph, and adding link for icon
            var fCurrentTemp = Math.floor((response.main.temp - 273.15) * 1.8 + 32);
            var windSpeed = Math.floor(response.wind.speed * 2.237);
            var weatherIcon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
            //save input to the current weather locations on the page
            $("#currentCityDate").text(response.name);
            $("#currentIcon").attr("src", weatherIcon);
            $("#currentTemp").text("Current temperature: " + fCurrentTemp + String.fromCharCode(176) + "F");
            $("#currentHumid").text("Current humidity: " + response.main.humidity + "%");
            $("#currentSpeed").text("Current wind speed: " + windSpeed + "mph");
        });

    };
    
    //create function to pull forecast information
    function forecastWeather() {

        //create variable for the api url for the forecast weather
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + newCity + "&cnt=5&appid=" + key
        
        //make api call for the forecast weather
        $.ajax({
            url: forecastQueryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            
            //create array with the 5 day forecast information
            var forecastData = [
                {
                    date: response.list[0].dt,
                    icon: response.list[0].weather[0].icon,
                    temp: response.list[0].temp.day,
                    humid: response.list[0].humidity,
                },
                {
                    date: response.list[1].dt,
                    icon: response.list[1].weather[0].icon,
                    temp: response.list[1].temp.day,
                    humid: response.list[1].humidity,
                },
                {
                    date: response.list[2].dt,
                    icon: response.list[2].weather[0].icon,
                    temp: response.list[2].temp.day,
                    humid: response.list[2].humidity,
                },
                {
                    date: response.list[3].dt,
                    icon: response.list[3].weather[0].icon,
                    temp: response.list[3].temp.day,
                    humid: response.list[3].humidity,
                },
                {
                    date: response.list[4].dt,
                    icon: response.list[4].weather[0].icon,
                    temp: response.list[4].temp.day,
                    humid: response.list[4].humidity,
                },
            ]
            
            
            //set up loop to go through the 5 day forecast information and create and populate cards
            for (var i=0; i < forecastData.length; i++) {
                //set variables to make temperature conversions, add info for icon link, and convert the date
                var fForecastTemp = Math.floor((forecastData[i].temp - 273.15) * 1.8 + 32);
                var forecastIcon = "https://openweathermap.org/img/wn/" + forecastData[i].icon + ".png"
                var forecastDate = "April" + forecastData[i].date

                //set variables to make new divs and ul
                var newCard = $("<div>").addClass("card").attr("style", "width: 9rem;");
                var dateDisplay = $("<div>").addClass("card-header");
                var newUL = $("<ul>").addClass("list-group list-group-flush");
                var iconRow = $("<li>").addClass("list-group-item");
                var newIcon = $("<img>").attr("src", forecastIcon);
                var newTemp = $("<li>").addClass("list-group-item");
                var newHumid = $("<li>").addClass("list-group-item");

                //add text to items that will display text on the screen and added alt for img
                dateDisplay.text(forecastData[i].forecastDate);
                newIcon.attr("alt", "weather icon");
                newTemp.text("T: " + fForecastTemp + String.fromCharCode(176) + "F");
                newHumid.text("H: " + forecastData[i].humid + "%");

                //append new items together
                iconRow.append(newIcon);
                newUL.append(iconRow);
                newUL.append(newTemp);
                newUL.append(newHumid);
                newCard.append(dateDisplay);
                newCard.append(newUL);

                //append to location on html
                $("#forecast").append(newCard)

            }


        });
        
        
        
    }
    
    
    //when the button is clicked to submit the entered city, lots of stuff needs to happen
    $("#button-addon2").on("click", function(event){
        event.preventDefault();
        
        //add value to variable for new city from the new text that was entered
        newCity = $("#entry").val();
        
        //add the text to the array of cities
        citySearched.push(newCity);
        
        //clear the input box to prepare for next thing to be typed
        $("#entry").val("")
        
        //call the function to render the cities on the screen
        renderCityList();
        //call function that pulls current weather
        currentWeather();
        //call function that pulls forecast weather
        forecastWeather();

    })










})