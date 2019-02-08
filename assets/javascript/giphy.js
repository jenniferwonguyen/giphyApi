$( document ).ready(function() {
    //an array of dog breeds, added breeds pushed into this array;
    var pups = ["Beagle", "Corgi", "Dashund", "French Bulldog", "German Shepherd", "Golden Retriever", "Husky", "Pomeranian", "Pitbull", "Samoyed", "Shiba Inu", "St. Bernard", "Yorkshire"];
    function displayGifButtons(){
        $("#gifButtonsView").empty();
        for (var i = 0; i < pups.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("pup");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", pups[i]);
            gifButton.text(pups[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    //function to add a new pup button
    function addNewButton(){
        $("#addGif").on("click", function(){
        var pup = $("#pup-input").val().trim();
        if (pup == ""){
          return false; 
        }
        pups.push(pup);
    
        displayGifButtons();
        return false;
        });
    }
    //gif display
    function displayGifs(){
        var pup = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + pup + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL); // 
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); //console test to make sure a return
            $("#gifsView").empty(); 
            var results = response.data; //shows results of gifs
        if (results == ""){
              alert("There isn't a gif for this selected button");
            }
        for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); //div for the gifs to go inside
                gifDiv.addClass("gifDiv");
                //pulling rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); //set still
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); //animated image
                gifImage.attr("data-state", "still"); //set still
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                //pulling still image of gif
                //adding div of gifs to gifsView div
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    displayGifButtons();
    addNewButton();

    //event listeners
    $(document).on("click", ".pup", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });