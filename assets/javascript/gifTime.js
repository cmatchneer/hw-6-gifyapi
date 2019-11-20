$(document).ready(function() {
    var starterGifs = ["borderlands", "video games", "funny"];
    var loopNum = 1


    $("#getOneGif").change(function() {
        loopNum = 1;
        console.log(loopNum);
    })
    $("#getThreeGifs").change(function() {
        loopNum = 3;
        console.log(loopNum);

    })
    $("#getFiveGifs").change(function() {
        loopNum = 5;
        console.log(loopNum);
    })

    function gifButtons() {
        $("#buttonStorage").empty();
        for (var i = 0; i < starterGifs.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("gif-btn");
            gifButton.attr("id", starterGifs[i]);
            gifButton.text(starterGifs[i]);
            $("#buttonStorage").append(gifButton);

        }

    }

    $("#searchButton").on("click", function(event) {

        event.preventDefault();

        var userGif = $("#gifInput").val().trim();
        gif.push(userGif);

        gifButtons();
    });



    function showGif() {
        $("#theGifZone").empty();
        var gifName = $(this).attr("id");
        var gifQuery = "https://api.giphy.com/v1/gifs/search?q=" + gifName +
            "&api_key=2znudAKEpDGbTyV173LdReFY2eDeUdkJ&limit=" + loopNum;
        $.ajax({
            url: gifQuery,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            for (var i = 0; i < loopNum; i++) {
                var gifStorage = $("<div>");
                var theGif = $("<img>");
                var rating = $("<p>");
                rating.text(response.data[i].rating);
                theGif.addClass("gif");
                theGif.attr("src", response.data[i].images.original_still.url);
                theGif.attr("stillGif", response.data[i].images.original_still.url);
                theGif.attr("animatedGif", response.data[i].images.original.url);
                theGif.attr("currentstate", "still");
                gifStorage.append(theGif);
                gifStorage.prepend(rating);

                $("#theGifZone").append(gifStorage);
            }
        })
    }

    function moveThatGif() {
        var state = $(this).attr("currentstate");
        console.log(state);
        console.log("test");
    }
    $(".gif").on("click", function() {
        moveThatGif();

    });


    $(document).on("click", ".gif-btn", showGif);
    gifButtons();

})