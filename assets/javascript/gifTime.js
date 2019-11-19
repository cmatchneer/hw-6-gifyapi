$(document).ready(function() {
    var gif = ["borderlands", "video games", "funny"];
    var loopNum = 1


    $("input[name='oneGif'").change(function() {
        loopNum = 1;
        console.log(loopNum);
    })
    $("input[name='fiveGifs'").change(function() {
        loopNum = 5;
        console.log(loopNum);

    })
    $("input[name='tenGifs'").change(function() {
        loopNum = 10;
        console.log(loopNum);
    })

    function gifButtons() {
        $("#buttonStorage").empty();
        for (var i = 0; i < gif.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("gif-btn");
            gifButton.attr("id", gif[i]);
            gifButton.text(gif[i]);
            $("#buttonStorage").append(gifButton);

        }

    }

    $("#searchButton").on("click", function(event) {

        event.preventDefault();
        // This line grabs the input from the textbox
        var userGif = $("#gifInput").val().trim();
        gif.push(userGif);
        console.log(userGif);
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
                var theGif = $("<img>");
                theGif.attr("src", response.data[i].images.original.url);

                $("#theGifZone").append(theGif);
            }
        })
    }

    $(document).on("click", ".gif-btn", showGif);
    gifButtons();
})