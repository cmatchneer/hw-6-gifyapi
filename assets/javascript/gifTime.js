$(document).ready(function() {
    //univeral vars
    var starterGifs = ["borderlands", "call of duty", "world of warcraft"];
    // localStorage.clear();
    // localStorage.setItem("saveGif", starterGifs);
    var loopNum = 1
        // $("#buttonStorage").append(localStorage.getItem("saveGif").split(","));
        //radio buttons
    $("#getOneGif").change(function() {
        loopNum = 1;
    })
    $("#getThreeGifs").change(function() {
        loopNum = 3;
    })
    $("#getFiveGifs").change(function() {
            loopNum = 5;

        })
        //search button
    $("#searchButton").on("click", function(event) {
        event.preventDefault();
        var userGif = $("#gifInput").val().trim();
        starterGifs.push(userGif);
        localStorage.clear();
        localStorage.setItem("saveGif", starterGifs);
        // console.log(localStorage.getItem("saveGif").split(",")[0]);
        gifButtons();
    });
    //call the gifs move the gifs and fav the gifs buttons
    $(document).on("click", ".gif-btn", showGif);
    $(document).on("click", ".gif", moveThatGif);
    $(document).on("click", ".favBtn", favThatGif);
    $(document).on("click", "#clearFav", removeFav);

    // all the functions 
    function gifButtons() {
        $("#buttonStorage").empty();
        for (var i = 0; i < localStorage.getItem("saveGif").split(",").length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("gif-btn");
            gifButton.attr("id", localStorage.getItem("saveGif").split(",")[i]);
            gifButton.text(localStorage.getItem("saveGif").split(",")[i]);
            $("#buttonStorage").append(gifButton);

        }

    }

    function showGif() {

        $("#theGifZone").empty();
        var gifName = $(this).attr("id");
        var gifQuery = "https://api.giphy.com/v1/gifs/search?q=" + gifName +
            "&api_key=2znudAKEpDGbTyV173LdReFY2eDeUdkJ&limit=" + loopNum;
        $.ajax({
            url: gifQuery,
            method: "GET"
        }).then(function(response) {
            // console.log(response);
            for (var i = 0; i < loopNum; i++) {
                var gifStorage = $("<div>");
                var theGif = $("<img>");
                var rating = $("<p>");
                var title = $("<p>");
                var favBtn = $("<button>");
                favBtn.addClass("favBtn");
                favBtn.text("favorite this gif");
                favBtn.attr("id", i);
                rating.text(response.data[i].rating);
                theGif.addClass("gif");
                theGif.attr("src", response.data[i].images.original_still.url);
                theGif.attr("stillGif", response.data[i].images.original_still.url);
                theGif.attr("animatedGif", response.data[i].images.original.url);
                theGif.attr("currentstate", "still");
                gifStorage.addClass("storage");
                gifStorage.attr("id", "div" + i);
                gifStorage.append(theGif);
                gifStorage.prepend(favBtn);
                gifStorage.prepend(title);
                gifStorage.prepend(rating);
                if (response.data[i].title.length > 0) {
                    title.text(response.data[i].title);
                    console.log("test");
                } else {
                    console.log("test2");
                    title.remove();
                }
                $("#theGifZone").append(gifStorage);
            }
        })
    }

    function moveThatGif() {
        var state = $(this).attr("currentstate");
        if (state === "still") {
            $(this).attr("src", $(this).attr("animatedGif"));
            $(this).attr("currentState", "animate");
        } else {
            $(this).attr("src", $(this).attr("stillGif"));
            $(this).attr("currentState", "still");
        }
    }

    function favThatGif() {
        var favDiv = $("#div" + this.id);
        $("#userFav").append(favDiv);
        // $(favDiv).remove();
        this.remove();
    }

    function removeFav() {
        console.log("test");
        $("#userFav").empty();
    }

    gifButtons();

})