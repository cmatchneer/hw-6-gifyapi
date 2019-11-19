$(document).ready(function() {
    var gif = ["borderlands", "video games", "funny"];



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
        var gifName = $(this).attr("id");
        var gifQuery = "api.giphy.com/v1/gifs/search=" + gifName + "api_key=2znudAKEpDGbTyV173LdReFY2eDeUdkJ"
        $.ajax({
            url: gifQuery,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var theGif = $("<img>");
            theGif.attr("src", response.data.images.fixed_height.url);

            $("#theGifZone").html(theGif);
        })
    }

    $(document).on("click", ".gif-btn", showGif);
    gifButtons();
})