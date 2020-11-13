//make sure the page has loaded before doing anything
$(document).ready(function() {
    



    //when the button is clicked to submit the entered city, lots of stuff needs to happen
    $("#button-addon2").on("click", function(event){
        event.preventDefault();
        
        console.log("clicked")
        
        //add variables for the new text and for the newtag which will be used to save the city on the page
        var newCity = $("#entry").val();
        var newTag = $("<a>");
        //add text and class attributes
        newTag.text(newCity)
        newTag.attr("class", "list-group-item list-group-item-action")
        //prepend city to the list
        $("#cityList").prepend(newTag)
        $("#entry").val("")

    })










})