$(document).ready(function() {
    //univeral vars
    var starterGifs = ["borderlands", "call of duty", "world of warcraft"];
    var loopNum = 1
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
        if (userGif.length > 0) {
            starterGifs.push(userGif);
            localStorage.clear();
            localStorage.setItem("saveGif", starterGifs);
            gifButtons();
        } else {
            alert("Try searching for something");
        }
    });
    //call the gifs move the gifs and fav the gifs buttons
    $(document).on("click", ".gif-btn", showGif);
    $(document).on("click", ".gif", moveThatGif);
    $(document).on("click", ".favBtn", favThatGif);
    $(document).on("click", ".clearFav", removeFav);

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
                } else {
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
        $(this).removeClass("favBtn");
        $(this).addClass("clearFav")
        $(this).attr("id", this.id);
        $(this).text("Remove this Gif");
        $("#userFav").append(favDiv);
    }

    function removeFav() {
        console.log("test");
        $("#div" + this.id).remove();

    }
    gifButtons();
})